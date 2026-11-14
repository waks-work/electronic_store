<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/db.php';

try {
    $pdo = get_db();

    $stmt = $pdo->query("SELECT * FROM products");
    $raw_products = $stmt->fetchAll();

    $products = [];
    foreach ($raw_products as $p) {
        $spec_stmt = $pdo->prepare("SELECT spec_key, spec_value FROM product_specifications WHERE product_id = ?");
        $spec_stmt->execute([$p['id']]);
        $specs = [];
        foreach ($spec_stmt->fetchAll() as $spec) {
            $specs[$spec['spec_key']] = $spec['spec_value'];
        }

        $products[] = [
            'id' => $p['id'],
            'title' => $p['title'],
            'description' => $p['description'],
            'price' => (float)$p['price'],
            'rating' => (int)$p['rating'],
            'image' => $p['image'],
            'thumbnails' => [$p['image']],
            'stockCount' => (int)$p['stock_count'],
            'shippingCost' => (float)$p['shipping_cost'],
            'details' => $p['details'],
            'category' => $p['category'],
            'promotionTag' => $p['promotion_tag'],
            'specifications' => $specs
        ];
    }

    echo json_encode(['ok' => true, 'data' => $products]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
