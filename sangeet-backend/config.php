<?php
$servername = "localhost";
$username = "root";          
$password = "";              
$dbname = "sangeet_db";      

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// echo "Connected successfully";
?>
