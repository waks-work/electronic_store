<?php
header("Content-Type: text/html; charset=UTF-8");
require_once __DIR__ . '/db.php';

try {
    $pdo = get_db();
    
    echo "<h2>Database Tables</h2>";
    $tables = $pdo->query("SELECT name FROM sqlite_master WHERE type='table'")->fetchAll(PDO::FETCH_COLUMN);

    foreach ($tables as $table) {
        echo "<h3>Table: {$table}</h3>";
        $rows = $pdo->query("SELECT * FROM {$table}")->fetchAll(PDO::FETCH_ASSOC);

        if (empty($rows)) {
            echo "<p><i>Empty table</i></p>";
            continue;
        }

        echo "<table border='1' cellpadding='8' style='border-collapse:collapse; margin-bottom:20px;'>";
        echo "<tr style='background:#f4f4f5;'>";
        foreach (array_keys($rows[0]) as $col) {
            echo "<th>{$col}</th>";
        }
        echo "</tr>";

        foreach ($rows as $row) {
            echo "<tr>";
            foreach ($row as $val) {
                echo "<td>" . htmlspecialchars($val ?? 'NULL') . "</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
