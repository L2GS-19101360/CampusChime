<?php

include 'db_connection.php';

// Get data from the request
$data = json_decode(file_get_contents("php://input"));

// Check if the data is not null
if ($data) {
    $orderId = $data->orderId;
    $newStatus = $data->newStatus;
    $productId = $data->productId;

    // Validate or sanitize $orderId, $newStatus, and $productId as needed
    // Example: You might want to check if $orderId is an integer

    // Your SQL query to update the status in the order_products table for the specific product
    $updateOrderProductStatusSQL = "UPDATE order_products SET status = ? WHERE order_id = ? AND product_id = ?";

    // Prepare the query
    $stmtUpdateOrderProductStatus = $conn->prepare($updateOrderProductStatusSQL);

    // Check for errors in preparing the query
    if (!$stmtUpdateOrderProductStatus) {
        echo json_encode(['success' => false, 'error' => 'Failed to prepare query: ' . $conn->error]);
    } else {
        // Bind the parameters
        $stmtUpdateOrderProductStatus->bind_param('sii', $newStatus, $orderId, $productId);

        // Execute the query
        if ($stmtUpdateOrderProductStatus->execute()) {

            // Check if the new status is "completed"
            if ($newStatus == "completed") {
                // Retrieve the order quantity from the order_products table
                $getOrderQuantitySQL = "SELECT quantity FROM order_products WHERE order_id = ? AND product_id = ?";
                $stmtGetOrderQuantity = $conn->prepare($getOrderQuantitySQL);

                // Check for errors in preparing the query
                if (!$stmtGetOrderQuantity) {
                    echo json_encode(['success' => false, 'error' => 'Failed to prepare query (get order quantity): ' . $conn->error]);
                } else {
                    // Bind the parameters for the order quantity query
                    $stmtGetOrderQuantity->bind_param('ii', $orderId, $productId);

                    // Execute the query
                    if ($stmtGetOrderQuantity->execute()) {
                        // Bind the result variable
                        $stmtGetOrderQuantity->bind_result($orderQuantity);

                        // Fetch the result
                        $stmtGetOrderQuantity->fetch();

                        // Close the statement
                        $stmtGetOrderQuantity->close();

                        // Update the product table with the new quantity
                        $updateProductQuantitySQL = "UPDATE product SET product_qty = product_qty - ? WHERE product_id = ?";
                        $stmtUpdateProductQuantity = $conn->prepare($updateProductQuantitySQL);

                        // Check for errors in preparing the query
                        if (!$stmtUpdateProductQuantity) {
                            echo json_encode(['success' => false, 'error' => 'Failed to prepare query (update product quantity): ' . $conn->error]);
                        } else {
                            // Bind the parameters
                            $stmtUpdateProductQuantity->bind_param('ii', $orderQuantity, $productId);

                            // Execute the query
                            if ($stmtUpdateProductQuantity->execute()) {
                                echo json_encode(['success' => true]);
                            } else {
                                echo json_encode(['success' => false, 'error' => 'Failed to execute query (update product quantity): ' . $stmtUpdateProductQuantity->error]);
                            }

                            // Close the statement
                            $stmtUpdateProductQuantity->close();
                        }
                    } else {
                        echo json_encode(['success' => false, 'error' => 'Failed to execute query (get order quantity): ' . $stmtGetOrderQuantity->error]);
                    }
                }
            } else {
                // If the new status is not "completed", just return success
                echo json_encode(['success' => true]);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to execute query (update order product status): ' . $stmtUpdateOrderProductStatus->error]);
        }

        // Close the statement
        $stmtUpdateOrderProductStatus->close();
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid data']);
}

// Close the connection
$conn->close();
?>
