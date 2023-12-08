<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'db_connection.php';

if ($conn->connect_error) {
    echo json_encode(
        array("message" => "Unable to connect to the database.")
    );
    exit();
}

$searchTerm = $_GET['searchTerm'];
$filters = json_decode($_GET['filters'], true);

$query = "SELECT * FROM products WHERE product_name LIKE ?";
$params = array("%$searchTerm%");
$types = "s";

if (!empty($filters['category'])) {
    $query .= " AND product_category = ?";
    array_push($params, $filters['category']);
    $types .= "s";
}

$stmt = $conn->prepare($query);
$stmt->bind_param($types, ...$params);

$stmt->execute();

$result = $stmt->get_result();

$products = array();

while ($row = $result->fetch_assoc()) {
    array_push($products, $row);
}

echo json_encode($products);

$stmt->close();
$conn->close();
?>