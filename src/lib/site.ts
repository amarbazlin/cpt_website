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
  { name: "Bosch", logo: "/brands/bosch.png" },
  { name: "Kevin", logo: "/brands/kevin.png" },
  { name: "Bellucci", logo: "/brands/bellucci.png" },
  { name: "Humhon", logo: "/brands/humhon.png" },
  { name: "Melwa", logo: "/brands/melwa.png" },
  { name: "National PVC", logo: "/brands/national-pvc.png" },
  { name: "Rhino", logo: "/brands/rhino.jpg" },
  { name: "S-Lon", logo: "/brands/s-lon.png" },
  { name: "Tolsen", logo: "/brands/tolsen.png" },
  { name: "Wipro", logo: "/brands/wipro.png" },
  { name: "Wokin", logo: "/brands/wokin.jpg" },
  { name: "Multibond", logo: "/brands/multibond.jpg" },
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
};

/**
 * Only products with photography and label details supplied by the client.
 * Add new entries here as product photos and specifications are provided.
 * Specification values marked "To be confirmed" are placeholders.
 */
export const products: Product[] = [
  {
    slug: "humhon-md-200a-bench-grinder-8",
    name: 'Humhon MD-200A Bench Grinder 8"',
    brand: "Humhon",
    category: "power-tools",
    image: "/products/bench.png",
    summary: 'Twin-wheel 8" bench grinder for workshop sharpening and deburring.',
    description:
      'The Humhon MD-200A is an 8" twin-wheel bench grinder supplied by Ceylon Platinum Trading (PVT) Ltd in Matara. Built for workshop sharpening, deburring and metal finishing, it mounts on a steel base with front-mounted power switch and eye shields over both wheels. Available for counter collection at our Old Tangalle Road showroom or island-wide delivery.',
    specs: [
      { label: "Model", value: "MD-200A" },
      { label: "Wheel size", value: '8" (200 mm)' },
      { label: "Type", value: "Twin-wheel bench grinder" },
      { label: "Power input", value: "To be confirmed" },
      { label: "No-load speed", value: "To be confirmed" },
      { label: "Warranty", value: "To be confirmed" },
    ],
  },
  {
    slug: "humhon-igbt-inverter-welding-machine",
    name: "Humhon IGBT Inverter Welding Machine",
    brand: "Humhon",
    category: "machinery-compressors",
    image: "/products/welding.png",
    summary: "Portable IGBT inverter welding machine with digital amperage display.",
    description:
      "A portable IGBT inverter welding machine from Humhon, distributed by Ceylon Platinum Trading (PVT) Ltd, Matara. IGBT inverter technology with a digital amperage readout, carry handle and vented casing for continuous site work. Suited to fabrication shops, contractors and site welding across Sri Lanka's Southern Province.",
    specs: [
      { label: "Technology", value: "IGBT inverter" },
      { label: "Display", value: "Digital amperage readout" },
      { label: "Welding current range", value: "To be confirmed" },
      { label: "Input voltage", value: "To be confirmed" },
      { label: "Duty cycle", value: "To be confirmed" },
      { label: "Warranty", value: "To be confirmed" },
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
