<?php
// Include your database connection file
include_once("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Check if the required parameters are set
if (
    isset($_GET['lastname']) &&
    isset($_GET['firstname']) &&
    isset($_GET['contactnumber']) &&
    isset($_GET['email']) &&
    isset($_GET['password']) &&
    isset($_GET['user_id'])
) {
    // Sanitize and store the parameters
    $lastname = mysqli_real_escape_string($conn, $_GET['lastname']);
    $firstname = mysqli_real_escape_string($conn, $_GET['firstname']);
    $contactnumber = mysqli_real_escape_string($conn, $_GET['contactnumber']);
    $email = mysqli_real_escape_string($conn, $_GET['email']);
    $password = mysqli_real_escape_string($conn, $_GET['password']);
    $customer_id = mysqli_real_escape_string($conn, $_GET['user_id']);

    // Hash the password (you should use a stronger hashing method in production)
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Update the row in the database
    $query = "UPDATE users SET 
        lastname = '$lastname',
        firstname = '$firstname',
        contactnumber = '$contactnumber',
        email = '$email',
        password = '$hashed_password'
        WHERE user_id = '$customer_id'";

    $result = mysqli_query($conn, $query);

    if ($result) {
        // Update successful
        echo "Update successful!";
    } else {
        // Update failed
        echo "Update failed: " . mysqli_error($conn);
    }
} else {
    // Required parameters not set
    echo "Missing required parameters!";
}

// Close the database connection
mysqli_close($conn);
?>
