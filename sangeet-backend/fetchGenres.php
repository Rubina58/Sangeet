<?php
// Allow CORS
header("Access-Control-Allow-Origin: *"); // Replace '*' with your frontend's URL if you want to restrict access
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


include('config.php');

// Fetch genres
$query = "SELECT * FROM genre";
$result = $conn->query($query);

$genres = [];
while ($row = $result->fetch_assoc()) {
    $genres[] = $row;
}
// Return genres as JSON
echo json_encode($genres);

// Close the connection
$conn->close();
?>
