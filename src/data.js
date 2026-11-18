import { Some } from "./types";
export let PRODUCTS = [
    {
        id: "p1",
        title: "Wireless ANC Headphones",
        description: "Active noise cancellation with high-fidelity acoustics.",
        price: 149.99,
        rating: 5,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
        thumbnails: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
        ],
        stockCount: 4,
        shippingCost: 5.0,
        details: "Premium over-ear wireless headphones.",
        specifications: { "Battery Life": "30 Hours" },
        category: "Audio",
        promotionTag: Some("SAVE 20%")
    }
];
export function set_products(newProducts) {
    PRODUCTS = newProducts;
}
;
