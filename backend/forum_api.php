<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include('pdo.php'); // Assuming this sets up $conn without other output
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Login Logic
if ($method === 'POST' && $action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);

    // Log input for debugging
    if (isset($input['email'], $input['password'])) {
        $email = htmlspecialchars($input['email']);
        $password = $input['password'];

        error_log("Received login attempt for email: " . $email); // Log email for debugging

        $stmt = $conn->prepare("SELECT pass FROM forum WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            $stmt->bind_result($hashed_password);
            $stmt->fetch();

            if (password_verify($password, $hashed_password)) {
                http_response_code(200);
                echo json_encode(["message" => "Login successful"]);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "Incorrect password"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "User not found"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid input"]);
    }
    exit();
}

// Registration Logic
if ($method === 'POST' && !$action) {
    $input = json_decode(file_get_contents('php://input'), true);

    if (
        isset($input['firstName'], $input['lastName'], $input['email'], $input['number'], $input['password']) &&
        filter_var($input['email'], FILTER_VALIDATE_EMAIL)
    ) {
        $firstName = htmlspecialchars($input['firstName']);
        $lastName = htmlspecialchars($input['lastName']);
        $email = htmlspecialchars($input['email']);
        $number = htmlspecialchars($input['number']);
        $password = password_hash($input['password'], PASSWORD_BCRYPT);

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
    exit();
}
