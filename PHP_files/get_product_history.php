<?php

include 'db_connection.php';

// Get merchant ID from the request parameters
$merchantId = $_GET['merchantId'];

// Your SQL query to fetch product history with product details
$sql = "SELECT op.*, p.product_name, p.product_image
        FROM order_products_history op
        JOIN products p ON op.product_id = p.product_id
        WHERE op.removed_by_merchant_id = '$merchantId'";

$result = $conn->query($sql);

if ($result === FALSE) {
    echo json_encode(["success" => false, "message" => "Error fetching product history: " . $conn->error]);
} else {
    $productHistory = [];

    while ($row = $result->fetch_assoc()) {
        // Assuming your order_products_history table has columns like 'order_id', 'product_id', 'quantity', etc.
        // and the products table has columns 'product_id', 'product_name', 'product_image', etc.
        $productHistory[] = [
            "order_id" => $row['order_id'],
            "product_id" => $row['product_id'],
            "quantity" => $row['quantity'],
            "status" => $row['status'],
            "removal_date" => $row['removal_date'],
            "product_name" => $row['product_name'],
            "product_image" => $row['product_image'],
            // Add other columns as needed
        ];
    }

    echo json_encode(["success" => true, "productHistory" => $productHistory]);
}

$conn->close();
