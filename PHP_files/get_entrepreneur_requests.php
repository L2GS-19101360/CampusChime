<?php
include 'db_connection.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Fetch the latest entrepreneur requests for each user from the database
// Add a condition to filter by status (pending, accepted, or declined)
$statusFilter = isset($_GET['status']) ? $_GET['status'] : 'all';

$sql = "SELECT er.request_id, er.user_id, er.image, er.product_description, er.status, er.request_date, er.decision_date,
               u.firstname, u.lastname, u.email
        FROM entrepreneur_requests er
        INNER JOIN users u ON er.user_id = u.user_id
        WHERE er.request_date = (
            SELECT MAX(request_date)
            FROM entrepreneur_requests
            WHERE user_id = er.user_id
        )";

if ($statusFilter !== 'all') {
    $sql .= " AND er.status = '$statusFilter'";
}

$sql .= " ORDER BY er.request_date ASC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }

    // Return JSON response
    header('Content-Type: application/json');
    echo json_encode(['requests' => $requests]);
} else {
    // Return empty array if no requests found
    header('Content-Type: application/json');
    echo json_encode(['requests' => []]);
}

$conn->close();
