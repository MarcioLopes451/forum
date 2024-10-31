<?php
$db_server = '127.0.0.1';  // Server hostname
$db_user = 'root';         // MySQL username
$db_pass = 'Elizandra1';   // MySQL password
$db_name = 'myDB';         // Database name
$db_port = 3306;           // MySQL port number

// Try to connect to the database
try {
    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name, $db_port);
    if (!$conn) {
        throw new Exception('Connection failed: ' . mysqli_connect_error());
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Database connection error: " . $e->getMessage()]);
    exit;
}
