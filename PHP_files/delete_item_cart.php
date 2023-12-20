<?php

include("db_connection.php");
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle database connection error
    echo 'Connection failed: ' . $e->getMessage();
    exit();
}
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decode the JSON payload sent from the client
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if required data is present
    if (isset($data['cart_id'])) {
        $cart_id = $data['cart_id'];

        try {
            // Adjust the SQL query based on your actual table names and structure
            $sql = "DELETE FROM cart WHERE cart_id = :cart_id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':cart_id', $cart_id, PDO::PARAM_INT);
            $stmt->execute();

            // Send a success response to the client
            echo json_encode(['success' => true]);
            exit();
        } catch (PDOException $e) {
            // Handle database error
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            exit();
        }
    }
}

// Send an error response if required data is not present
echo json_encode(['success' => false, 'message' => 'Invalid request']);
exit();
