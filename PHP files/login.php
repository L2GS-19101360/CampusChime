<?php
include 'db_connection.php';


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_REQUEST['loginEmail'];
    $password = $_REQUEST['loginPassword'];

    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        http_response_code(200);
        echo json_encode(['message' => 'Login successful']);
    } else {
        http_response_code(401);
        echo json_encode(['message' => 'Login failed']);
    }

    
    $conn->close();
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
  }

?>