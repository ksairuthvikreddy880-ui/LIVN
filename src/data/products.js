export const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: "Ivory Structured Blazer", 
    category: "Blazers", 
    price: 45000, 
    image: "/images/category_ethnic.png",
    description: "A sharp, tailored ivory blazer built for the modern woman. Clean silhouette, premium fabric, and a fit that commands attention in any room.",
    details: ["Premium Wool Blend", "Structured shoulder", "Includes matching trousers", "Dry clean only"]
  },
  { 
    id: 2, 
    name: "Maroon Draped Evening Dress", 
    category: "Dresses", 
    price: 32000, 
    image: "/images/category_dress.png",
    description: "A fluid, floor-length evening dress in deep maroon. Effortlessly elegant with a draped neckline and a silhouette that moves beautifully.",
    details: ["Premium Satin Blend", "Hand-finished seams", "Floor-sweeping length", "Custom fit available"]
  },
  { 
    id: 3, 
    name: "Minimal Gold Trim Jacket", 
    category: "Outerwear", 
    price: 18500, 
    image: "/images/category_kurta.png",
    description: "A clean, minimal jacket with subtle gold hardware. Versatile enough for day-to-night dressing — pairs with everything, elevates anything.",
    details: ["Soft Crepe Fabric", "Gold-tone hardware", "Relaxed modern fit", "Breathable lining"]
  },
  { 
    id: 4, 
    name: "Monochrome Co-ord Set", 
    category: "Co-ords", 
    price: 28000, 
    image: "/images/category_fusion.png",
    description: "A sleek monochrome co-ord set with a modern asymmetric cut. Minimal, confident, and built for the woman who sets the tone.",
    details: ["Raw Silk Blend", "Asymmetric hem", "Matte finish buttons", "Versatile styling"]
  }
];

export const getProductById = (id) => {
  return MOCK_PRODUCTS.find(p => p.id === parseInt(id));
};
