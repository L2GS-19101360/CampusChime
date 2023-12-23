<?php
// Include your database connection file here
include 'db_connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$user_id = $_GET['merchant_id']; 

$query = "SELECT COUNT(*) as count FROM cart 
          JOIN products ON cart.product_id = products.product_id 
          WHERE products.merchant_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);

$stmt->execute();

$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode($row['count']);

$stmt->close();
$conn->close();
?>

