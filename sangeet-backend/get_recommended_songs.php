<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'config.php';

function getRecommendedSongs($conn, $userId, $limit = 10) {
    // Get user's top genres sorted by total listen_count
    $genreQuery = "
        SELECT g.g_id AS genre_id, g.g_name AS genre, SUM(ulh.listen_count) AS total_listen_count
        FROM user_listening_history ulh
        JOIN genre g ON ulh.genre_id = g.g_id
        WHERE ulh.user_id = ?
        GROUP BY g.g_id, g.g_name
        ORDER BY total_listen_count DESC
        LIMIT 3
    ";
    $genreStmt = $conn->prepare($genreQuery);
    $genreStmt->bind_param("i", $userId);
    $genreStmt->execute();
    $genreResult = $genreStmt->get_result();
    $userGenres = $genreResult->fetch_all(MYSQLI_ASSOC);

    // If no genre history, return random songs
    if (empty($userGenres)) {
        $randomQuery = "SELECT * FROM song WHERE status = 'approved' ORDER BY RAND() LIMIT ?";
        $randomStmt = $conn->prepare($randomQuery);
        $randomStmt->bind_param("i", $limit);
        $randomStmt->execute();
        $randomResult = $randomStmt->get_result();
        
        $recommendedSongs = [];
        while ($row = $randomResult->fetch_assoc()) {
            $recommendedSongs[] = processSong($row);
        }
        return $recommendedSongs;
    }

    // Construct recommendation query with genres
//     $placeholders = implode(',', array_fill(0, count($userGenres), '?'));
//     $recommendQuery = "
//     SELECT * FROM (
//         SELECT 
//             s.id, 
//             s.title, 
//             s.artist, 
//             s.genre_id, 
//             s.file_path, 
//             s.image_path, 
//             SUM(CASE 
//                 WHEN ulh.genre_id = s.genre_id THEN ulh.listen_count 
//                 ELSE 0 
//             END) AS relevance_score
//         FROM song s
//         LEFT JOIN user_listening_history ulh 
//             ON s.genre_id = ulh.genre_id AND ulh.user_id = ?
//         WHERE s.status = 'approved'
//           AND s.id IN (
//               SELECT song_id FROM user_listening_history WHERE user_id = ?
//           )
//           AND s.genre_id IN ($placeholders)
//         GROUP BY s.id, s.title, s.artist, s.genre_id, s.file_path, s.image_path

//         UNION

//         SELECT 
//             s.id, 
//             s.title, 
//             s.artist, 
//             s.genre_id, 
//             s.file_path, 
//             s.image_path, 
//             0 AS relevance_score
//         FROM song s
//         WHERE s.status = 'approved'
//           AND s.id NOT IN (
//               SELECT song_id FROM user_listening_history WHERE user_id = ?
//           )
//     ) AS combined_songs
//     ORDER BY relevance_score DESC, RAND()
//     LIMIT ?
// ";

//     $stmt = $conn->prepare($recommendQuery);

//     // Dynamically bind parameters
//     $bindTypes = str_repeat('i', count($userGenres) + 3); // +3 for userId, userId, and LIMIT
//     $genreIds = array_column($userGenres, 'genre_id');
//     $bindParams = array_merge([$bindTypes], [$userId, $userId], $genreIds, [$userId, $limit]);

//     $stmt = $conn->prepare($recommendQuery);
//     $stmt->bind_param(...$bindParams);
//     $stmt->execute();
//     $result = $stmt->get_result();
    $placeholders = implode(',', array_fill(0, count($userGenres), '?'));
    $recommendQuery = "
        SELECT s.*, 
               SUM(CASE 
                   WHEN ulh.genre_id = s.genre_id THEN ulh.listen_count 
                   ELSE 0 
               END) AS relevance_score
        FROM song s
        LEFT JOIN user_listening_history ulh ON s.genre_id = ulh.genre_id AND ulh.user_id = ?
        WHERE s.status = 'approved'
          AND s.id IN (
              SELECT song_id FROM user_listening_history WHERE user_id = ?
          )
          AND s.genre_id IN ($placeholders)
        GROUP BY s.id
        ORDER BY relevance_score DESC, RAND()
        LIMIT ?
    ";
    
    $stmt = $conn->prepare($recommendQuery);

    // Dynamically bind parameters
    $bindTypes = str_repeat('i', count($userGenres) + 2) . 'i';
    $genreIds = array_column($userGenres, 'genre_id');
    $bindParams = array_merge([$bindTypes], [$userId, $userId], $genreIds, [$limit]);
    $stmt->bind_param(...$bindParams);

    $stmt->execute();
    $result = $stmt->get_result();

    $recommendedSongs = [];
    while ($row = $result->fetch_assoc()) {
        $recommendedSongs[] = processSong($row);
    }

    return $recommendedSongs;
}

function processSong($row) {
    // Construct song and image URLs
    $songUrl = isset($row['file_path']) 
        ? 'http://localhost/music-app/sangeet-backend/' . $row['file_path']
        : 'http://localhost/music-app/sangeet-backend/uploads/music/default.mp3';

    $imageUrl = isset($row['image_path']) 
        ? 'http://localhost/music-app/sangeet-backend/' . $row['image_path']
        : 'http://localhost/music-app/sangeet-backend/uploads/images/default.jpg';

    return [
        'id' => $row['id'],
        'song_name' => $row['title'],
        'artist' => $row['artist'],
        'genre' => $row['genre_id'],
        'song_url' => $songUrl,
        'image_url' => $imageUrl
    ];
}

// Main recommendation endpoint
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['user_id'] ?? null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

    if ($userId) {
        $recommendedSongs = getRecommendedSongs($conn, $userId, $limit);
        echo json_encode([
            'status' => 'success', 
            'recommendations' => $recommendedSongs
        ]);
    } else {
        echo json_encode([
            'status' => 'error', 
            'message' => 'User ID is required'
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