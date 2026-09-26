import type { ComponentPropsWithoutRef } from "react";
import { imageManifest } from "@/lib/image-manifest";

type SmartImageProps = ComponentPropsWithoutRef<"img"> & {
  /** Render a bare <img> with no <picture> wrapper (rarely needed). */
  bare?: boolean;
};

/**
 * Drop-in replacement for `<img>` that does three things, all of them invisible
 * metadata / transport concerns — it never changes the text or markup a visitor
 * sees:
 *
 *  1. Serves AVIF → WebP → the original file through `<picture>`, using the
 *     compressed siblings produced by `npm run images` (144 of 147 images, ~89%
 *     smaller than the source PNG/JPEG).
 *  2. Applies the image's intrinsic `width`/`height` from the generated
 *     manifest, so the browser reserves the box before the bytes arrive (CLS).
 *  3. Defaults `decoding="async"` so decoding never blocks the main thread (INP).
 *
 * `alt`, `className`, `loading` and every other prop are passed straight
 * through to the underlying `<img>`, so existing call sites keep their exact
 * visible attributes. Pass `sizes` (e.g. `sizes="100vw"`) to let wide images
 * also use the 1200px-wide variant.
 */
export function SmartImage({ src, bare = false, ...props }: SmartImageProps) {
  const meta = typeof src === "string" ? imageManifest[src] : undefined;

  const img = (
    <img
      {...props}
      src={src}
      width={props.width ?? meta?.width}
      height={props.height ?? meta?.height}
      decoding={props.decoding ?? "async"}
    />
  );

  if (bare || !meta?.webp) return img;

  const webpSrcSet =
    props.sizes && meta.webp1200
      ? `${meta.webp1200} 1200w, ${meta.webp} ${meta.width}w`
      : meta.webp;

  return (
    <picture>
      {meta.avif ? <source srcSet={meta.avif} type="image/avif" sizes={props.sizes} /> : null}
      <source srcSet={webpSrcSet} type="image/webp" sizes={props.sizes} />
      {img}
    </picture>
  );
}
