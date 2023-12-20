<?php

include("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Initialize variables
$status = null;

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle adding to cart
    $data = json_decode(file_get_contents("php://input"));

    $user_id = $data->user_id;
    $product_id = $data->product_id;
    $quantity = $data->quantity;
    $total_price = $data->total_price;
    $date_added = $data->date_added;

    // Check if the product is already in the cart
    $stmt = $conn->prepare('SELECT * FROM cart WHERE user_id = ? AND product_id = ?');
    $stmt->bind_param('ii', $user_id, $product_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        // Product is already in the cart, update the quantity
        $stmt = $conn->prepare('UPDATE cart SET quantity = ?, total_price = ?, date_added = ? WHERE user_id = ? AND product_id = ?');
        $stmt->bind_param('idsii', $quantity, $total_price, $date_added, $user_id, $product_id);
        $stmt->execute();
        $stmt->close();
        $status = 200;
    } else {
        // Product is not in the cart, insert a new record
        $stmt = $conn->prepare('INSERT INTO cart (user_id, product_id, quantity, total_price, date_added) VALUES (?, ?, ?, ?, ?)');
        $stmt->bind_param('iidis', $user_id, $product_id, $quantity, $total_price, $date_added);
        $stmt->execute();
        $stmt->close();
        $status = 200;
    }
} else {
    $status = 400; // Bad Request
}

$response = array('status' => $status);

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
