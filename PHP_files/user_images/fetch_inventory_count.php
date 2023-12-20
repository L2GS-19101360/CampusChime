<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Content-Type: application/json');

    $host = 'localhost'; // replace with your host name
    $dbname = 'campuschime'; // replace with your database name
    $username = 'root'; // replace with your username
    $password = ''; // replace with your password

    try {
        $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Get the posted data.
        $postdata = file_get_contents("php://input");

        if(isset($postdata) && !empty($postdata)) {
            // Extract the data.
            $request = json_decode($postdata);

            // Sanitize.
            $merchant_id = $conn->quote(trim($request->merchant_id));
            $status = 0;
            $sql = "SELECT SUM(product_qty) as total_qty FROM `products` WHERE merchant_id = {$merchant_id} AND is_deleted = {$status}";
            $stmt = $conn->prepare($sql);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($result);
        }

    } catch(PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
?>