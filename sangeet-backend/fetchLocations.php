<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include('config.php');

$query = "SELECT * FROM locations";
$result = mysqli_query($conn, $query);

if ($result) {
    $locations = mysqli_fetch_all($result, MYSQLI_ASSOC);
    echo json_encode($locations);
} else {
    echo json_encode(["error" => "Failed to fetch locations"]);
}
?>
