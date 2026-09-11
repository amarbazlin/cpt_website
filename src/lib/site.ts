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
