<?php

include("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

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
        
        $stmt = $conn->prepare("UPDATE customer SET lastname=?,firstname=?,contactnumber=?,email=?,password=? WHERE customer_id=?");
        $stmt->bind_param("ssissi", $updateLname, $updateFname, $updateContact, $updateEmail, $updatehashedPassword, $id);
        $stmt->execute();
        $stmt->close();

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