<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

include 'config.php';

// Handle listening history tracking
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get raw POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required parameters
    if (isset($data['user_id']) && isset($data['song_id'])) {
        $userId = $data['user_id'];
        $songId = $data['song_id'];
        $genreId = $data['genre_id'];

        // Check if entry exists
        $checkQuery = "SELECT id, listen_count FROM user_listening_history 
                       WHERE user_id = ? AND song_id = ?";
        $checkStmt = $conn->prepare($checkQuery);
        $checkStmt->bind_param("ii", $userId, $songId);
        $checkStmt->execute();
        $result = $checkStmt->get_result();

        if ($result->num_rows > 0) {
            // Update existing entry
            $updateQuery = "UPDATE user_listening_history 
                            SET listen_count = listen_count + 1, 
                                listened_at = CURRENT_TIMESTAMP 
                            WHERE user_id = ? AND song_id = ? AND genre_id = ?";
            $updateStmt = $conn->prepare($updateQuery);
            $updateStmt->bind_param("iii", $userId, $songId, $genreId);
            $updateStmt->execute();

            echo json_encode([
                'status' => 'success', 
                'message' => 'Listening history updated'
            ]);
        } else {
            // Insert new entry
            $insertQuery = "INSERT INTO user_listening_history 
                            (user_id, song_id,genre_id, listened_at, listen_count) 
                            VALUES (?, ?, ?, CURRENT_TIMESTAMP, 1)";
            $insertStmt = $conn->prepare($insertQuery);
            $insertStmt->bind_param("iii", $userId, $songId,$genreId );
            $insertStmt->execute();

            echo json_encode([
                'status' => 'success', 
                'message' => 'New listening history entry created'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error', 
            'message' => 'Missing user_id or song_id'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error', 
        'message' => 'Invalid request method'
    ]);
}

$conn->close();
?>