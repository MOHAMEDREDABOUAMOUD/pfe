<?php
include './config/database.php';
require_once './vendor/autoload.php'; // Include the Composer autoloader

use Firebase\JWT\JWT;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get user data from the form
    $login = $_POST["login"];
    $password = $_POST["pwd"];

    // Fetch user data from the database based on the provided login
    $sql = "SELECT immatricule, pwd FROM Utilisateur WHERE login='$login' AND pwd='$password' ";
    $result = $conn->query($sql);
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        // Password is correct, generate and return a JWT token
        http_response_code(200); // Set HTTP status code to 200 (OK)

        $user_id = $row["immatricule"];
        
        // JWT secret key (you should keep this secret and never share it)
        $secret_key = "your_secret_key"; // Replace with your secret key
        
        // JWT token expiration time (in seconds, e.g., 3600 seconds = 1 hour)
        $expiration_time = 3600; // Set the expiration time as needed
        
        // Prepare the data to be included in the token
        $payload = array(
            "user_id" => $user_id,
            "exp" => time() + $expiration_time
        );

        // Generate the JWT token
        $jwt_token = JWT::encode($payload, $secret_key);

        $response = array("message" => "Login successful", "token" => $jwt_token);
        echo json_encode($response);
    } else {
        http_response_code(401);
        $response = array("error" => "User not found");
        echo json_encode($response);
    }
}
?>