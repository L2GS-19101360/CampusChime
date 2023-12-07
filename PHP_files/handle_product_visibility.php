<?php
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data['productId']) && isset($data['status'])) {
    $productId = filter_var($data['productId'], FILTER_VALIDATE_INT);
    $newStatus = filter_var($data['status'], FILTER_VALIDATE_INT);


    if ($productId === false || $productId === null || $newStatus === false || $newStatus === null) {
        echo json_encode(['success' => false, 'error' => 'Invalid input']);
        return;
    }


    $allowedStatusValues = [0, 1];
    if (!in_array($newStatus, $allowedStatusValues, true)) {
        echo json_encode(['success' => false, 'error' => 'Invalid status value']);
        return;
    }


    // Update the product's visibility using prepared statements
    $query = "UPDATE products SET is_displayed = ? WHERE product_id = ?";
    $stmt = mysqli_prepare($conn, $query);

    mysqli_stmt_bind_param($stmt, "ii", $newStatus, $productId);

    $result = mysqli_stmt_execute($stmt);

    if (!$result) {
        // Log the error instead of exposing it to the user
        error_log("Database Error: " . mysqli_error($conn));
        echo json_encode(['success' => false, 'error' => 'An error occurred while processing the request.']);
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
        return;
    }

    // After updating the product visibility in the database
    echo json_encode(['success' => true]);

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method or missing productId/status']);
}
