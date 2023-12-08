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
$filters = $_GET['filters'];

$query = "SELECT * FROM products WHERE product_name LIKE ?";

if ($filters['category']) {
    $query .= " AND product_category = " . $filters['category'];
}
// Add more filters as needed

$stmt = $conn->prepare($query);
$searchTerm = "%$searchTerm%";
$stmt->bind_param("s", $searchTerm);

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