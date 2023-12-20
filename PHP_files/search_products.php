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

// Check if 'searchTerm' key is set in $_GET
$searchTerm = isset($_GET['searchTerm']) ? $_GET['searchTerm'] : '';
// Check if 'filters' key is set in $_GET and decode it
$filters = isset($_GET['filters']) ? json_decode($_GET['filters'], true) : array();

$query = "SELECT * FROM products WHERE product_name LIKE '%$searchTerm%'";
$params = array();

if (!empty($filters['category'])) {
    $query .= " AND product_category = ?";
    array_push($params, $filters['category']);
}

$stmt = $conn->prepare($query);

// Check if prepare was successful
if ($stmt === false) {
    echo json_encode(array("error" => "Prepare statement failed: " . $conn->error));
    exit();
}

// Check if bind_param is successful
if (!empty($params) && !$stmt->bind_param(str_repeat('s', count($params)), ...$params)) {
    echo json_encode(array("error" => "Bind_param failed: " . $stmt->error));
    exit();
}

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
