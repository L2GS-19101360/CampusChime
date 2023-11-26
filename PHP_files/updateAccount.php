<?php

include("db_connection.php");
session_start();

$retVal = "Addition failed.";
$isValid = true;
$status = 400;
$data = -1;

$updateLname = trim($_GET['lastName']);
$updateFname = trim($_GET['firstName']);
$updateContact = trim($_GET['contactNumber']);
$updateEmail = trim($_GET['email']);
$updatePassword = trim($_GET['newPassword']);
$id = trim($_GET['id']);

if ($isValid) {
    $updatehashedPassword = password_hash($updatePassword, PASSWORD_DEFAULT);

    try {
        
        

    } catch (Exception $e) {
        $retVal = $e->getMessage();
    }
}

// Send a proper JSON response
$response = array(
    'status' => $status,
    'data' => $data,
    'message' => $retVal
);

header('Content-Type: application/json');
echo json_encode($response);

?>