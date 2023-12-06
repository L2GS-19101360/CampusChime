<?php
include 'db_connection.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Fetch the latest users based on the role and status filters
$roleFilter = isset($_GET['role']) ? $_GET['role'] : 'all';
$statusFilter = isset($_GET['status']) ? $_GET['status'] : 'all';

$sql = "SELECT * FROM users WHERE 1=1";

if ($roleFilter !== 'all') {
    $sql .= " AND role = ?";
}

if ($statusFilter === 'active') {
    $sql .= " AND active_status = 1";
} elseif ($statusFilter === 'inactive') {
    $sql .= " AND active_status = 0";
}

$sql .= " ORDER BY registered DESC";

$stmt = $conn->prepare($sql);

if ($roleFilter !== 'all' && ($statusFilter === 'active' || $statusFilter === 'inactive')) {
    $stmt->bind_param("s", $roleFilter);
} elseif ($roleFilter !== 'all') {
    $stmt->bind_param("s", $roleFilter);
}

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode(['users' => $users]);
} else {
    // Return empty array if no users found
    header('Content-Type: application/json');
    echo json_encode(['users' => []]);
}

$stmt->close();
