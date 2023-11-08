<?php
include("db_connection.php");

$retVal = "Addition failed.";
$isValid = true;
$status = 400;
$data = -1;

$newLname = trim($_GET['lastname']);
$newFname = trim($_GET['firstname']);
$newContact = trim($_GET['contactnumber']);
$newEmail = trim($_GET['email']);
$newPassword = trim($_GET['password']);

//check in database if email exists
if ($isValid){
    $stmt = $conn->prepare("SELECT * FROM customer WHERE email = ?");
    $stmt->bind_param("s",$newEmail);
    $stmt->execute();

    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0){
        $isValid = false;
        $retVal = "Email already exists.";
    }
}

$response = array(
    'status' => $status,
    'data' => $data,
    'message' => $retVal
);

header('Content-Type: application/json');
echo json_encode($response);

?>