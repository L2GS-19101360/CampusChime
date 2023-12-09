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

            // Validate.
            if(trim($request->user_id) === '' || (int)$request->product_id < 1 || (int)$request->quantity < 1 ) {
                return http_response_code(400);
            }

            // Sanitize.
            $user_id = $conn->quote(trim($request->user_id));
            $product_id = $conn->quote((int)$request->product_id);
            $quantity = $conn->quote((int)$request->quantity);

            // Store.
            $sql = "INSERT INTO `cart`(`user_id`,`product_id`,`quantity`) VALUES ('{$user_id}','{$product_id}','{$quantity}')";

            if($conn->query($sql)) {
                http_response_code(201);
                $product = [
                    'user_id' => $user_id,
                    'product_id' => $product_id,
                    'quantity' => $quantity,
                    'id'    => $conn->lastInsertId()
                ];
                echo json_encode($product);
            } else {
                http_response_code(422);
            }
        }
    } catch(PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
?>