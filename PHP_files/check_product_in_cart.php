<?php

// Include your database connection file
include("db_connection.php");

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Initialize variables
$status = null;
$data = array();
$productId = $_GET['product_id'];
$userId = $_GET['user_id'];

// Check if the request is a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if the product is in the user's cart
    $stmt = $conn->prepare('SELECT cart_id, quantity FROM cart WHERE user_id = ? AND product_id = ?');
    $stmt->bind_param('ii', $userId, $productId);

    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Check if the product is in the cart
    if ($result->num_rows > 0) {
        // Product is in the cart, fetch cart details
        $row = $result->fetch_assoc();
        $data['isInCart'] = true;
        $data['quantity'] = $row['quantity'];
        $data['cart_id'] = $row['cart_id'];
    } else {
        // Product is not in the cart
        $data['isInCart'] = false;
    }

    // Close the statement
    $stmt->close();
}

// Prepare the response
$response = array(
    'status' => $status,
    'data' => $data
);

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
