export interface ProductSize {
  label: string;
  price: string;
}

export interface Product {
  name: string;
  subtitle: string;
  slug: string;
  origin: string;
  ingredients: string[];
  description: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  sizes: ProductSize[];
  longDescription: string[];
  brewingNotes: string;
  servings: string;
}

export const products: Product[] = [
  {
    name: "Earl Grey",
    subtitle: "Signature Blend",
    slug: "earl-grey",
    origin: "Darjeeling, India",
    ingredients: ["Bergamot", "Cornflower", "Silver Tips"],
    description:
      "A luminous first-flush Darjeeling scented with cold-pressed Calabrian bergamot and garnished with dried cornflower petals.",
    accentColor: "#6B8BAE",
    gradientFrom: "#1a2744",
    gradientTo: "#0d1520",
    sizes: [
      { label: "50g", price: "₹1,200" },
      { label: "100g", price: "₹2,200" },
      { label: "250g", price: "₹4,800" },
    ],
    longDescription: [
      "A delicate marriage of high-altitude Darjeeling and cold-pressed Calabrian bergamot — the finest bergamot grown on the sun-drenched slopes of Italy's Calabria region.",
      "Each leaf is handpicked during the first flush season, when the tea plants emerge from winter dormancy producing leaves of extraordinary complexity. The bright muscatel character of the Darjeeling is softened by the citrus florals of the bergamot, resulting in a cup that is luminous, aromatic, and long-finishing.",
    ],
    brewingNotes: "90°C · 2–3 minutes · 2.5g per 200ml",
    servings: "20–25 cups per 50g",
  },
  {
    name: "Ceylon Gold",
    subtitle: "Reserve Collection",
    slug: "ceylon-gold",
    origin: "Nuwara Eliya, Sri Lanka",
    ingredients: ["Golden Tips", "Honey", "Citrus"],
    description:
      "High-grown at 2,000m elevation, this luminous amber liquor carries notes of warm honey and bright citrus with a long, silky finish.",
    accentColor: "#C9A961",
    gradientFrom: "#6B4E0A",
    gradientTo: "#3D2B00",
    sizes: [
      { label: "50g", price: "₹1,800" },
      { label: "100g", price: "₹3,400" },
      { label: "250g", price: "₹7,200" },
    ],
    longDescription: [
      "Sourced exclusively from Nuwara Eliya — Sri Lanka's most elevated tea-growing region, often called 'Little England' for its cool, misty climate. The extreme altitude imparts a natural brightness and complexity that lower-grown teas cannot match.",
      "Our Ceylon Gold is characterised by golden tippy leaves that unfurl in the cup to reveal a luminous amber liquor. The natural honey-like sweetness requires no additives — a testament to the terroir of our carefully selected estates.",
    ],
    brewingNotes: "95°C · 3–4 minutes · 3g per 200ml",
    servings: "16–20 cups per 50g",
  },
  {
    name: "Premium Indian",
    subtitle: "Artisan Edition",
    slug: "premium-indian",
    origin: "Assam, India",
    ingredients: ["Cardamom", "Saffron", "Rose"],
    description:
      "A bold Assam base infused with hand-ground cardamom and rare Kashmiri saffron threads — a tribute to Persian tea ceremony.",
    accentColor: "#8B3A2A",
    gradientFrom: "#6B1A0A",
    gradientTo: "#3D0A00",
    sizes: [
      { label: "50g", price: "₹2,400" },
      { label: "100g", price: "₹4,400" },
      { label: "250g", price: "₹9,600" },
    ],
    longDescription: [
      "This blend pays homage to the Persian tradition of chai-e shirin — sweet spiced tea — that has anchored social ritual across the Iranian plateau for centuries. We begin with a robust, full-bodied Assam that provides the backbone for our spice symphony.",
      "Kashmiri saffron — among the world's most precious spices — is added in threads, not powder, ensuring a gentle release of colour and aroma. Hand-ground green cardamom and dried rose petals complete a blend that is both ancient and entirely its own.",
    ],
    brewingNotes: "98°C · 4–5 minutes · 3g per 200ml",
    servings: "16–20 cups per 50g",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
