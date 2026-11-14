import { l_product, Result, Ok, Err, Some, None } from "./types";

export async function fetchl_products(): Promise<Result<readonly l_product[], string>> {
  try {
    const res = await fetch("http://localhost:8000/products.php");
    if (!res.ok) {
      return Err(`HTTP Error: ${res.status}`);
    }
    const json = await res.json();
    if (!json.ok) {
      return Err(json.error || "Server error");
    }

    const products: l_product[] = json.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
      rating: item.rating,
      image: item.image,
      thumbnails: item.thumbnails || [item.image],
      stockCount: item.stockCount,
      shippingCost: item.shippingCost,
      details: item.details,
      specifications: item.specifications || {},
      category: item.category,
      promotionTag: item.promotionTag ? Some(item.promotionTag) : None()
    }));

    return Ok(products);
  } catch (err: any) {
    return Err(err?.message || "Network request failed");
  }
}
