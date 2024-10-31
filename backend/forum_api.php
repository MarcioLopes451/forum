<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('pdo.php'); // Assuming this includes the $conn variable without echoes
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Read and decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (
        isset($input['firstName'], $input['lastName'], $input['email'], $input['number'], $input['password']) &&
        filter_var($input['email'], FILTER_VALIDATE_EMAIL)
    ) {
        $firstName = htmlspecialchars($input['firstName']);
        $lastName = htmlspecialchars($input['lastName']);
        $email = htmlspecialchars($input['email']);
        $number = htmlspecialchars($input['number']);
        $password = password_hash($input['password'], PASSWORD_BCRYPT);

        // Prepare and execute the SQL insert
        try {
            $stmt = $conn->prepare("INSERT INTO forum (first_name, last_name, email, phone_number, pass) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $firstName, $lastName, $email, $number, $password);
            $stmt->execute();

            http_response_code(201);
            echo json_encode(["message" => "User registered successfully"]);
        } catch (mysqli_sql_exception $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
    }
}
