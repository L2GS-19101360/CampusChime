<?php

include("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// Initialize variables
$status = null;
$data = array();
$count = 0;
$totalAmount = 0; // Initialize total amount

// Check if the request is a GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the user ID from the query parameters
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

    if (!$user_id) {
        // Handle the case when the user ID is not provided
        $status = 'error';
    } else {
        // Handle displaying data for the specific user

        // Use a prepared statement to prevent SQL injection
        $stmt = $conn->prepare('SELECT cart.cart_id, cart.product_id, products.product_image, products.product_name, cart.quantity, products.original_price, products.sale_price, products.is_sale FROM cart JOIN products ON cart.product_id = products.product_id WHERE cart.user_id = ?');
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = mysqli_fetch_assoc($result)) {
            // Calculate total price based on is_sale
            $totalPrice = $row['is_sale'] == 1 ? $row['sale_price'] * $row['quantity'] : $row['original_price'] * $row['quantity'];

            // Accumulate total amount
            $totalAmount += floatval($totalPrice);

            $row['total_price'] = number_format($totalPrice, 2);

            $data[] = $row;
            $count++;
        }

        // Format the total amount with two decimal places
        $totalAmountFormatted = number_format($totalAmount, 2);

        $stmt->close();
        $status = 'success';
    }
}

$response = array(
    'status' => $status,
    'data' => $data,
    'count' => $count,
    'totalAmount' => number_format($totalAmount, 2), // Include total amount in the response
);

// Send the JSON response
header('Content-Type: application/json');
echo json_encode($response);
