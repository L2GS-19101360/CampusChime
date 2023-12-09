<?php

include("db_connection.php");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$status = 200;
$data = array();
$count = 0;

$stmt = $conn->prepare('SELECT products.product_image, products.product_name, cart.quantity FROM cart JOIN products ON cart.product_id = products.product_id');
$stmt->execute();
$result = $stmt->get_result();

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

$stmt->close();

$myObj = array(
    'status' => $status,
    'data' => $data,
    'count' => $count
);

$myJSON = json_encode($myObj);
echo $myJSON;

?>