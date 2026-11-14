<?php
function get_db(): PDO {
    $db_file = __DIR__ . '/store.db';
    $init = !file_exists($db_file);

    $pdo = new PDO("sqlite:" . $db_file);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    if ($init) {
        $sql = file_get_contents(__DIR__ . '/schema.sql');
        $pdo->exec($sql);
    }

    return $pdo;
}
