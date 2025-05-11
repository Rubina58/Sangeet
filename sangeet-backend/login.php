<?php
session_start(); // Start session
error_reporting(E_ALL);
ini_set('display_errors', 0); // Hide errors from users
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log'); // Log errors to this file

// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:3000");  // Adjust accordingly if the frontend is different
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); // Allow credentials (cookies)
header("Content-Type: application/json");

// Handle OPTIONS request (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';



// Log incoming raw data for debugging
$rawData = file_get_contents("php://input");
error_log("Raw data received: " . $rawData); // Logs raw data to the PHP error log

// Decode JSON data from the request
$data = json_decode($rawData, true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];
    $password = $data['password'];

    // Prepare SQL query to fetch user by email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            // User authenticated successfully
            $_SESSION['user_id'] = $user['id']; // Store user data in the session
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['role'] = $user['role']; // Store the role (user or admin)

            // Check if phone_number exists
            $phone_number = isset($user['phone']) ? $user['phone'] : null; // Fallback to null if phone is not set
            if(isset($_SESSION['user_id']) && $_SESSION['user_id']){
                $response = [
                    "status" => "success",
                    "message" => "Login successful",
                    "user" => [
                        "id" => $user['id'],
                        "name" => $user['name'],
                        "email" => $user['email'],
                        "role" => $user['role'],
                        "phone_number" => $phone_number // Use the fallback
                    ]
                ];
            }else{
                $response = [
                    "status" => "error",
                    "message" => "error in session"
                ];
            }
           
        } else {
            // Invalid credentials
            $response = [
                "status" => "error",
                "message" => "Invalid email or password"
            ];
        }

        $stmt->close();
    } else {
        // Error preparing the SQL statement
        $response = [
            "status" => "error",
            "message" => "Database query preparation failed"
        ];
    }
} else {
    // Missing email or password
    $response = [
        "status" => "error",
        "message" => "Email and password are required"
    ];
}

$conn->close();

// Output the response as JSON
echo json_encode($response);

?>
