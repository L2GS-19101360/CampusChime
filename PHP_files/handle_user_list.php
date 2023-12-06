<?php
include 'db_connection.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data['userId']) && isset($data['status'])) {
    $userId = filter_var($data['userId'], FILTER_VALIDATE_INT);
    $newStatus = filter_var($data['status'], FILTER_VALIDATE_INT);

    // Ensure values are not false or null
    if ($userId === false || $userId === null || $newStatus === false || $newStatus === null) {
        echo json_encode(['success' => false, 'error' => 'Invalid input']);
        return;
    }

    // Validate status values against allowed enum values
    $allowedStatusValues = [0, 1];
    if (!in_array($newStatus, $allowedStatusValues, true)) {
        echo json_encode(['success' => false, 'error' => 'Invalid status value']);
        return;
    }


    // Update the user's active_status using prepared statements
    $query = "UPDATE users SET active_status = ? WHERE user_id = ?";
    $stmt = mysqli_prepare($conn, $query);

    mysqli_stmt_bind_param($stmt, "ii", $newStatus, $userId);

    $result = mysqli_stmt_execute($stmt);

    if (!$result) {
        // Log the error instead of exposing it to the user
        error_log("Database Error: " . mysqli_error($conn));
        echo json_encode(['success' => false, 'error' => 'An error occurred while processing the request.']);
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
        return;
    }

    echo json_encode(['success' => true]);

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method or missing userId/status']);
}
