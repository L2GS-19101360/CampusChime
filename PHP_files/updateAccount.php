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
        
        $stmt = $conn->prepare("UPDATE your_table_name SET 
                               lastName = :lastName,
                               firstName = :firstName,
                               contactNumber = :contactNumber,
                               email = :email,
                               password = :password
                               WHERE id = :id");

        $stmt->bind_param(':lastName', $updateLname);
        $stmt->bind_param(':firstName', $updateFname);
        $stmt->bind_param(':contactNumber', $updateContact);
        $stmt->bind_param(':email', $updateEmail);
        $stmt->bind_param(':password', $updatehashedPassword);
        $stmt->bind_param(':id', $id);

        // Execute the query
        $stmt->execute();

        // Check if any rows were affected
        if ($stmt->num_rows() > 0) {
            $retVal = "Update successful.";
            $status = 200;
        }

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