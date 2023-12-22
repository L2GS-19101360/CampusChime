<?php

include 'db_connection.php';

// Get data from the request
$data = json_decode(file_get_contents("php://input"));

// Check if the data is not null
if ($data) {
    $orderId = $data->orderId;
    $newStatus = $data->newStatus;

    // Validate or sanitize $orderId and $newStatus as needed
    // Example: You might want to check if $orderId is an integer

    // Your SQL query to update the status in the order_product table
    $sql = "UPDATE order_products SET status = ? WHERE order_id = ?";

    // Prepare the query
    $stmt = $conn->prepare($sql);

    // Check for errors in preparing the query
    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => 'Failed to prepare query: ' . $conn->error]);
    } else {
        // Bind the parameters
        $stmt->bind_param('si', $newStatus, $orderId);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to execute query: ' . $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid data']);
}

// Close the connection
$conn->close();