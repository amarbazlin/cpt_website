// All photography and brand logos below are the client's original images,
// served from /public so they resolve in dev, preview and production builds.
export const photos = {
  hero: "/images/hero.jpg",
  showroom: "/images/hand-tools.jpg",
  whoWeAre: "/images/whoweare.jpg",
  showroomExterior: "/images/exterior.jpg",
  powerTools: "/images/power-tools.jpg",
  handTools: "/images/hand-tools.jpg",
  paints: "/images/paints.jpg",
  hardware: "/images/hardware.jpg",
  machinery: "/images/machinery.jpg",
  sealants: "/images/sealants.jpg",
  paintMixing: "/images/paint-mixing.jpg",
};

export type HeroSlide = {
  image: string;
  alt: string;
  /** Brand filter applied when the slide is clicked (null links to the full catalogue). */
  brand: string | null;
  /** Accessible label for the slide's click target and navigation controls. */
  label: string;
};

/**
 * Auto-rotating hero banners (full-width promo images shown in the hero).
 * Swap the image paths here to change a slide — the carousel picks these up
 * automatically and slides to the left every 5 seconds.
 */
export const heroSlides: HeroSlide[] = [
  {
    image: "/hero01.png",
    alt: "Ceylon Platinum Trading promotion banner",
    brand: "Bosch",
    label: "Shop Bosch products",
  },
  {
    image: "/hero02.png",
    alt: "Ceylon Platinum Trading promotion banner",
    brand: "Giant",
    label: "Shop Giant products",
  },
  {
    image: "/hero03.png",
    alt: "Ceylon Platinum Trading promotion banner",
    brand: "ZRM",
    label: "Shop ZRM products",
  },
];

export const business = {
  name: "Ceylon Platinum Trading (PVT) Ltd",
  shortName: "Ceylon Platinum Trading",
  initials: "CPT",
  tagline: "Complete Hardware Solutions Under One Roof",
  phone: "041-222-3298",
  phoneIntl: "+94412223298",
  email: "ceylonglobal.hq@gmail.com",
  whatsapp: "94760556075",
  whatsappDisplay: "076 055 6075",
  street: "167/B1 Old Tangalle Road, Kotuwegoda",
  city: "Matara",
  postalCode: "81000",
  country: "Sri Lanka",
  addressFull: "167/B1 Old Tangalle Road, Kotuwegoda, Matara, Sri Lanka",
  hours: "Monday to Saturday, 9:00 AM – 5:00 PM",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Ceylon+Platinum+Trading+(Pvt)+Ltd,+167%2FB1+Old+Tangalle+Rd,+Matara+81000",
  // TODO: add social profile URLs here when available.
  socials: [] as { label: string; url: string }[],
};

export type Brand = {
  name: string;
  logo: string;
};

/** Brand logos distributed by Ceylon Platinum Trading (client's original logos). */
export const brands: Brand[] = [
  { name: "Asian Paints", logo: "/brands/asianpaints.png" },
  { name: "Bellucci", logo: "/brands/bellucci.png" },
  { name: "Bosch", logo: "/brands/bosch.png" },
  { name: "Giant", logo: "/brands/giant.png" },
  { name: "Hasky", logo: "/brands/hasky.png" },
  { name: "Humhon", logo: "/brands/humhon.png" },
  { name: "Kevin", logo: "/brands/kevin.png" },
  { name: "Melwa", logo: "/brands/melwa.png" },
  { name: "Multibond", logo: "/brands/multibond.jpg" },
  { name: "National PVC", logo: "/brands/national-pvc.png" },
  { name: "Rhino", logo: "/brands/rhino.jpg" },
  { name: "S-Lon", logo: "/brands/s-lon.png" },
  { name: "Tolsen", logo: "/brands/tolsen.png" },
  { name: "Wipro", logo: "/brands/wipro.png" },
  { name: "Wokin", logo: "/brands/wokin.jpg" },
];

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  brands: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "power-tools",
    name: "Power Tools",
    blurb:
      "Drills, grinders, jigsaws, circular saws, sanders and more. Professional-grade power tools for every application.",
    brands: "Bosch · Humhon · Tolsen",
    image: photos.powerTools,
  },
  {
    slug: "hand-tools",
    name: "Hand Tools",
    blurb:
      "Complete hand tool sets — spanners, screwdrivers, hammers, pliers, chisels and specialty tools for every trade.",
    brands: "Tolsen · Lesso",
    image: photos.handTools,
  },
  {
    slug: "paints-coatings",
    name: "Paints & Coatings",
    blurb:
      "Interior emulsions, exterior weather guard, waterproofing solutions, and custom colour mixing with our in-store machine.",
    brands: "Asian Paints · Causeway",
    image: photos.paints,
  },
  {
    slug: "door-window-hardware",
    name: "Door & Window Hardware",
    blurb:
      "Premium door handles, hinges, locks, bolts, and complete access hardware systems for residential and commercial projects.",
    brands: "Bellucci · OMAC",
    image: photos.hardware,
  },
  {
    slug: "machinery-compressors",
    name: "Machinery & Compressors",
    blurb:
      "Air compressors, water pumps, pressure washers, welding machines and heavy machinery for construction sites.",
    brands: "Giant · Wipro",
    image: photos.machinery,
  },
  {
    slug: "sealants-adhesives",
    name: "Sealants & Adhesives",
    blurb:
      "Silicone sealants, weatherproofing compounds, adhesives, and specialty chemicals for all construction needs.",
    brands: "Multibond · As-Ron",
    image: photos.sealants,
  },
];

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string; // category slug
  image: string;
  summary: string;
  description: string;
  specs: { label: string; value: string }[];
  /** Selling price in LKR (inclusive of the 10% uplift). Omit for "Price on request". */
  price?: number;
};

/**
 * Only products with photography and label details supplied by the client.
 * Add new entries here as product photos and specifications are provided.
 * Specification values marked "To be confirmed" are placeholders.
 */
export const products: Product[] = [
  {
    slug: "bosch-planer-650w-gho650",
    name: "Bosch Planer 650W GHO650",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GHO650.jpeg",
    price: 36080,
    summary: "650W planer for flattening and smoothing timber surfaces.",
    description:
      "The Bosch GHO650 is a 650W planer for flattening and smoothing timber surfaces. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GHO650" },
      { label: "Type", value: "Planer" },
      { label: "Power input", value: "650W" },
    ],
  },
  {
    slug: "bosch-compound-mitre-saw-gcm254",
    name: "Bosch Compound Mitre Saw 1750W GCM254",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GCM254.png",
    price: 91080,
    summary: "1750W compound mitre saw for crosscuts and angle cuts.",
    description:
      "The Bosch GCM254 is a 1750W compound mitre saw for clean crosscuts, mitres and bevel cuts in timber. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "GCM 254" },
      { label: "Type", value: "Compound mitre saw" },
      { label: "Power input", value: "1750W" },
      { label: "Warranty", value: "1 year" },
    ],
  },
  {
    slug: "bosch-screwdriver-bit-65mm-2608521042",
    name: "Bosch Screwdriver Bit 65mm 2608521042",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608521042.jpeg",
    price: 242,
    summary: "65mm Bosch screwdriver bit for power drivers.",
    description:
      "The Bosch 2608521042 is a 65mm screwdriver bit for power screwdrivers and drills. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608521042" },
      { label: "Length", value: "65mm" },
      { label: "Type", value: "Screwdriver bit" },
    ],
  },
  {
    slug: "bosch-diamond-cutting-disc-4-26086152532",
    name: "Bosch Diamond Cutting Disc 4\" 26086152532",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/26086152532.png",
    price: 935,
    summary: "4\" Bosch 110 diamond cutting disc for masonry and tile.",
    description:
      "The Bosch 26086152532 is a 4\" (110mm) diamond cutting disc for cutting masonry, concrete and tile. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "26086152532" },
      { label: "Disc size", value: "4\" (110mm)" },
      { label: "Type", value: "Diamond cutting disc" },
    ],
  },
  {
    slug: "bosch-tile-drill-bit-8mm-2608587164",
    name: "Bosch Tile Drill Bit 8mm 2608587164",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608587164.jpeg",
    price: 1100,
    summary: "8mm tungsten-carbide tile drill bit.",
    description:
      "The Bosch 2608587164 is an 8mm tile drill bit for drilling clean holes in ceramic and porcelain tile. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608587164" },
      { label: "Diameter", value: "8mm" },
      { label: "Type", value: "Tile drill bit" },
    ],
  },
  {
    slug: "bosch-tile-drill-bit-6mm-2608587161",
    name: "Bosch Tile Drill Bit 6mm 2608587161",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608587161.jpeg",
    price: 1045,
    summary: "6mm tungsten-carbide tile drill bit.",
    description:
      "The Bosch 2608587161 is a 6mm tile drill bit for drilling clean holes in ceramic and porcelain tile. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608587161" },
      { label: "Diameter", value: "6mm" },
      { label: "Type", value: "Tile drill bit" },
    ],
  },
  {
    slug: "bosch-chuck-with-key-13mm-2608572253",
    name: "Bosch Chuck With Key 13mm 2608572253",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608572253.jpg",
    price: 1925,
    summary: "13mm Bosch keyed chuck for drills.",
    description:
      "The Bosch 2608572253 is a 13mm keyed chuck for drill machines. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608572253" },
      { label: "Size", value: "13mm" },
      { label: "Type", value: "Keyed chuck" },
    ],
  },
  {
    slug: "bosch-circular-saw-blade-10-2608644308",
    name: "Bosch Circular Saw Blade 10\" 2608644308",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608644308.png",
    price: 4840,
    summary: "10\" Bosch circular saw blade for clean timber cuts.",
    description:
      "The Bosch 2608644308 is a 10\" circular saw blade for clean, accurate cuts in timber and board material. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608644308" },
      { label: "Blade size", value: "10\"" },
      { label: "Type", value: "Circular saw blade" },
    ],
  },
  {
    slug: "bosch-circular-saw-blade-7-1-4-2608644279",
    name: "Bosch Circular Saw Blade 7 1/4\" 60 Teeth 2608644279",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608644279.png",
    price: 3520,
    summary: "7 1/4\" 60-tooth Bosch circular saw blade.",
    description:
      "The Bosch 2608644279 is a 7 1/4\" circular saw blade with 60 teeth for smooth, fine cuts in timber. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608644279" },
      { label: "Blade size", value: "7 1/4\"" },
      { label: "Teeth", value: "60" },
      { label: "Type", value: "Circular saw blade" },
    ],
  },
  {
    slug: "bosch-jigsaw-blade-t119bo",
    name: "Bosch Jigsaw Blade T119BO 2608637879",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608637879T119BO.jpeg",
    price: 198,
    summary: "Bosch T119BO jigsaw blade for fine wood cuts.",
    description:
      "The Bosch 2608637879 is a T119BO jigsaw blade for fine cuts in wood and board material. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608637879" },
      { label: "Blade type", value: "T119BO" },
      { label: "Type", value: "Jigsaw blade" },
    ],
  },
  {
    slug: "bosch-jigsaw-blade-t144d",
    name: "Bosch Jigsaw Blade T144D 2608637880",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608637880T144D.jpeg",
    price: 198,
    summary: "Bosch T144D jigsaw blade for fast wood cuts.",
    description:
      "The Bosch 2608637880 is a T144D jigsaw blade for fast cutting of timber and board material. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608637880" },
      { label: "Blade type", value: "T144D" },
      { label: "Type", value: "Jigsaw blade" },
    ],
  },
  {
    slug: "bosch-jigsaw-blade-t244d",
    name: "Bosch Jigsaw Blade T244D 2608637881",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/2608637881T244DHCS.jpeg",
    price: 275,
    summary: "Bosch T244D HCS jigsaw blade for wood cutting.",
    description:
      "The Bosch 2608637881 is a T244D HCS jigsaw blade for cutting timber and wood materials. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Part no.", value: "2608637881" },
      { label: "Blade type", value: "T244D HCS" },
      { label: "Type", value: "Jigsaw blade" },
    ],
  },
  {
    slug: "bosch-orbital-sander-gss140",
    name: "Bosch Orbital Sander 220V GSS140",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GSS140.png",
    price: 18205,
    summary: "220V orbital sander for smooth sanding and finishing.",
    description:
      "The Bosch GSS140 is a 220V orbital sander for smooth sanding and finishing of wood and painted surfaces. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GSS140" },
      { label: "Type", value: "Orbital sander" },
      { label: "Voltage", value: "220V" },
    ],
  },
  {
    slug: "bosch-router-2000w-gof-20-12",
    name: "Bosch Router 2000W GOF-20-12",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GOF-20-12.jpeg",
    price: 47850,
    summary: "2000W router for edge work, grooving and shaping.",
    description:
      "The Bosch GOF-20-12 is a 2000W router for edge profiling, grooving and shaping in wood. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GOF-20-12" },
      { label: "Type", value: "Router" },
      { label: "Power input", value: "2000W" },
    ],
  },
  {
    slug: "bosch-jigsaw-450w-gst650",
    name: "Bosch Jigsaw 450W GST650",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GST650.jpeg",
    price: 23980,
    summary: "450W jigsaw for curved and straight cuts.",
    description:
      "The Bosch GST650 is a 450W jigsaw for curved and straight cuts in wood and board material. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GST 650" },
      { label: "Type", value: "Jigsaw" },
      { label: "Power input", value: "450W" },
    ],
  },
  {
    slug: "bosch-circular-saw-1300w-gks130",
    name: "Bosch Circular Saw 1300W GKS130",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GKS130.png",
    price: 26950,
    summary: "1300W circular saw for straight cuts in timber.",
    description:
      "The Bosch GKS130 is a 1300W circular saw for straight, clean cuts in timber and board material. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GKS130" },
      { label: "Type", value: "Circular saw" },
      { label: "Power input", value: "1300W" },
    ],
  },
  {
    slug: "bosch-mixer-1400w-grw140",
    name: "Bosch Mixer 1400W GRW140",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GRW140.jpeg",
    price: 35200,
    summary: "1400W mixer for paint and mortar mixing.",
    description:
      "The Bosch GRW140 is a 1400W mixer for mixing paint, mortar and toppings. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GRW140" },
      { label: "Type", value: "Mixer" },
      { label: "Power input", value: "1400W" },
    ],
  },
  {
    slug: "bosch-wet-dry-extractor-gas15ps",
    name: "Bosch Wet/Dry Extractor 1100W GAS 15 PS",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GAS15PS.png",
    price: 75020,
    summary: "1100W wet/dry extractor for workshop dust and spills.",
    description:
      "The Bosch GAS 15 PS is an 1100W wet/dry vacuum extractor for workshop dust, debris and liquid spills. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GAS 15 PS" },
      { label: "Type", value: "Wet/dry extractor" },
      { label: "Power input", value: "1100W" },
    ],
  },
  {
    slug: "bosch-blower-650w-gbl650",
    name: "Bosch Blower 650W GBL650",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GBL650.jpeg",
    price: 17050,
    summary: "650W blower for clearing dust and debris.",
    description:
      "The Bosch GBL650 is a 650W electric blower for clearing dust, leaves and light debris from workshops and sites. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GBL650" },
      { label: "Type", value: "Blower" },
      { label: "Power input", value: "650W" },
    ],
  },
  {
    slug: "bosch-marble-saw-1400w-gdc140",
    name: "Bosch Marble Saw 1400W GDC140",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GDC140.jpeg",
    price: 22330,
    summary: "1400W marble saw for cutting tile and stone.",
    description:
      "The Bosch GDC140 is a 1400W marble saw for cutting tile, marble and stone. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GDC140" },
      { label: "Type", value: "Marble saw" },
      { label: "Power input", value: "1400W" },
    ],
  },
  {
    slug: "bosch-rotary-hammer-1000w-gbh2-26",
    name: "Bosch Rotary Hammer 1000W GBH 2-26",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GBH2-26DRE.jpeg",
    price: 63800,
    summary: "1000W rotary hammer for drilling and chiselling.",
    description:
      "The Bosch GBH 2-26 is a 1000W rotary hammer for hammer drilling and chiselling in concrete and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GBH 2-26 DRE" },
      { label: "Type", value: "Rotary hammer" },
      { label: "Power input", value: "1000W" },
    ],
  },
  {
    slug: "bosch-chipping-hammer-1100w-gsh500",
    name: "Bosch Chipping Hammer 1100W GSH 500",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GSH500.png",
    price: 78650,
    summary: "1100W demolition/chipping hammer for breaking work.",
    description:
      "The Bosch GSH 500 is an 1100W chipping (demolition) hammer for breaking and chasing masonry and concrete. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GSH 500" },
      { label: "Type", value: "Chipping hammer" },
      { label: "Power input", value: "1100W" },
    ],
  },
  {
    slug: "bosch-rotary-hammer-gbh220",
    name: "Bosch Rotary Hammer GBH 220",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GBH220.png",
    price: 44770,
    summary: "Rotary hammer for drilling and chiselling in concrete.",
    description:
      "The Bosch GBH 220 is a rotary hammer for drilling and light chiselling in concrete and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GBH220" },
      { label: "Type", value: "Rotary hammer" },
    ],
  },
  {
    slug: "bosch-impact-drill-kit-750w-gsb16re",
    name: "Bosch Impact Drill Kit 750W GSB16RE",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GSB16RE.jpeg",
    price: 33000,
    summary: "750W impact drill kit with accessories for drilling and driving.",
    description:
      "The Bosch GSB16RE is a 750W impact drill kit for drilling and driving in wood, metal and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GSB16RE" },
      { label: "Type", value: "Impact drill kit" },
      { label: "Power input", value: "750W" },
    ],
  },
  {
    slug: "bosch-percussion-drill-600w-gsb600",
    name: "Bosch Percussion Drill 600W GSB 600",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GSB600.jpeg",
    price: 14740,
    summary: "600W percussion drill for drilling and driving.",
    description:
      "The Bosch GSB 600 is a 600W percussion drill for drilling and driving in wood, metal and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GSB 600" },
      { label: "Type", value: "Percussion drill" },
      { label: "Power input", value: "600W" },
    ],
  },
  {
    slug: "bosch-gbm-400-drill-400w",
    name: "Bosch GBM 400 Drill 400W",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GBM400.jpeg",
    price: 11880,
    summary: "400W drill for general drilling in wood and metal.",
    description:
      "The Bosch GBM 400 is a 400W drill for general drilling in wood and metal. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GBM 400" },
      { label: "Type", value: "Drill" },
      { label: "Power input", value: "400W" },
    ],
  },
  {
    slug: "bosch-polisher-1250w-gpo12ce",
    name: "Bosch Polisher 1250W GPO12 CE",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GPO12CE.png",
    price: 74800,
    summary: "1250W polisher for polishing and polishing-restoration work.",
    description:
      "The Bosch GPO12 CE is a 1250W polisher for polishing vehicles, stone and surfaces. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GPO12 CE" },
      { label: "Type", value: "Polisher" },
      { label: "Power input", value: "1250W" },
    ],
  },
  {
    slug: "bosch-angle-grinder-115mm-900w-gws9-115",
    name: "Bosch Angle Grinder 115mm 900W GWS 9-115",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GWS9-115.jpeg",
    price: 31350,
    summary: "900W angle grinder for cutting and grinding.",
    description:
      "The Bosch GWS 9-115 is a 900W angle grinder with a 115mm disc for cutting and grinding metal and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GWS 9-115" },
      { label: "Disc size", value: "115mm" },
      { label: "Power input", value: "900W" },
    ],
  },
  {
    slug: "bosch-angle-grinder-7-2200w-gws2200-180",
    name: "Bosch Angle Grinder 7\" 2200W GWS 2200-180",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GWS2200-180.jpeg",
    price: 50325,
    summary: "2200W angle grinder for heavy cutting and grinding.",
    description:
      "The Bosch GWS 2200-180 is a 2200W angle grinder with a 7\" disc for heavy cutting and grinding. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GWS 2200-180" },
      { label: "Disc size", value: "7\"" },
      { label: "Power input", value: "2200W" },
    ],
  },
  {
    slug: "bosch-angle-grinder-4-900w-gws900-100",
    name: "Bosch Angle Grinder 4\" 900W GWS900-100",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GWS900-100.jpeg",
    price: 25300,
    summary: "900W angle grinder for cutting and grinding.",
    description:
      "The Bosch GWS900-100 is a 900W angle grinder with a 4\" disc for cutting and grinding. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GWS900-100" },
      { label: "Disc size", value: "4\"" },
      { label: "Power input", value: "900W" },
    ],
  },
  {
    slug: "bosch-angle-grinder-4-5-710w-gws700-115",
    name: "Bosch Angle Grinder 4 1/2\" 710W GWS 700-115",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GWS700-115.jpeg",
    price: 17050,
    summary: "710W angle grinder for cutting and grinding.",
    description:
      "The Bosch GWS 700-115 is a 710W angle grinder with a 4 1/2\" disc for cutting and grinding. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GWS 700-115" },
      { label: "Disc size", value: "4 1/2\"" },
      { label: "Power input", value: "710W" },
    ],
  },
  {
    slug: "bosch-angle-grinder-4-710w-gws700-100",
    name: "Bosch Angle Grinder 4\" 710W GWS 700-100",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GWS700-100.jpeg",
    price: 17930,
    summary: "710W angle grinder for cutting and grinding.",
    description:
      "The Bosch GWS 700-100 is a 710W angle grinder with a 4\" disc for cutting and grinding. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Warranty", value: "1 year" },
      { label: "Model", value: "GWS 700-100" },
      { label: "Disc size", value: "4\"" },
      { label: "Power input", value: "710W" },
    ],
  },
  {
    slug: "bosch-rechargeable-drill-18v-gsr185li",
    name: "Bosch Rechargeable Drill 18V GSR 185LI",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GSR185LI.jpeg",
    price: 66000,
    summary: "18V cordless drill for drilling and driving without a lead.",
    description:
      "The Bosch GSR 185LI is an 18V cordless rechargeable drill for drilling and driving screws without a power lead. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "GSR 185LI" },
      { label: "Voltage", value: "18V" },
      { label: "Type", value: "Cordless drill" },
      { label: "Warranty", value: "1 year" },
    ],
  },
  {
    slug: "bosch-cordless-screwdriver-12v-gsr120",
    name: "Bosch Cordless Screwdriver 12V GSR 120",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GSR120.png",
    price: 33605,
    summary: "12V cordless screwdriver for light driving and drilling.",
    description:
      "The Bosch GSR 120 is a 12V cordless screwdriver for light screwdriving and drilling. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "GSR 120" },
      { label: "Voltage", value: "12V" },
      { label: "Type", value: "Cordless screwdriver" },
      { label: "Warranty", value: "1 year" },
    ],
  },
  {
    slug: "bosch-laser-measuring-glm400",
    name: "Bosch Laser Measuring GLM400",
    brand: "Bosch",
    category: "power-tools",
    image: "/products/bosch/GLM400.jpeg",
    price: 40700,
    summary: "Laser distance measuring tool for accurate, quick measurement.",
    description:
      "The Bosch GLM400 is a laser distance measuring tool for fast, accurate measurement of lengths and areas. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "GLM400" },
      { label: "Type", value: "Laser distance measure" },
      { label: "Warranty", value: "1 year" },
    ],
  },
  {
    slug: "giant-air-compressor-100l-compressor100l",
    name: "Giant Air Compressor 100L COMPRESSOR100L",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/COMPRESSOR100L.jpeg",
    price: 104500,
    summary: "100L air compressor for workshop and site pneumatic work.",
    description:
      "The Giant COMPRESSOR100L is a 100L air compressor for powering pneumatic tools, inflation and general workshop and site work. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "COMPRESSOR100L" },
      { label: "Type", value: "Air compressor" },
      { label: "Tank capacity", value: "100L" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-air-compressor-60l-60lcompressor",
    name: "Giant Air Compressor 60L 60LCOMPRESSOR",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/60LCOMPRESSOR.jpeg",
    price: 82225,
    summary: "60L air compressor for workshop, inflation and pneumatic tools.",
    description:
      "The Giant 60LCOMPRESSOR is a 60L air compressor for powering pneumatic tools, inflation and general workshop and site work. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "60LCOMPRESSOR" },
      { label: "Type", value: "Air compressor" },
      { label: "Tank capacity", value: "60L" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-generator-2-5kva-spg2500",
    name: "Giant Generator 2.5KVA SPG2500",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/SPG2500.jpeg",
    price: 85250,
    summary: "2.5KVA generator for site and backup power.",
    description:
      "The Giant SPG2500 is a 2.5KVA generator for site tools, lighting and backup power needs. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "SPG2500" },
      { label: "Type", value: "Generator" },
      { label: "Capacity", value: "2.5KVA" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-generator-3kva-spg3000e1",
    name: "Giant Generator 3KVA SPG3000E1",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/SPG3000E1.jpeg",
    price: 122100,
    summary: "3KVA generator for heavier site and backup power loads.",
    description:
      "The Giant SPG3000E1 is a 3KVA generator for site tools, lighting and backup power needs. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "SPG3000E1" },
      { label: "Type", value: "Generator" },
      { label: "Capacity", value: "3KVA" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-generator-2-5kva-spg2500e1",
    name: "Giant Generator 2.5KVA SPG2500E1",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/SPG2500E1.jpeg",
    price: 95150,
    summary: "2.5KVA generator for site and backup power.",
    description:
      "The Giant SPG2500E1 is a 2.5KVA generator for site tools, lighting and backup power needs. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "SPG2500E1" },
      { label: "Type", value: "Generator" },
      { label: "Capacity", value: "2.5KVA" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-vacuum-cleaner-gvc22",
    name: "Giant Vacuum Cleaner GVC22",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/GVC22.png",
    price: 24200,
    summary: "Vacuum cleaner for workshop, site and domestic cleaning.",
    description:
      "The Giant GVC22 is a vacuum cleaner for workshop, site and household cleaning duties. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "GVC22" },
      { label: "Type", value: "Vacuum cleaner" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-cleaning-pressure-machine-ccm280",
    name: "Giant Cleaning Pressure Machine CCM280",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/CCM280.png",
    price: 45100,
    summary: "Cleaning pressure machine for high-pressure washing.",
    description:
      "The Giant CCM280 is a cleaning pressure (pressure washing) machine for washing vehicles, floors, machinery and equipment. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "CCM280" },
      { label: "Type", value: "Pressure cleaner" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-air-compressor-40l-40ltr",
    name: "Giant Air Compressor 40L 40LTR",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/40LTR.jpeg",
    price: 63250,
    summary: "40L air compressor for workshop and pneumatic tools.",
    description:
      "The Giant 40LTR is a 40L air compressor for powering pneumatic tools, inflation and general workshop and site work. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "40LTR" },
      { label: "Type", value: "Air compressor" },
      { label: "Tank capacity", value: "40L" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-air-compressor-24l-24l",
    name: "Giant Air Compressor 24L 24L",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/24L.jpeg",
    price: 35750,
    summary: "24L air compressor for light pneumatic and inflation work.",
    description:
      "The Giant 24L is a 24L air compressor for light pneumatic tools, inflation and general workshop use. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "24L" },
      { label: "Type", value: "Air compressor" },
      { label: "Tank capacity", value: "24L" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-air-compressor-24l-oil-free-ga-ddef24l",
    name: "Giant Air Compressor 24L (Oil Free) GA-DDOF24L",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/GA-DDOF24L.png",
    price: 41250,
    summary: "24L oil-free air compressor for clean, low-maintenance operation.",
    description:
      "The Giant GA-DDOF24L is a 24L oil-free air compressor for clean, low-maintenance operation powering pneumatic tools and inflation. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "GA-DDOF24L" },
      { label: "Type", value: "Air compressor" },
      { label: "Tank capacity", value: "24L" },
      { label: "Operation", value: "Oil-free" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "giant-vacuum-cleaner-30l-gvc30",
    name: "Giant Vacuum Cleaner 30L GVC30",
    brand: "Giant",
    category: "power-tools",
    image: "/products/giant/GVC30.png",
    price: 29480,
    summary: "30L vacuum cleaner for workshop, site and heavy-duty cleaning.",
    description:
      "The Giant GVC30 is a 30L vacuum cleaner for workshop, site and heavy-duty cleaning duties. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "GVC30" },
      { label: "Type", value: "Vacuum cleaner" },
      { label: "Capacity", value: "30L" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-sliding-miter-saw-cm10s",
    name: "Humhon Sliding Miter Saw CM10S",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/CM10S.png",
    price: 74250,
    summary: "Sliding compound miter saw for accurate crosscuts and mitres.",
    description:
      "The Humhon CM10S sliding compound miter saw handles clean crosscuts, mitres and bevel cuts in timber, moulding and trim. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "CM10S" },
      { label: "Type", value: "Sliding compound miter saw" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-electric-vibrator-bk-cv35a",
    name: "Humhon Electric Vibrator BK-CV35A",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/BK-CV35A.jpeg",
    price: 23650,
    summary: "Electric vibrator for compacting concrete and screed work.",
    description:
      "The Humhon BK-CV35A electric (poker) vibrator compacts concrete, screed and formwork on site. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "BK-CV35A" },
      { label: "Type", value: "Electric vibrator" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-drywall-sander-ws180",
    name: "Humhon Drywall Sander WS180",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/WS180.png",
    price: 22550,
    summary: "Drywall sander with dust extraction for smooth plasterboard finishing.",
    description:
      "The Humhon WS180 drywall sander smooths plasterboard joints and walls and connects to dust extraction. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "WS180" },
      { label: "Type", value: "Drywall sander" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-bench-grinder-5-grinder5",
    name: 'Humhon Bench Grinder 5" GRINDER5',
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/GRINDER5.jpeg",
    price: 10450,
    summary: 'Compact 5" twin-wheel bench grinder for sharpening and deburring.',
    description:
      'The Humhon GRINDER5 is a compact 5" twin-wheel bench grinder for workshop sharpening and deburring. Available for counter collection or island-wide delivery.',
    specs: [
      { label: "Model", value: "GRINDER5" },
      { label: "Wheel size", value: '5"' },
      { label: "Type", value: "Twin-wheel bench grinder" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-welding-200a-mma6005",
    name: "Humhon Welding Machine 200A MMA6005",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/MMA6005.png",
    price: 21890,
    summary: "200A arc welding machine for fabrication and site welding.",
    description:
      "The Humhon MMA6005 is a 200A arc welding machine for fabrication shops and site welding. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "MMA6005" },
      { label: "Type", value: "Arc welding machine" },
      { label: "Welding current", value: "200A" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-welding-160a-mma6001",
    name: "Humhon Welding Machine 160A MMA6001",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/MMA6001.png",
    price: 20900,
    summary: "160A arc welding machine for fabrication and repair work.",
    description:
      "The Humhon MMA6001 is a 160A arc welding machine for repair shops and fabrication. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "MMA6001" },
      { label: "Type", value: "Arc welding machine" },
      { label: "Welding current", value: "160A" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-cable-hoist-1000kg-pa1000",
    name: "Humhon Cable Hoist 1000kg PA1000",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/PA1000.png",
    price: 71500,
    summary: "1000kg cable hoist for lifting and positioning heavy loads.",
    description:
      "The Humhon PA1000 is a 1000kg cable hoist for lifting and positioning heavy loads on sites and workshops. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "PA1000" },
      { label: "Capacity", value: "1000 kg" },
      { label: "Type", value: "Cable hoist" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-cable-hoist-500kg-pa500",
    name: "Humhon Cable Hoist 500kg PA500",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/PA500.png",
    price: 49500,
    summary: "500kg cable hoist for lifting and positioning heavy loads.",
    description:
      "The Humhon PA500 is a 500kg cable hoist for lifting and positioning loads in workshops and on site. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "PA500" },
      { label: "Capacity", value: "500 kg" },
      { label: "Type", value: "Cable hoist" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-demolition-hammer-1050w-dh810",
    name: "Humhon Demolition Hammer 1050W DH810",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/dh810.webp",
    price: 24750,
    summary: "1050W demolition hammer for concrete breaking and chiselling.",
    description:
      "The Humhon DH810 is a 1050W demolition hammer for breaking concrete, chiselling and chasing out masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "DH810" },
      { label: "Type", value: "Demolition hammer" },
      { label: "Power input", value: "1050W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-polisher-1400w-bcp-9227c",
    name: "Humhon Polisher 1400W BCP-9227C",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/BCP-9227C.gif",
    price: 23100,
    summary: "1400W polisher for polishing, cutting and light grinding.",
    description:
      "The Humhon BCP-9227C is a 1400W polisher suited to polishing, cutting and light grinding on stone and concrete. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "BCP-9227C" },
      { label: "Type", value: "Polisher" },
      { label: "Power input", value: "1400W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-industrial-blower-2-5-eb212",
    name: "Humhon Industrial Blower 2 1/2\" EB212",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/EB212.jpg",
    price: 13090,
    summary: "Industrial blower with a 2 1/2\" outlet for clearing debris and dust.",
    description:
      "The Humhon EB212 is an industrial blower with a 2 1/2\" outlet for clearing dust, debris and offcuts from workshops and sites. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "EB21/2" },
      { label: "Outlet size", value: "2 1/2\"" },
      { label: "Type", value: "Industrial blower" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-industrial-blower-2-eb02",
    name: "Humhon Industrial Blower 2\" EB02",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/EB02.jpg",
    price: 10450,
    summary: "Industrial blower with a 2\" outlet for clearing debris and dust.",
    description:
      "The Humhon EB02 is an industrial blower with a 2\" outlet for clearing dust and debris from workshops and construction sites. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "EB02" },
      { label: "Outlet size", value: "2\"" },
      { label: "Type", value: "Industrial blower" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-bench-drill-1hp-dsk25",
    name: "Humhon Bench Drill 1HP DSK25",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/DSK25.jpeg",
    price: 99000,
    summary: "1HP bench drill for precision drilling in workshops.",
    description:
      "The Humhon DSK25 is a 1HP bench (pillar) drill for accurate, repeatable drilling in workshop fabrication. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "DSK25" },
      { label: "Type", value: "Bench drill" },
      { label: "Power input", value: "1 HP" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-rotary-hammer-800w-rh26",
    name: "Humhon Rotary Hammer 800W RH26",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/RH26.png",
    price: 17600,
    summary: "800W rotary hammer for drilling and chiselling in masonry.",
    description:
      "The Humhon RH26 is an 800W rotary hammer for hammer drilling and chiselling in masonry and concrete. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "RH26" },
      { label: "Type", value: "Rotary hammer" },
      { label: "Power input", value: "800W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-router-1650w-3612br",
    name: "Humhon Router 1650W 3612BR",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/3612BR.png",
    price: 22550,
    summary: "1650W router for edge work, grooving and mortising.",
    description:
      "The Humhon 3612BR is a 1650W router for edge profiling, grooving and mortising in wood. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "3612 BR" },
      { label: "Type", value: "Router" },
      { label: "Power input", value: "1650W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-angle-grinder-4-5-ag6066",
    name: "Humhon Angle Grinder 4 1/2\" 760W AG6066",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/AG6066.png",
    price: 8745,
    summary: "Angle grinder 4 1/2\" 760W for cutting and grinding.",
    description:
      "The Humhon AG6066 is a 4 1/2\" 760W angle grinder for cutting and grinding metal and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "AG6066" },
      { label: "Disc size", value: "4 1/2\"" },
      { label: "Power input", value: "760W" },
      { label: "Type", value: "Angle grinder" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-trimmer-710w-et0702",
    name: "Humhon Trimmer 710W ET0702",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/ET0702.webp",
    price: 23100,
    summary: "710W trimmer for edging lawns and light grass cutting.",
    description:
      "The Humhon ET0702 is a 710W trimmer for edging lawns and light grass cutting around gardens and sites. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "ET0702" },
      { label: "Type", value: "Grass trimmer" },
      { label: "Power input", value: "710W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-heat-gun-2000w-hg118v",
    name: "Humhon Heat Gun 2000W HG118V",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/HG118V.png",
    price: 7150,
    summary: "2000W heat gun for stripping, shrinking and shaping.",
    description:
      "The Humhon HG118V is a 2000W heat gun for paint stripping, shrink wrapping and heat shaping. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "HG118V" },
      { label: "Type", value: "Heat gun" },
      { label: "Power input", value: "2000W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-miter-saw-1650w-cm104",
    name: "Humhon Miter Saw 1650W CM104",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/CM104.png",
    price: 40425,
    summary: "1650W miter saw for crosscuts and angle cuts.",
    description:
      "The Humhon CM104 is a 1650W miter saw for accurate crosscuts and angle cuts in timber. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "CM104" },
      { label: "Type", value: "Miter saw" },
      { label: "Power input", value: "1650W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-planer-580w-ep1900b",
    name: "Humhon Planer 580W EP1900B",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/EP1900B.png",
    price: 11220,
    summary: "580W planer for flattening timber surfaces.",
    description:
      "The Humhon EP1900B is a 580W planer for flattening and smoothing timber surfaces. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "EP1900B" },
      { label: "Type", value: "Planer" },
      { label: "Power input", value: "580W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-die-grinder-420w-dg618",
    name: "Humhon Die Grinder 420W DG618",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/DG618.png",
    price: 13750,
    summary: "420W die grinder for precision cutting and grinding.",
    description:
      "The Humhon DG618 is a 420W die grinder for precision cutting, shaping and grinding. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "DG618" },
      { label: "Type", value: "Die grinder" },
      { label: "Power input", value: "420W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-welding-250a-mma6006",
    name: "Humhon Welding Machine 250A MMA6006",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/MMA6006.png",
    price: 26950,
    summary: "250A arc welding machine for fabrication and site welding.",
    description:
      "The Humhon MMA6006 is a 250A arc welding machine for demanding fabrication and site welding. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "MMA6006" },
      { label: "Type", value: "Arc welding machine" },
      { label: "Welding current", value: "250A" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-grass-trimmer-550w-ebc300",
    name: "Humhon Grass Trimmer 550W EBC300",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/EBC300.jpeg",
    price: 15730,
    summary: "550W grass trimmer for lawns and light vegetation.",
    description:
      "The Humhon EBC300 is a 550W grass trimmer for lawns and light vegetation around gardens and sites. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "EBC300" },
      { label: "Type", value: "Grass trimmer" },
      { label: "Power input", value: "550W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-brush-cutter-1000w-bg328",
    name: "Humhon Brush Cutter 1000W BG328",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/BG328.jpeg",
    price: 23650,
    summary: "1000W brush cutter for heavy grass and scrub.",
    description:
      "The Humhon BG328 is a 1000W brush cutter for clearing heavy grass and scrub. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "BG328" },
      { label: "Type", value: "Brush cutter" },
      { label: "Power input", value: "1000W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-air-nailer-f50",
    name: "Humhon Air Nailer F50",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/F50.png",
    price: 10175,
    summary: "Pneumatic air nailer for rapid nailing and finishing.",
    description:
      "The Humhon F50 is a pneumatic air nailer (model F50) for rapid, consistent nailing in timber and finishing work. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "F50" },
      { label: "Type", value: "Pneumatic air nailer" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-spray-gun-400cc-sgf75",
    name: "Humhon Spray Gun 400cc SGF75",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/SGF75.jpeg",
    price: 3245,
    summary: "400cc spray gun for painting and finishing coats.",
    description:
      "The Humhon SGF75 is a 400cc spray gun for applying paint and finishing coats evenly. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "SGF75" },
      { label: "Capacity", value: "400cc" },
      { label: "Type", value: "Spray gun" },
    ],
  },
  {
    slug: "humhon-circular-saw-1450w-cs7008x",
    name: "Humhon Circular Saw 1450W CS7008X",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/CS7008X.png",
    price: 17600,
    summary: "1450W circular saw for straight cuts in timber and boards.",
    description:
      "The Humhon CS7008X is a 1450W circular saw for straight, clean cuts in timber and board material. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "CS7008X" },
      { label: "Type", value: "Circular saw" },
      { label: "Power input", value: "1450W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-bench-grinder-8-md200",
    name: "Humhon Bench Grinder 8\" MD200",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/MD200.png",
    price: 16500,
    summary: "Twin-wheel 8\" bench grinder for sharpening and deburring.",
    description:
      "The Humhon MD200 is an 8\" twin-wheel bench grinder for workshop sharpening, deburring and light metal finishing. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "MD200" },
      { label: "Wheel size", value: "8\"" },
      { label: "Type", value: "Twin-wheel bench grinder" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-bench-grinder-6-md150",
    name: "Humhon Bench Grinder 6\" MD150",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/MD150.png",
    price: 12650,
    summary: "Twin-wheel 6\" bench grinder for sharpening and deburring.",
    description:
      "The Humhon MD150 is a 6\" twin-wheel bench grinder for workshop sharpening, deburring and light metal finishing. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "MD150" },
      { label: "Wheel size", value: "6\"" },
      { label: "Type", value: "Twin-wheel bench grinder" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-cut-off-2000w-cm14c",
    name: "Humhon Cut-Off 2000W CM14C",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/CM14C.png",
    price: 28160,
    summary: "2000W cut-off machine for cutting metal and masonry.",
    description:
      "The Humhon CM14C is a 2000W cut-off machine for cutting metal, rebar and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "CM14C" },
      { label: "Type", value: "Cut-off machine" },
      { label: "Power input", value: "2000W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-angle-grinder-4-ag6016",
    name: "Humhon Angle Grinder 4\" 750W AG6016",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/AG6016.png",
    price: 8635,
    summary: "Angle grinder 4\" 750W for cutting and grinding.",
    description:
      "The Humhon AG6016 is a 4\" 750W angle grinder for cutting and grinding metal and masonry. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "AG6016" },
      { label: "Disc size", value: "4\"" },
      { label: "Power input", value: "750W" },
      { label: "Type", value: "Angle grinder" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-jigsaw-500w-js6003",
    name: "Humhon Jigsaw 500W JS6003",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/JS6003.png",
    price: 9130,
    summary: "500W jigsaw for curved and straight cuts in wood.",
    description:
      "The Humhon JS6003 is a 500W jigsaw for curved and straight cuts in wood and board material. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "JS6003" },
      { label: "Type", value: "Jigsaw" },
      { label: "Power input", value: "500W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-electric-blower-500w-eb825",
    name: "Humhon Electric Blower 500W EB825",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/EB825.png",
    price: 6930,
    summary: "500W electric blower for clearing dust and debris.",
    description:
      "The Humhon EB825 is a 500W electric blower for clearing dust, leaves and light debris. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "EB825" },
      { label: "Type", value: "Electric blower" },
      { label: "Power input", value: "500W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-rotary-hammer-1350w-rh32kv",
    name: "Humhon Rotary Hammer 1350W RH32KV",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/RH32KV.png",
    price: 27500,
    summary: "1350W rotary hammer for heavy drilling and chiselling.",
    description:
      "The Humhon RH32KV is a 1350W rotary hammer for heavy hammer drilling and chiselling in masonry and concrete. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "RH32KV" },
      { label: "Type", value: "Rotary hammer" },
      { label: "Power input", value: "1350W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-electric-mixer-em168",
    name: "Humhon Electric Mixer EM168",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/EM168.jpeg",
    price: 15950,
    summary: "Electric mixer for mixing mortar and small batches.",
    description:
      "The Humhon EM168 is an electric mixer for mixing mortar, plaster and small concrete batches on site. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "EM168" },
      { label: "Type", value: "Electric mixer" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-cordless-drill-21v-cd523t",
    name: "Humhon Cordless Drill 21V CD523T",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/CD523T.png",
    price: 20790,
    summary: "21V cordless drill for drilling and driving screws.",
    description:
      "The Humhon CD523T is a 21V cordless drill for drilling and driving screws without a power lead. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "CD523T" },
      { label: "Voltage", value: "21V" },
      { label: "Type", value: "Cordless drill" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-cordless-drill-12v-cd505",
    name: "Humhon Cordless Drill 12V CD505",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/CD505.jpeg",
    price: 13090,
    summary: "12V cordless drill for light drilling and screwing.",
    description:
      "The Humhon CD505 is a 12V cordless drill for light drilling and driving screws. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "CD505" },
      { label: "Voltage", value: "12V" },
      { label: "Type", value: "Cordless drill" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "humhon-hand-drill-800w-eid525",
    name: "Humhon Hand Drill 800W EID525",
    brand: "Humhon",
    category: "power-tools",
    image: "/products/humhon/EID525.jpeg",
    price: 9130,
    summary: "800W impact hand drill for masonry and timber.",
    description:
      "The Humhon EID525 is an 800W impact hand drill for drilling masonry and timber. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "EID525" },
      { label: "Type", value: "Impact hand drill" },
      { label: "Power input", value: "800W" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-chisal-machine-mk361",
    name: "Wipro Chisal Machine MK361",
    brand: "Wipro",
    category: "machinery-compressors",
    image: "/products/wipro/MK361.jpeg",
    price: 93500,
    summary: "Chisal (kudumbi) machine for site mechanical work.",
    description:
      "The Wipro MK361 chisal machine (kudumbi machine) is built for dependable site mechanical work. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "MK361" },
      { label: "Type", value: "Chisal (kudumbi) machine" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-motor-3hp-yl90lw23hp",
    name: "Wipro Motor 3HP YL90LW23HP",
    brand: "Wipro",
    category: "machinery-compressors",
    image: "/products/wipro/YL90LW23HP.png",
    price: 59400,
    summary: "3HP electric motor for pumps and machinery.",
    description:
      "The Wipro YL90LW23HP is a 3HP electric motor for driving pumps, compressors and workshop machinery. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "YL90LW23HP" },
      { label: "Power", value: "3 HP" },
      { label: "Type", value: "Electric motor" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-polythene-sealer-400mm-fre400",
    name: "Wipro Polythene Sealer 400mm FRE400",
    brand: "Wipro",
    category: "machinery-compressors",
    image: "/products/wipro/FRE400.png",
    price: 26950,
    summary: "400mm (16\") polythene heat sealer for sealing bags.",
    description:
      "The Wipro FRE400 is a 400mm (16\") polythene heat sealer for sealing polythene and plastic bags. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "FRE400" },
      { label: "Sealing width", value: "400mm (16\")" },
      { label: "Type", value: "Polythene sealer" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-sander-220w-w4935",
    name: "Wipro Sander 220W W4935",
    brand: "Wipro",
    category: "power-tools",
    image: "/products/wipro/W4935.png",
    price: 13750,
    summary: "220W sander for sanding and finishing surfaces.",
    description:
      "The Wipro W4935 is a 220W sander for sanding and finishing wood and painted surfaces. Distributed by Ceylon Platinum Trading (PVT) Ltd, Matara, and available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "W4935" },
      { label: "Power input", value: "220W" },
      { label: "Type", value: "Sander" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-battery-charger-400w-bc400",
    name: "Wipro Battery Charger 400W BC400",
    brand: "Wipro",
    category: "machinery-compressors",
    image: "/products/wipro/BC400.png",
    price: 17325,
    summary: "400W battery charger for charging batteries.",
    description:
      "The Wipro BC400 is a 400W battery charger for charging vehicle and industrial batteries. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "BC400" },
      { label: "Power input", value: "400W" },
      { label: "Type", value: "Battery charger" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-battery-charger-200w-bc200",
    name: "Wipro Battery Charger 200W BC200",
    brand: "Wipro",
    category: "machinery-compressors",
    image: "/products/wipro/BC200.png",
    price: 15510,
    summary: "200W battery charger for charging batteries.",
    description:
      "The Wipro BC200 is a 200W battery charger for charging vehicle and industrial batteries. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "BC200" },
      { label: "Power input", value: "200W" },
      { label: "Type", value: "Battery charger" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-hand-spray-16l-16b",
    name: "Wipro Hand Spray 16L 16B",
    brand: "Wipro",
    category: "machinery-compressors",
    image: "/products/wipro/16B.png",
    price: 25575,
    summary: "16L hand-operated sprayer for spraying liquids.",
    description:
      "The Wipro 16B is a 16L hand-operated (knapsack) sprayer for spraying water, chemicals and paints. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "16B" },
      { label: "Capacity", value: "16L" },
      { label: "Type", value: "Hand sprayer" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "wipro-washing-gun-do08",
    name: "Wipro Washing Gun DO08",
    brand: "Wipro",
    category: "machinery-compressors",
    image: "/products/wipro/DO08.jpeg",
    price: 2860,
    summary: "Washing gun for cleaning and pressure washing.",
    description:
      "The Wipro DO08 is a washing gun for cleaning, rinsing and pressure-washing applications. Available for counter collection or island-wide delivery.",
    specs: [
      { label: "Model", value: "DO08" },
      { label: "Type", value: "Washing gun" },
      { label: "Warranty", value: "6 months" },
    ],
  },
  {
    slug: "air-compressor",
    name: "Air Compressor",
    brand: "To be confirmed",
    category: "machinery-compressors",
    image: "/products/compressor.png",
    summary: "Reliable air compressor for workshops, site work and pneumatic tools.",
    description:
      "An air compressor supplied by Ceylon Platinum Trading (PVT) Ltd, Matara, built to power pneumatic tools, inflation and general workshop and site work across Sri Lanka. Exact model, capacity and duty details are confirmed with our team at checkout.",
    specs: [
      { label: "Type", value: "Air compressor" },
      { label: "Tank capacity", value: "To be confirmed" },
      { label: "Pressure rating", value: "To be confirmed" },
      { label: "Displacement", value: "To be confirmed" },
      { label: "Warranty", value: "To be confirmed" },
    ],
  },
];

export const services = [
  {
    slug: "bulk-supply",
    title: "Bulk & Project Supply",
    blurb:
      "Volume pricing and consolidated supply for contractors, builders and project sites — one order, one invoice, one delivery.",
    image: photos.showroom,
  },
  {
    slug: "island-wide-delivery",
    title: "Island-Wide Delivery",
    blurb:
      "Delivery of tools, paints, hardware and machinery from our Matara warehouse to sites across Sri Lanka.",
    image: photos.machinery,
  },
  {
    slug: "distributor-partnerships",
    title: "Distributor Partnerships",
    blurb:
      "Wholesale and reseller arrangements for hardware shops across the Southern Province and beyond.",
    image: photos.handTools,
  },
  {
    slug: "custom-orders",
    title: "Custom & Indent Orders",
    blurb:
      "Not in stock? We source specific tools, fittings and machinery to order through our brand partners.",
    image: photos.powerTools,
  },
  {
    slug: "colour-mixing",
    title: "In-Store Colour Mixing",
    blurb:
      "Custom paint colour mixing on our in-store machine, matched while you wait at the Matara showroom.",
    image: photos.paintMixing,
  },
  {
    slug: "trade-advice",
    title: "Trade & Technical Advice",
    blurb:
      "Practical guidance from a team with hands-on construction knowledge — the right tool for the job, first time.",
    image: photos.hardware,
  },
];

export const faqs = [
  {
    q: "What is Ceylon Platinum Trading (PVT) Ltd?",
    a: "Ceylon Platinum Trading (PVT) Ltd is a hardware and construction products distributor based at 167/B1 Old Tangalle Road, Kotuwegoda, Matara, Sri Lanka. We supply power tools, hand tools, paints and coatings, door and window hardware, machinery and compressors, and sealants and adhesives to homeowners, contractors, builders and hardware retailers.",
  },
  {
    q: "Where is Ceylon Platinum Trading located?",
    a: "Our showroom and office are at 167/B1 Old Tangalle Road, Kotuwegoda, Matara 81000, Sri Lanka, in the Southern Province. You can call 041-222-3298 or message 076 055 6075 on WhatsApp.",
  },
  {
    q: "What are your opening hours?",
    a: "Ceylon Platinum Trading is open Monday to Saturday, 9:00 AM to 5:00 PM. We are closed on Sundays.",
  },
  {
    q: "Which brands does Ceylon Platinum Trading distribute?",
    a: "We distribute Bosch, Tolsen, Humhon, Lesso, Asian Paints, Causeway, Bellucci, OMAC, Giant, Wipro, Multibond and As-Ron.",
  },
  {
    q: "How do I place an order?",
    a: "Browse the product catalogue on this site, add items to your cart, enter your delivery location at checkout and send the order straight to our WhatsApp Business number (076 055 6075). Our team confirms availability, pricing and delivery with you directly.",
  },
  {
    q: "Do you deliver outside Matara?",
    a: "Yes. Ceylon Platinum Trading delivers island-wide across Sri Lanka from our Matara base. Delivery cost and lead time are confirmed by our team when your WhatsApp order is received.",
  },
  {
    q: "Can I pay online?",
    a: "No. There is no online payment on this website. Orders are sent to our WhatsApp Business number and our team confirms pricing and payment arrangements with you before dispatch.",
  },
  {
    q: "Do you supply contractors and hardware shops in bulk?",
    a: "Yes. We handle bulk and project supply for contractors and builders, and wholesale distributor partnerships for hardware retailers. Contact us on 041-222-3298 to discuss trade terms.",
  },
];
