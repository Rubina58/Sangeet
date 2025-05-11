<?php
session_start();
// Log session data to check if the user is logged in
// error_log("Session ID: " . session_id()); // Log the session ID
// error_log("User ID: " . (isset($user_id) ? $user_id : "Not set")); // Check if 'user_id' is set

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Database configuration
include('config.php');

// Validate form data
$song_title = $_POST['song_title'] ?? null;
$genre_id = $_POST['genre'] ?? null;
$location_id = $_POST['location'] ?? null;
$artist = $_POST['artist'] ?? null; // Fetch artist value
$user_id = $_POST['user_id']?? null;
$longitude = $_POST['longitude']?? null;
$latitude = $_POST['latitude']?? null;

if (empty($song_title) || empty($genre_id) ||empty($location_id) || empty($artist) || empty($user_id) || empty($longitude) || empty($latitude)) {
    echo json_encode(["error" => "Song title, genre, locations, user id, latitude, longitude and artist are required"]);
    exit();
}

// Check if user is logged in
if (!isset($user_id)) {
    $response = [
        "error" => "User not logged in !! Please Try Again!!"
    ];
    // echo json_encode($_SESSION);
    echo json_encode($response);
    exit();
}

// Validate longitude and latitude
if (!is_numeric($longitude) || !is_numeric($latitude)) {
    echo json_encode(["error" => "Invalid longitude or latitude"]);
    exit();
}

// Handle file uploads
$uploadDir = 'uploads/music/';
$imageDir = 'uploads/images/';
$filePath = $imagePath = null;

// Validate and move song file
if (isset($_FILES['file']) && $_FILES['file']['error'] === 0) {
    $fileTmp = $_FILES['file']['tmp_name'];
    $fileExt = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    $filePath = $uploadDir . uniqid() . '.' . $fileExt;

    if (!move_uploaded_file($fileTmp, $filePath)) {
        echo json_encode(["error" => "Error uploading song file"]);
        exit();
    }
} else {
    echo json_encode(["error" => "Song file is required"]);
    exit();
}

// Validate and move image file
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
    $imageTmp = $_FILES['image']['tmp_name'];
    $imageExt = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $imagePath = $imageDir . uniqid() . '.' . $imageExt;

    if (!move_uploaded_file($imageTmp, $imagePath)) {
        echo json_encode(["error" => "Error uploading image"]);
        exit();
    }
} else {
    $imagePath = 'uploads/images/default-image.jpg'; // Default image
}

// Insert song details into the database
$query = "INSERT INTO song (title, artist, genre_id, location_id, file_path, image_path, status, user_id,latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?,?,?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssiissidd", $song_title, $artist, $genre_id, $location_id, $filePath, $imagePath, $user_id, $latitude, $longitude);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Error uploading song"]);
}

$stmt->close();
$conn->close();
?>
