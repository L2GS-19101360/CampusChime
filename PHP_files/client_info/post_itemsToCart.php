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

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Fetch cart data for the specified user_id.
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;

        if (!$user_id) {
            http_response_code(400);
            echo json_encode(["error" => "user_id parameter is missing"]);
            exit();
        }

        // Sanitize and use prepared statement.
        $stmt = $conn->prepare("SELECT c.*, p.product_name, p.product_image 
                                FROM `cart` c
                                INNER JOIN `products` p ON c.product_id = p.product_id
                                WHERE `user_id` = :user_id");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = [
            'data' => $data,
        ];

        echo json_encode($response);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Add item to the cart.
        $postdata = file_get_contents("php://input");

        if (!$postdata) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid request data"]);
            exit();
        }

        $request = json_decode($postdata);

        if (!isset($request->user_id) || !isset($request->product_id) || !isset($request->quantity)
            || empty(trim($request->user_id)) || (int)$request->product_id < 1 || (int)$request->quantity < 1) {
            http_response_code(400);
            echo json_encode(["error" => "Invalid request parameters"]);
            exit();
        }

        // Sanitize and use prepared statements.
        $user_id = trim($request->user_id);
        $product_id = (int)$request->product_id;
        $quantity = (int)$request->quantity;

        $stmt = $conn->prepare("INSERT INTO `cart` (`user_id`, `product_id`, `quantity`) VALUES (:user_id, :product_id, :quantity)");
        $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $stmt->bindParam(':quantity', $quantity, PDO::PARAM_INT);

        if ($stmt->execute()) {
            http_response_code(201);

            $userDetails = getUserDetails($conn, $user_id);
            $productDetails = getProductDetails($conn, $product_id);

            $response = [
                'user_details' => $userDetails,
                'product_details' => $productDetails,
                'quantity' => $quantity,
                'id' => $conn->lastInsertId()
            ];

            echo json_encode($response);
        } else {
            http_response_code(422);
            echo json_encode(["error" => "Failed to add item to cart"]);
        }
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

function getUserDetails($conn, $user_id)
{
    $stmt = $conn->prepare("SELECT * FROM `users` WHERE `user_id` = :user_id");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function getProductDetails($conn, $product_id)
{
    $stmt = $conn->prepare("SELECT c.*, p.product_name, p.product_image, p.sale_price
    FROM `cart` c
    INNER JOIN `products` p ON c.product_id = p.product_id
    WHERE c.product_id = :product_id");

    $stmt->bindParam(':product_id', $product_id, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

?>
