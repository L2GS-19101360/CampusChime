<?php

    // Include your database connection file here
    include 'db_connect.php';

    // Check if request is made through POST method
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Get the action from the POST request
        $action = $_POST['action'];

        switch ($action) {
            case 'get_products':
                // Call the function to get products
                getProducts();
                break;
            case 'edit_product':
                // Call the function to edit product
                editProduct();
                break;
            case 'delete_product':
                // Call the function to delete product
                deleteProduct();
                break;
            default:
                // Invalid action
                echo json_encode(array("statusCode"=>201));
                break;
        }
    }

    // Function to get products
    function getProducts() {
        // Write your code here to fetch products
    }

    // Function to edit product
    function editProduct() {
        // Write your code here to edit product
    }

    // Function to delete product
    function deleteProduct() {
        // Write your code here to delete product
    }
?>
