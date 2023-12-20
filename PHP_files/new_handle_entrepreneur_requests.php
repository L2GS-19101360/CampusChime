<?php
include 'db_connection.php';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get raw POST data
    $postdata = file_get_contents("php://input");

    // Check if the data is not empty and is valid JSON
    if (isset($postdata) && !empty($postdata) && json_decode($postdata) != null) {
        // Decode the JSON data
        $request = json_decode($postdata);

        // Validate the received data
        if (trim($request->user_id) === '' || (int)$request->product_id < 1 || (int)$request->quantity < 1) {
            return http_response_code(400);
        }

        $user_id = $conn->quote(trim($request->user_id));
        $product_id = $conn->quote((int)$request->product_id);
        $quantity = $conn->quote((int)$request->quantity);

        $sql = "INSERT INTO `cart`(`user_id`,`product_id`,`quantity`) VALUES ({$user_id},{$product_id},{$quantity})";

        if ($conn->query($sql)) {
            // Fetch the product details after insertion
            $fetchSql = "SELECT products.product_image, products.product_name, cart.quantity 
                         FROM cart 
                         JOIN products ON cart.product_id = products.product_id 
                         WHERE cart.user_id = {$user_id} AND cart.product_id = {$product_id}";

            $stmt = $conn->query($fetchSql);
            $product = $stmt->fetch(PDO::FETCH_ASSOC);

            http_response_code(201);
            echo json_encode(['status' => 'success', 'data' => $product]);
        } else {
            http_response_code(422);
        }
    } else {
        // Invalid JSON or empty data
        http_response_code(400);
        return;
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
