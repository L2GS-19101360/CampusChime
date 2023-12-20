<?php

include 'db_connection.php';

// Assuming you have received data through POST request or as GET parameters
$user_id = isset($_POST['user_id']) ? $_POST['user_id'] : (isset($_GET['user_id']) ? $_GET['user_id'] : null);

// Check if user_id is set
if ($user_id === null) {
    echo json_encode(['success' => false, 'message' => 'User ID is not set']);
    exit;
}

// Delete cart for the given user_id
$deleteCartSql = "DELETE FROM cart WHERE user_id = ?";
$stmtDeleteCart = $conn->prepare($deleteCartSql);
$stmtDeleteCart->bind_param("i", $user_id);

if ($stmtDeleteCart->execute()) {
    echo json_encode(['success' => true, 'message' => 'Cart deleted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error deleting cart']);
}

$stmtDeleteCart->close();
$conn->close();
