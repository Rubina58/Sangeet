<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

include 'config.php';



// Reading raw JSON data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if data is received
if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

// Extract data from JSON
$name = $data->name;
$email = $data->email;
$phone = $data->phone;
$password = $data->password;


$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Check if any field is empty
if (empty($name) || empty($email) || empty($phone) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// Check if email or phone already exists
$checkQuery = "SELECT * FROM users WHERE email='$email' OR phone='$phone'";
$result = $conn->query($checkQuery);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email or phone number already registered"]);
    exit;
}

// Insert data into the database
$query = "INSERT INTO users (name, email, phone, password) VALUES ('$name', '$email', '$phone', '$hashed_password')";
if ($conn->query($query) === TRUE) {
    echo json_encode(["status" => "success", "message" => "User registered successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed"]);
}

// Close the connection
$conn->close();
?>
