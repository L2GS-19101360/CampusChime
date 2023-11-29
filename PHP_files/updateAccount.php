<?php

include("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$retVal = "Addition failed.";
$isValid = true;
$status = 400;
$data = -1;

$getId = trim($_GET['user_id']);
$updateLname = trim($_GET['lastname']);
$updateFname = trim($_GET['firstname']);
$updateContact = trim($_GET['contactnumber']);
$updateEmail = trim($_GET['email']);
$updatePassword = trim($_GET['password']);

if ($isValid) {
    $hashedPassword = password_hash($updatePassword, PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("UPDATE users SET lastname=?,firstname=?,contactnumber=?,email=?,password=? WHERE user_id=?");
        $stmt->bind_param("ssissi", $updateLname, $updateFname, $updateContact, $updateEmail, $hashedPassword, $getId);
        $stmt->execute();
        $stmt->close();

        $data = $conn->insert_id;
        $status = 200;
        $retVal = "User account updated.";
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