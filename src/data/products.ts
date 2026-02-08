import { Product } from '../StoreContext';

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Celestial Rose Gold Necklace", 
    category: "Necklaces", 
    price: 1250, 
    image: "https://images.unsplash.com/photo-1762537132897-f6b577190e80?q=80&w=800", 
    tag: "Best Seller",
    description: "A breathtaking piece featuring hand-set crystals in 18k rose gold plating. Perfect for evening galas and formal celebrations.",
    material: "18k Rose Gold Plating, Cubic Zirconia",
    weight: "12.5g",
    images: [
      "https://images.unsplash.com/photo-1762537132897-f6b577190e80?q=80&w=800",
      "https://images.unsplash.com/photo-1582829239417-e348de9168d1?q=80&w=800"
    ]
  },
  { 
    id: 2, 
    name: "Midnight Sapphire Studs", 
    category: "Earrings", 
    price: 850, 
    image: "https://images.unsplash.com/photo-1721103418236-3e314539f849?q=80&w=800",
    description: "Elegant sapphire-colored gems surrounded by a halo of brilliant white stones.",
    material: "Sterling Silver, Lab-created Sapphire",
    weight: "4.2g",
    images: ["https://images.unsplash.com/photo-1721103418236-3e314539f849?q=80&w=800"]
  },
  { 
    id: 3, 
    name: "Eternal Unity Bridal Set", 
    category: "Bridal", 
    price: 4500, 
    image: "https://images.unsplash.com/photo-1624492235740-c283aab78e45?q=80&w=800", 
    tag: "New Arrival",
    description: "A complete bridal ensemble including necklace, earrings, and maang tikka.",
    material: "Gold Plated Copper, Kundan Work",
    weight: "45g",
    images: ["https://images.unsplash.com/photo-1624492235740-c283aab78e45?q=80&w=800"]
  },
  { 
    id: 4, 
    name: "Aurelian Gold Band", 
    category: "Rings", 
    price: 550, 
    image: "https://images.unsplash.com/photo-1758297679736-2e6ff92d2021?q=80&w=800",
    description: "Minimalist yet bold. The Aurelian band is a staple for any jewelry collection.",
    material: "14k Solid Gold",
    weight: "2.8g",
    images: ["https://images.unsplash.com/photo-1758297679736-2e6ff92d2021?q=80&w=800"]
  },
  { 
    id: 5, 
    name: "Majestic Hera Bangle", 
    category: "Bangles", 
    price: 1100, 
    image: "https://images.unsplash.com/photo-1582829239417-e348de9168d1?q=80&w=800",
    description: "Ornate traditional bangle with intricate filigree work.",
    material: "Gold Plated Brass",
    weight: "18.5g",
    images: ["https://images.unsplash.com/photo-1582829239417-e348de9168d1?q=80&w=800"]
  },
  { 
    id: 6, 
    name: "Diamond Tear Drop", 
    category: "Earrings", 
    price: 1600, 
    image: "https://images.unsplash.com/photo-1721103418236-3e314539f849?q=80&w=800",
    description: "Classic teardrop design for maximum brilliance.",
    material: "White Gold Plating",
    weight: "5.5g",
    images: ["https://images.unsplash.com/photo-1721103418236-3e314539f849?q=80&w=800"]
  }
];
