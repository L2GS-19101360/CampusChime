<?php
// Include your database connection file here
include 'db_connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
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
        global $conn;
        $merchant_id = $_POST['merchant_id'];
        $sql = "SELECT * FROM products WHERE merchant_id = $merchant_id AND is_deleted = 0";
        $result = mysqli_query($conn, $sql);
        $products = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($products);
    }

    // Function to edit product
  
    function editProduct() {
        global $conn;
        $product = json_decode($_POST['product'], true);

        $originalPrice = floatval($product['originalPrice']);
        $salePrice = floatval($product['salePrice']);
        $prodQty = intval($product['productQty']);
        
        // Input validation
        if (!is_numeric($originalPrice) || $originalPrice < 0 || !is_numeric($salePrice) || $salePrice < 0 || !is_numeric($prodQty) || $prodQty < 0) {
            echo json_encode(array("statusCode"=> 400, "error"=> "Invalid input"));
            return;
        } else {
            $saleStatus = ($originalPrice - $salePrice <= 0) ? 1 : 0;
            
            $sql = "UPDATE products SET product_name = '{$product['productName']}', product_description = '{$product['productDescription']}', product_size = '{$product['productSize']}', product_qty = '{$product['productQty']}', original_price = '{$product['originalPrice']}', sale_price = '{$product['salePrice']}', is_sale = '{$saleStatus}' WHERE product_id = {$product['productId']}";
            if (mysqli_query($conn, $sql)) {
                echo json_encode(array("statusCode"=> 200));
            } else {
                echo json_encode(array("statusCode"=> 201, "error"=> mysqli_error($conn)));
            }
        }
    }

    // Function to delete product
    function deleteProduct() {
        global $conn;
        $product_id = $_POST['product_id'];
        $sql = "UPDATE products SET is_deleted = 1, is_displayed = 0 WHERE product_id = $product_id";
        if (mysqli_query($conn, $sql)) {
          echo json_encode(array("statusCode"=> 200));
      } else {
          echo json_encode(array("statusCode"=> 201, "error"=> mysqli_error($conn)));
    }
    }

?>
