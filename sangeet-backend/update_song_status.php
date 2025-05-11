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

// Get the data from the POST request
$data = json_decode(file_get_contents('php://input'), true);

// Check if song_id and action are provided
if (isset($data['song_id']) && isset($data['action'])) {
    $song_id = $data['song_id'];
    $action = $data['action'];

    // Validate the action
    if ($action === 'approve' || $action === 'reject') {
        // Set the status based on the action
        $status = ($action === 'approve') ? 'approved' : 'rejected';

        // SQL query to update the song status
        $query = "UPDATE song SET status = '$status' WHERE id = '$song_id'";

        if (mysqli_query($conn, $query)) {
            // If update is successful
            echo json_encode([
                'status' => 'success',
                'message' => 'Song status updated successfully'
            ]);
        } else {
            // If query fails, return an error
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to update song status'
            ]);
        }
    } else {
        // Invalid action
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid action'
        ]);
    }
} else {
    // Missing song_id or action
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing song_id or action'
    ]);
}

// Close the database connection
mysqli_close($conn);
?>
