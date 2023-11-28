<?php

// include("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$host = "localhost";
$username = "root";
$password = "";
$dbname = "campuschime";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn){
    die("Connection failed: " . mysqli_connect_error());
}
// echo "Yes";

// Disable error reporting for this script
error_reporting(0);

$retVal = "Edit failed.";
$isValid = true;
$status = 400;

$id = trim($_REQUEST['user_id']);
$lastname = trim($_REQUEST['lastname']);
$firstname = trim($_REQUEST['firstname']);
$contactnumber = trim($_REQUEST['contactnumber']);
$email = trim($_REQUEST['email']);
$password = trim($_REQUEST['password']);

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

if ($isValid) {
    try {
        $stmt = $conn->prepare("UPDATE users SET lastname = ?, firstname = ?, contactnumber = ?, email = ?, password = ? WHERE user_id = ?");
        $stmt->bind_param("sssssi", $lastname, $firstname, $contactnumber, $email, $hashedPassword, $id);
        $stmt->execute();
        $stmt->close();
        $status = 200;
        $retVal = "Contact edited.";
    } catch (Exception $e) {
        $retVal = $e->getMessage();
    }
}

$myObj = array(
    'status' => $status,
    'message' => $retVal,
);

echo json_encode($myObj, JSON_FORCE_OBJECT);
?>
