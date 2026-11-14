<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/db.php';

$input = json_decode(file_get_contents("php://input"), true);
$action = $input['action'] ?? 'login';
$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');
$name = trim($input['name'] ?? '');

if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Email and password are required.']);
    exit;
}

try {
    $pdo = get_db();

    // Ensure users table exists just in case
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL
    )");

    if ($action === 'signup') {
        if (empty($name)) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Full name is required for registration.']);
            exit;
        }

        // Check if user already exists
        $checkStmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $checkStmt->execute([$email]);
        if ($checkStmt->fetch()) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'An account with this email already exists.']);
            exit;
        }

        // Create new user
        $userId = 'u_' . uniqid();
        $hash = password_hash($password, PASSWORD_BCRYPT);
        
        $insertStmt = $pdo->prepare("INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)");
        $insertStmt->execute([$userId, $email, $hash, $name]);

        echo json_encode([
            'ok' => true,
            'user' => [
                'id' => $userId,
                'email' => $email,
                'name' => $name
            ]
        ]);
    } else {
        // Login Action
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            echo json_encode([
                'ok' => true,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'name' => $user['name']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['ok' => false, 'error' => 'Invalid email or password.']);
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
