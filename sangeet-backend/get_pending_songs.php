<?php

// Allow cross-origin requests from your frontend (React app)
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// If it's a preflight request (OPTIONS), return a 200 response
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include database connection
include 'config.php';

// Set the response content type to JSON
header('Content-Type: application/json');

// SQL query to get all songs with status 'pending'
$query = "SELECT * FROM song WHERE status = 'pending'";

$result = mysqli_query($conn, $query);

if ($result) {
    $songs = [];
    
    // Fetch all rows from the result set
    while ($row = mysqli_fetch_assoc($result)) {
        $songs[] = $row;
    }

    // Return success status with songs data
    echo json_encode([
        'status' => 'success',
        'songs' => $songs
    ]);
} else {
    // If query fails, return an error response
    echo json_encode([
        'status' => 'error',
        'message' => 'Failed to fetch songs'
    ]);
}

// Close the database connection
mysqli_close($conn);
?>
