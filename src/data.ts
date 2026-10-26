import { l_product, Some, None } from "./types";

export const PRODUCTS: readonly l_product[] = [
  {
    id: "p1",
    title: "Wireless ANC Headphones",
    description: "Active noise cancellation with high-fidelity acoustics.",
    price: 149.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=60"
    ],
    stockCount: 4,
    shippingCost: 5.0,
    details: "Premium over-ear wireless headphones with custom dynamic drivers.",
    specifications: {
      "Battery Life": "30 Hours",
      "Bluetooth Version": "5.3",
      "Charging": "USB-C Fast Charge",
      "Weight": "250g"
    },
    category: "Audio",
    promotionTag: Some("SAVE 20%")
  },
  {
    id: "p2",
    title: "Mechanical RGB Keyboard",
    description: "Hot-swappable tactile switches with customizable backlight.",
    price: 89.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60"
    ],
    stockCount: 12,
    shippingCost: 0.0,
    details: "Compact layout designed for gamers and developers.",
    specifications: {
      "Switch Type": "Hot-swappable Brown",
      "Keycaps": "PBT Double-shot",
      "Connection": "Tri-mode (BT / 2.4G / Type-C)"
    },
    category: "Computing",
    promotionTag: None()
  },
  {
    id: "p3",
    title: "Ultra Wide Curved Monitor 34\"",
    description: "144Hz refresh rate with immersive 1500R curvature.",
    price: 429.99,
    rating: 5,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60"
    ],
    stockCount: 2,
    shippingCost: 15.0,
    details: "WQHD display designed for productive multitasking and gaming.",
    specifications: {
      "Resolution": "3440 x 1440",
      "Refresh Rate": "144Hz",
      "Panel": "VA Curved"
    },
    category: "Computing",
    promotionTag: Some("BEST SELLER")
  },
  {
    id: "p4",
    title: "Smart Watch Series X",
    description: "Heart rate monitor, GPS, and health tracking display.",
    price: 199.99,
    rating: 4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
    thumbnails: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
    ],
    stockCount: 8,
    shippingCost: 0.0,
    details: "Water-resistant smartwatch with always-on AMOLED display.",
    specifications: {
      "Display": "1.8\" AMOLED",
      "Water Resistance": "5ATM",
      "Battery": "Up to 7 days"
    },
    category: "Wearables",
    promotionTag: None()
  }
];
