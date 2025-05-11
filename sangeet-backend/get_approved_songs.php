<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'config.php';

// Retrieve latitude and longitude from query parameters
$latitude = $_GET['latitude'] ?? null;
$longitude = $_GET['longitude'] ?? null;
$search = $_GET['search'] ?? null;


// Validate latitude and longitude
if (!is_numeric($latitude) || !is_numeric($longitude)) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid latitude or longitude']);
    exit();
}

// SQL query to fetch songs ordered by distance
$sql = "
    SELECT id, title, artist,genre_id, file_path, image_path,
    (6371 * ACOS(
        COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) + 
        SIN(RADIANS(?)) * SIN(RADIANS(latitude))
    )) AS distance
    FROM song
    WHERE status = 'approved'
   
";

// Add search filter if a search query is provided
if (!empty($search)) {
    $sql .= " AND (title LIKE ? OR artist LIKE ?)";
}

// Order by distance
$sql .= " ORDER BY distance ASC";

// Prepare the query
$stmt = $conn->prepare($sql);

if (!empty($search)) {
    $searchTerm = '%' . $search . '%'; // Add wildcards for partial matching
    $stmt->bind_param('dddss', $latitude, $longitude, $latitude, $searchTerm, $searchTerm);
} else {
    $stmt->bind_param('ddd', $latitude, $longitude, $latitude);
}

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

// Initialize an array to hold the songs
$songs = [];

// Check if there are any results
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Construct URLs for song and image
        $songUrl = isset($row['file_path']) ? 'http://localhost/music-app/sangeet-backend/' . $row['file_path'] : 'http://localhost/music-app/sangeet-backend/uploads/music/default.mp3';
        $imageUrl = isset($row['image_path']) ? 'http://localhost/music-app/sangeet-backend/' . $row['image_path'] : 'http://localhost/music-app/sangeet-backend/uploads/images/default.jpg';

        // Add song details to the array
        $songs[] = [
            'id' => $row['id'],
            'song_name' => $row['title'],
            'artist' => $row['artist'],
            'genre_id' => $row['genre_id'],
            'song_url' => $songUrl,
            'image_url' => $imageUrl,
            'distance_km' => round($row['distance'], 2) // Round distance to 2 decimal places
        ];
    }
    // Return the songs as JSON
    echo json_encode(['status' => 'success', 'songs' => $songs]);
} else {
    // If no songs found, return an error message
    echo json_encode(['status' => 'error', 'message' => 'No approved songs found']);
}

// Close the database connection
$conn->close();
?>

