<?php
// Include your database connection code here
include 'db_connection.php';

// Get the current month
$currentMonth = date('m');

// Query to fetch the top 10 users registered in the current month with additional information
$userSql = "SELECT user_id, firstname, lastname, email, user_image, role FROM users WHERE MONTH(registered) = $currentMonth ";
$userResult = $conn->query($userSql);

// Query to fetch the top 10 products registered in the current month with additional information
$productSql = "SELECT product_id, product_name, product_image, product_category FROM products WHERE MONTH(date_added) = $currentMonth ";
$productResult = $conn->query($productSql);

if ($userResult->num_rows > 0 || $productResult->num_rows > 0) {
    // Fetch user data and encode it as JSON
    $users = array();
    while ($row = $userResult->fetch_assoc()) {
        $users[] = $row;
    }

    // Fetch product data and encode it as JSON
    $products = array();
    while ($row = $productResult->fetch_assoc()) {
        $products[] = $row;
    }

    // Query to fetch the total number of users
    $totalUsersQuery = "SELECT COUNT(user_id) as totalUsers FROM users";
    $totalUsersResult = $conn->query($totalUsersQuery);

    // Query to fetch the total number of products
    $totalProductsQuery = "SELECT COUNT(product_id) as totalProducts FROM products";
    $totalProductsResult = $conn->query($totalProductsQuery);

    // Query to fetch the count of customers
    $totalCustomersQuery = "SELECT COUNT(user_id) as totalCustomers FROM users WHERE role = 'customer'";
    $totalCustomersResult = $conn->query($totalCustomersQuery);

    // Query to fetch the count of entrepreneurs
    $totalEntrepreneursQuery = "SELECT COUNT(user_id) as totalEntrepreneurs FROM users WHERE role = 'entrepreneur'";
    $totalEntrepreneursResult = $conn->query($totalEntrepreneursQuery);

    if (
        $totalUsersResult->num_rows > 0 &&
        $totalProductsResult->num_rows > 0 &&
        $totalCustomersResult->num_rows > 0 &&
        $totalEntrepreneursResult->num_rows > 0
    ) {
        $totalUsersData = $totalUsersResult->fetch_assoc();
        $totalUsers = $totalUsersData['totalUsers'];

        $totalProductsData = $totalProductsResult->fetch_assoc();
        $totalProducts = $totalProductsData['totalProducts'];

        $totalCustomersData = $totalCustomersResult->fetch_assoc();
        $totalCustomers = $totalCustomersData['totalCustomers'];

        $totalEntrepreneursData = $totalEntrepreneursResult->fetch_assoc();
        $totalEntrepreneurs = $totalEntrepreneursData['totalEntrepreneurs'];

        // Add total users, products, customers, and entrepreneurs to the response
        $response = array(
            'totalUsers' => $totalUsers,
            'usersMonthly' => $users,
            'totalProducts' => $totalProducts,
            'totalCustomers' => $totalCustomers,
            'totalEntrepreneurs' => $totalEntrepreneurs,
            'productsMonthly' => $products
        );

        echo json_encode($response);
    } else {
        echo json_encode(array(
            'totalUsers' => 0,
            'usersMonthly' => $users,
            'totalProducts' => 0,
            'totalCustomers' => 0,
            'totalEntrepreneurs' => 0,
            'productsMonthly' => $products
        ));
    }
} else {
    echo json_encode(array(
        'totalUsers' => 0,
        'usersMonthly' => array(),
        'totalProducts' => 0,
        'totalCustomers' => 0,
        'totalEntrepreneurs' => 0,
        'productsMonthly' => array()
    ));
}

$conn->close();
