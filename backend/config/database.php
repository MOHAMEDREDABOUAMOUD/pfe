<?php
// Database credentials
$host = "localhost"; // Change this to your database host if different
$username = "pma"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$database = "alomrane"; // Replace with your MySQL database name

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>