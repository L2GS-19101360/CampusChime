<?php

include 'db_connection.php';

// Get order data from the request body
$data = json_decode(file_get_contents("php://input"));

// Log received data
error_log(print_r($data, true));

if (
    isset($data->orderId) &&
    isset($data->productId) &&
    isset($data->quantity) &&
    isset($data->status) &&
    isset($data->removalDate) &&
    isset($data->removedByMerchantId)
) {
    $order_id = intval($data->orderId);
    $product_id = intval($data->productId); // Assuming productId is an integer, adjust if needed
    $quantity = intval($data->quantity);
    $status = $data->status;
    $removal_date = $data->removalDate;
    $removed_by_merchant_id = intval($data->removedByMerchantId);

    // Your SQL query to remove the product from the order_products table
    $deleteSql = "DELETE FROM order_products WHERE order_id = '$order_id' AND product_id = '$product_id'";

    if ($conn->query($deleteSql) === TRUE) {
        // Your SQL query to insert the order data into the order_products_history table
        $insertSql = "INSERT INTO order_products_history (order_id, product_id, quantity, status, removal_date, removed_by_merchant_id)
                      VALUES ('$order_id', '$product_id', '$quantity', '$status', '$removal_date', '$removed_by_merchant_id')";

        if ($conn->query($insertSql) === TRUE) {
            echo json_encode(["success" => true, "message" => "Product marked as moved to history successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error moving product to history: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error removing product from order: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}

$conn->close();
