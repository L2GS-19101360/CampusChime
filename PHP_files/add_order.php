<?php

include 'db_connection.php';

// Assuming you have received data through POST request
$userId = $_POST['user_id'];
$totalAmount = $_POST['total_amount'];
$orderDate = $_POST['order_date'];

// Create order
$insertOrderSql = "INSERT INTO orders (user_id, total_amount, order_date) VALUES (?, ?, ?)";
$stmtOrder = $conn->prepare($insertOrderSql);
$stmtOrder->bind_param("iss", $userId, $totalAmount, $orderDate);

if ($stmtOrder->execute()) {
    $orderId = $stmtOrder->insert_id;

    // Assuming you have received data for order products as an array
    $orderProducts = $_POST['order_products'];

    // Insert into order_products table
    $insertOrderProductSql = "INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)";

    foreach ($orderProducts as $product) {
        $productId = $product['product_id'];
        $quantity = $product['quantity'];

        // Move this line inside the loop
        $stmtOrderProduct = $conn->prepare($insertOrderProductSql);

        $stmtOrderProduct->bind_param("iii", $orderId, $productId, $quantity);
        $stmtOrderProduct->execute();

        $stmtOrderProduct->close(); // Close the statement inside the loop
    }

    echo json_encode(['success' => true, 'message' => 'Order and order products added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error adding order']);
}

$stmtOrder->close();
$conn->close();
