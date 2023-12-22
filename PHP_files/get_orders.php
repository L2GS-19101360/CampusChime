<?php

include 'db_connection.php';

// Get merchantId from the URL parameters
$merchantId = isset($_GET['merchantId']) ? intval($_GET['merchantId']) : 0;

// Validate or sanitize $merchantId as needed

// Your modified SQL query with $merchantId
$sql = "SELECT
            o.order_id,
            o.order_date,
            p.product_id,
            p.product_name,
            p.product_description,
            p.product_image,
            p.is_sale,
            p.original_price,
            p.sale_price,
            u.user_id AS buyer_id,
            u.firstname AS buyer_firstname,
            u.lastname AS buyer_lastname,
            u.email AS buyer_email,
            u.contactnumber AS buyer_contactnumber,
            u.user_image AS buyer_image,
            p.merchant_id AS merchant_id,
            m.firstname AS merchant_firstname,
            m.lastname AS merchant_lastname,
            m.email AS merchant_email,
            m.contactnumber AS merchant_contactnumber,
            m.user_image AS merchant_image,
            op.quantity,
            op.status AS order_product_status,
            op.date_sent  -- Include the date_sent column
        FROM
            orders o
            JOIN order_products op ON o.order_id = op.order_id
            JOIN products p ON op.product_id = p.product_id
            JOIN users u ON o.user_id = u.user_id
            JOIN users m ON p.merchant_id = m.user_id
        WHERE
            p.merchant_id = $merchantId";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch data and convert it to JSON format
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data);
} else {
    echo json_encode([]); // Return an empty array if no data is found
}

$conn->close();
?>
