<?php
include 'db_connection.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

try {
    // Fetch product information from the database
    $statusFilter = isset($_GET['status']) ? $_GET['status'] : 'all';
    $merchantIdFilter = isset($_GET['merchantId']) ? $_GET['merchantId'] : '';
    $productIdFilter = isset($_GET['product_id']) ? $_GET['product_id'] : null;

    $sql = "SELECT p.product_id, p.product_name, p.product_description, p.product_category,
               p.product_color, p.product_size, p.date_added, p.is_deleted, p.is_sale,
               p.is_displayed, p.product_qty, p.original_price, p.sale_price, p.ratings,
               p.number_of_add_to_carts, p.merchant_id, p.product_image,
               u.firstname AS merchant_firstname, u.lastname AS merchant_lastname, 
               u.email AS merchant_email, u.contactnumber AS merchant_contactnumber, u.user_image AS merchant_user_image
        FROM products p
        LEFT JOIN users u ON p.merchant_id = u.user_id";

    // Apply filters
    if ($statusFilter === 'visible') {
        $sql .= " WHERE p.is_displayed = 1";
    } elseif ($statusFilter === 'not visible') {
        $sql .= " WHERE p.is_displayed = 0";
    } else {
        // Default to only fetching visible products
        $sql .= " WHERE p.is_displayed = 1";
    }

    // Apply merchant ID filter if provided
    if (!empty($merchantIdFilter)) {
        $sql .= (strpos($sql, 'WHERE') !== false) ? " AND p.merchant_id = ?" : " WHERE p.merchant_id = ?";
    }

    // Apply product ID filter if provided
    if (!is_null($productIdFilter)) {
        $sql .= (strpos($sql, 'WHERE') !== false) ? " AND p.product_id = ?" : " WHERE p.product_id = ?";
    }

    $sql .= " ORDER BY p.date_added ASC";

    // Use prepared statement
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Error in preparing SQL statement: " . $conn->error);
    }

    // Bind parameters
    if (!empty($merchantIdFilter)) {
        $stmt->bind_param("s", $merchantIdFilter);
    }

    if (!is_null($productIdFilter)) {
        $stmt->bind_param("s", $productIdFilter);
    }

    // Execute statement
    $stmt->execute();

    // Get result set
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch results into an associative array
        $products = $result->fetch_all(MYSQLI_ASSOC);

        header('Content-Type: application/json');
        echo json_encode(['products' => $products]);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['products' => []]);
    }

    // Close statement
    $stmt->close();
} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
