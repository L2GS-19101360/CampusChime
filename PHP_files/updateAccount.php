<?php

include("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$retVal = "Update failed.";
$isValid = true;
$status = 400;
$data = -1;

$getId = trim($_GET['user_id']);
$updateLname = trim($_GET['lastname']);
$updateFname = trim($_GET['firstname']);
$updateContact = trim($_GET['contactnumber']);
$updateEmail = trim($_GET['email']);
$updatePassword = trim($_GET['password']);
$updateImageName = trim($_GET['user_image']);

$updateImage = ''; // Initialize variable

if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $uploadDir = 'user_images/';
    $uploadFile = $uploadDir . basename($file['name']);
    $updateImage = $uploadFile;

    if (move_uploaded_file($file['tmp_name'], $uploadFile)) {
        // File uploaded successfully
    } else {
        $retVal = "Error uploading file.";
        $isValid = false;
    }
}

if ($isValid) {
    if ($updatePassword === "") {
        try {
            $stmt = $conn->prepare("UPDATE users SET lastname=?, firstname=?, contactnumber=?, email=?, user_image=? WHERE user_id=?");
            $stmt->bind_param("ssissi", $updateLname, $updateFname, $updateContact, $updateEmail, $updateImageName, $getId);
            $stmt->execute();
            $stmt->close();

            $data = $conn->insert_id;
            $status = 200;
            $retVal = "User account updated.";
        } catch (Exception $e) {
            $retVal = $e->getMessage();
        }
    } else {
        // Handle the case where the password is updated
        try {
            $stmt = $conn->prepare("UPDATE users SET lastname=?, firstname=?, contactnumber=?, email=?, password=?, user_image=? WHERE user_id=?");
            $stmt->bind_param("ssisssi", $updateLname, $updateFname, $updateContact, $updateEmail, $updatePassword, $updateImageName, $getId);
            $stmt->execute();
            $stmt->close();

            $data = $conn->insert_id;
            $status = 200;
            $retVal = "User account updated.";
        } catch (Exception $e) {
            $retVal = $e->getMessage();
        }
    }
}

$response = array(
    'status' => $status,
    'data' => $data,
    'message' => $retVal,
    'filename' => $updateImage, // Send the filename back to the frontend
);

header('Content-Type: application/json');
echo json_encode($response);
?>
