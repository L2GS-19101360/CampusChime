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

// Check in the database if the email exists
if ($isValid) {
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $newEmail);
    $stmt->execute();

    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $isValid = false;
        $retVal = "Email already exists.";
    }
}

// Insert Data
if ($isValid) {
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO users(lastname, firstname, contactnumber, email, password) VALUES (?,?,?,?,?)");
        $stmt->bind_param("ssiss", $newLname, $newFname, $newContact, $newEmail, $hashedPassword);
        $stmt->execute();
        $stmt->close();

        $data = $conn->insert_id;
        $status = 200;
        $retVal = "User account added.";
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
