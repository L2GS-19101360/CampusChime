<?php
include 'db_connection.php';

$user_id = $_GET['user_id']; // Replace this with the actual user_id

$query = "SELECT COUNT(*) as count FROM cart WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);

$stmt->execute();

$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode($row['count']);

$stmt->close();
$conn->close();
?>