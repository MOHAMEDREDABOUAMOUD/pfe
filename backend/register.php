<?php
include './config/database.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get user data from the form
    $login = $_POST["login"];
    $pwd = password_hash($_POST["pwd"], PASSWORD_BCRYPT);
    $nom = $_POST["nom"];
    $prenom = $_POST["prenom"];
    $email = $_POST["email"];
    $fonction = $_POST["fonction"];
    $sexe = $_POST["sexe"];

    // Insert the user data into the database
    $sql = "INSERT INTO Utilisateur ('mohammed', 'mohammed', 'mohammed', 'raji', 'rajiiim6@gmail.com', 'kolchi', 'rajl') VALUES ('$login', '$pwd', '$nom', '$prenom', '$email', '$fonction', '$sexe')";
    if ($conn->query($sql) === TRUE) {
        echo "User registered successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>