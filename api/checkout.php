<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

$input = json_decode(file_get_contents("php://input"), true);
$userId = trim($input['userId'] ?? 'guest');
$customerName = trim($input['customerName'] ?? '');
$shippingAddress = trim($input['shippingAddress'] ?? '');
$paymentMethod = trim($input['paymentMethod'] ?? 'Card');
$items = $input['items'] ?? [];

if (empty($customerName) || empty($shippingAddress) || empty($items)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Name, shipping address, and at least one cart item are required.']);
    exit;
}

try {
    $pdo = get_db();

    // Ensure tables exist if running against an existing store.db
    $pdo->exec("CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        shipping_address TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        total_amount REAL NOT NULL,
        created_at TEXT NOT NULL
    )");
    $pdo->exec("CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE
    )");

    $pdo->beginTransaction();

    $orderId = 'ORD-' . strtoupper(substr(uniqid(), -6));
    $createdAt = date('Y-m-d H:i:s');
    $totalAmount = 0.0;

    foreach ($items as $item) {
        $totalAmount += ((float)$item['price'] * (int)$item['quantity']);
    }

    $orderStmt = $pdo->prepare(
        "INSERT INTO orders (id, user_id, customer_name, shipping_address, payment_method, total_amount, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    $orderStmt->execute([$orderId, $userId, $customerName, $shippingAddress, $paymentMethod, $totalAmount, $createdAt]);

    $itemStmt = $pdo->prepare(
        "INSERT INTO order_items (order_id, product_id, title, price, quantity) VALUES (?, ?, ?, ?, ?)"
    );
    $stockStmt = $pdo->prepare(
        "UPDATE products SET stock_count = MAX(0, stock_count - ?) WHERE id = ?"
    );

    foreach ($items as $item) {
        $itemStmt->execute([
            $orderId,
            $item['id'],
            $item['title'],
            (float)$item['price'],
            (int)$item['quantity']
        ]);
        $stockStmt->execute([(int)$item['quantity'], $item['id']]);
    }

    $pdo->commit();

    echo json_encode([
        'ok' => true,
        'order' => [
            'id' => $orderId,
            'customerName' => $customerName,
            'shippingAddress' => $shippingAddress,
            'paymentMethod' => $paymentMethod,
            'totalAmount' => $totalAmount,
            'createdAt' => $createdAt,
            'items' => $items
        ]
    ]);
} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
