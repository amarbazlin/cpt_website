#!/usr/bin/env node
/**
 * Image pipeline for Ceylon Platinum Trading.
 *
 * For every raster image in `public/` this script:
 *   1. records the intrinsic pixel size (used for width/height attributes so
 *      images never cause layout shift), and
 *   2. writes modern, much smaller sibling files next to the original:
 *        <name>.webp       — served first, ~10x smaller than the source PNG
 *        <name>.avif       — served first of all (only when the source is big)
 *        <name>-og.jpg     — ≤1200px JPEG for WhatsApp / Open Graph previews
 *                            (WhatsApp refuses og:image files over 600KB)
 *
 * The result is written to `src/lib/image-manifest.ts`, which
 * `src/components/SmartImage.tsx` reads to render <picture> elements with the
 * right sources plus intrinsic width/height.
 *
 * Originals are never modified or deleted — they stay as the fallback <img>
 * source and are what `og:image` falls back to when no -og.jpg exists.
 *
 * Requirements: cwebp, avifenc and sips (macOS). Missing tools are skipped
 * gracefully, the manifest simply omits the formats that could not be built.
 *
 * Usage: npm run images
 */
import { execFile } from "node:child_process";
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const MANIFEST_PATH = path.join(ROOT, "src", "lib", "image-manifest.ts");

/**
 * Files that can be measured. WebP/AVIF are measured (so they still get
 * width/height attributes) but never re-encoded.
 */
const RASTER = /\.(png|jpe?g|gif|webp|avif)$/i;
/** Files cwebp and avifenc accept as input (GIF is measurement-only). */
const ENCODABLE = /\.(png|jpe?g)$/i;
/** Artefacts written by this script — never scanned as sources on re-runs. */
const GENERATED = /(-og|-1200)\.(png|jpe?g|gif|webp|avif)$/i;

/** Only pay the (slow) AVIF encode cost for images that are actually heavy. */
const AVIF_MIN_BYTES = 120 * 1024;
const WEBP_QUALITY = "82";
const AVIF_QUALITY = "55";
const OG_MAX_DIMENSION = "1200";
const OG_QUALITY = "78";
/** Images wider than this also get a 1200px-wide WebP for smaller screens. */
const WIDE_MIN_WIDTH = 1600;

/** Images worth generating a WhatsApp/OG JPEG for (logos and icons are not). */
const OG_PREFIXES = ["/products/", "/images/", "/hero"];
const OG_EXCLUDED = new Set(["/favicon.ico", "/icon.png", "/apple-icon.png"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const exists = async (file) => Boolean(await stat(file).catch(() => null));

/**
 * True for a WebP/AVIF file that has no PNG/JPEG/GIF original beside it — i.e.
 * an image the client supplied in a modern format, as opposed to a sibling this
 * script generated and which must therefore be skipped on re-runs.
 */
async function standaloneImage(file) {
  const base = file.replace(/\.(webp|avif)$/i, "");
  for (const extension of [".png", ".jpg", ".jpeg", ".gif"]) {
    if (await exists(`${base}${extension}`)) return false;
  }
  return true;
}

async function size(file) {
  return (await stat(file)).size;
}

/** True when `out` is missing or older than `src`. */
async function stale(src, out) {
  const outStat = await stat(out).catch(() => null);
  if (!outStat) return true;
  return outStat.mtimeMs < (await stat(src)).mtimeMs;
}

async function toolAvailable(tool) {
  try {
    await run(tool, ["-version"]).catch((error) => {
      // Some tools exit non-zero for -version; a spawn error means "missing".
      if (error?.code === "ENOENT") throw error;
    });
    return true;
  } catch {
    return false;
  }
}

async function dimensions(file) {
  const { stdout } = await run("sips", ["-g", "pixelWidth", "-g", "pixelHeight", file]);
  const width = Number(/pixelWidth:\s*(\d+)/.exec(stdout)?.[1] ?? 0);
  const height = Number(/pixelHeight:\s*(\d+)/.exec(stdout)?.[1] ?? 0);
  return width && height ? { width, height } : null;
}

const swapExtension = (publicPath, extension) => publicPath.replace(/\.(png|jpe?g)$/i, extension);

async function buildWebp(src, out, resizeWidth) {
  if (!(await stale(src, out))) return true;
  const args = ["-quiet", "-q", WEBP_QUALITY, "-m", "6", "-metadata", "none"];
  if (resizeWidth) args.push("-resize", resizeWidth, "0");
  args.push(src, "-o", out);
  try {
    await run("cwebp", args);
    return true;
  } catch (error) {
    console.warn(`  ! webp failed: ${path.basename(src)} — ${error.message.split("\n")[0]}`);
    return false;
  }
}

async function buildAvif(src, out) {
  if (!(await stale(src, out))) return true;
  try {
    await run("avifenc", ["-q", AVIF_QUALITY, "-s", "8", "-j", "all", src, out]);
    return true;
  } catch (error) {
    console.warn(`  ! avif failed: ${path.basename(src)} — ${error.message.split("\n")[0]}`);
    return false;
  }
}

/** Flattened, size-capped JPEG preview used for og:image (WhatsApp safe). */
async function buildOg(src, out) {
  if (!(await stale(src, out))) return true;
  try {
    await run("sips", [
      "--resampleHeightWidthMax",
      OG_MAX_DIMENSION,
      "-s",
      "format",
      "jpeg",
      "-s",
      "formatOptions",
      OG_QUALITY,
      src,
      "--out",
      out,
    ]);
    return true;
  } catch (error) {
    console.warn(`  ! og failed: ${path.basename(src)} — ${error.message.split("\n")[0]}`);
    return false;
  }
}

async function main() {
  const [hasCwebp, hasAvifenc] = await Promise.all([
    toolAvailable("cwebp"),
    toolAvailable("avifenc"),
  ]);
  if (!hasCwebp) console.warn("cwebp not found — skipping WebP generation.");
  if (!hasAvifenc) console.warn("avifenc not found — skipping AVIF generation.");

  /** @type {Record<string, Record<string, unknown>>} */
  const manifest = {};
  const totals = {
    sources: 0,
    webp: 0,
    webpWide: 0,
    avif: 0,
    og: 0,
    bytesBefore: 0,
    bytesAfter: 0,
  };

  for await (const file of walk(PUBLIC_DIR)) {
    if (!RASTER.test(file) || GENERATED.test(file)) continue;
    // Skip the modern-format siblings this script generated.
    if (!/\.(png|jpe?g|gif)$/i.test(file) && !(await standaloneImage(file))) continue;

    const publicPath = `/${path.relative(PUBLIC_DIR, file).split(path.sep).join("/")}`;
    const dims = await dimensions(file).catch(() => null);
    if (!dims) {
      console.warn(`  ! could not measure ${publicPath}`);
      continue;
    }

    totals.sources++;
    const entry = { width: dims.width, height: dims.height };

    if (ENCODABLE.test(file)) {
      const base = file.replace(ENCODABLE, "");

      if (hasCwebp && (await buildWebp(file, `${base}.webp`))) {
        entry.webp = swapExtension(publicPath, ".webp");
        totals.webp++;
      }

      // Wide images (hero banners, large photography) also get a 1200px-wide
      // WebP so phones download a fraction of the pixels.
      if (hasCwebp && entry.webp && dims.width > WIDE_MIN_WIDTH) {
        if (await buildWebp(file, `${base}-1200.webp`, "1200")) {
          entry.webp1200 = swapExtension(publicPath, "-1200.webp");
          totals.webpWide++;
        }
      }

      const sourceBytes = await size(file);
      totals.bytesBefore += sourceBytes;

      if (hasAvifenc && sourceBytes >= AVIF_MIN_BYTES && (await buildAvif(file, `${base}.avif`))) {
        // Only advertise AVIF when it actually wins on bytes for this image.
        const avifBytes = await size(`${base}.avif`);
        const webpBytes = entry.webp ? await size(`${base}.webp`) : Number.POSITIVE_INFINITY;
        if (avifBytes < webpBytes) {
          entry.avif = swapExtension(publicPath, ".avif");
          totals.avif++;
        }
      }

      totals.bytesAfter += entry.webp ? await size(`${base}.webp`) : sourceBytes;

      const wantsOg =
        !OG_EXCLUDED.has(publicPath) && OG_PREFIXES.some((prefix) => publicPath.startsWith(prefix));
      if (wantsOg) {
        const ogFile = `${base}-og.jpg`;
        if (await buildOg(file, ogFile)) {
          const ogDims = await dimensions(ogFile).catch(() => null);
          if (ogDims) {
            entry.og = {
              url: swapExtension(publicPath, "-og.jpg"),
              width: ogDims.width,
              height: ogDims.height,
            };
            totals.og++;
          }
        }
      }
    }

    manifest[publicPath] = entry;
  }

  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );

  const output = [
    "// AUTO-GENERATED by scripts/optimize-images.mjs — do not edit by hand.",
    "// Re-run `npm run images` after adding, replacing or removing images in public/.",
    "",
    "export type ImageMeta = {",
    "  /** Intrinsic pixel size of the source image, used for width/height attributes. */",
    "  width: number;",
    "  height: number;",
    "  /** Modern-format sibling files served through <picture> when present. */",
    "  webp?: string;",
    "  /** 1200px-wide WebP for wide sources (used in the <picture> srcset). */",
    "  webp1200?: string;",
    "  avif?: string;",
    "  /** ≤1200px JPEG used for Open Graph and WhatsApp link previews. */",
    "  og?: { url: string; width: number; height: number };",
    "};",
    "",
    "export const imageManifest: Record<string, ImageMeta> = {",
    ...Object.entries(sorted).map(
      ([key, meta]) => `  ${JSON.stringify(key)}: ${JSON.stringify(meta)},`,
    ),
    "};",
    "",
  ].join("\n");

  await writeFile(MANIFEST_PATH, output, "utf8");

  const saved = totals.bytesBefore - totals.bytesAfter;
  const percent = totals.bytesBefore ? Math.round((saved / totals.bytesBefore) * 100) : 0;
  console.log(`Scanned ${totals.sources} images.`);
  console.log(
    `  WebP: ${totals.webp} (+${totals.webpWide} @1200px)  AVIF: ${totals.avif}  OG JPEG: ${totals.og}`,
  );
  console.log(
    `  Payload ${(totals.bytesBefore / 1024 / 1024).toFixed(1)}MB → ${(totals.bytesAfter / 1024 / 1024).toFixed(1)}MB (-${percent}% on the modern format)`,
  );
  console.log(`Manifest written to ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
