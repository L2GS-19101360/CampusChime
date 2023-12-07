<?php

include 'db_connection.php';

// Constants for allowed file extensions and max file size
const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'png', 'jpeg'];
const MAX_FILE_SIZE = 5242880; // 5MB
const UPLOADS_DIRECTORY = 'files/'; // Directory to store uploaded files

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Extract data from POST request
    $productData = [
        'productName' => $_POST['productName'],
        'productDescription' => $_POST['productDescription'],
        'productCategory' => $_POST['productCategory'],
        'productColor' => $_POST['productColor'],
        'productSize' => $_POST['productSize'],
        'productQuantity' => $_POST['productQuantity'],
        'productPrice' => $_POST['productPrice'],
    ];
    $user_id = $_POST['user_id'];

    $file = $_FILES['productFile'];

    // Validate data
    $errors = validateProductData($productData);
    $errors = array_merge($errors, validateFile($file));

    // Check for errors
    if (!empty($errors)) {
        // Send error response
        header('Content-Type: application/json');
        echo json_encode(['errors' => $errors]);
        exit;
    }

    // Get the merchant ID from the session user_id
    $merchantId =  $user_id;

    // Store the uploaded file in the "files" directory
    $fileName = generateUniqueFileName(pathinfo($file['name'], PATHINFO_EXTENSION));
    $filePath = UPLOADS_DIRECTORY . $fileName;

    move_uploaded_file($file['tmp_name'], $filePath);

    // Save product information to the database
    $productData['productFile'] = $filePath;
    saveProductToDatabase($productData, $merchantId);

    // Send success response
    header('Content-Type: application/json');
    echo json_encode(['success' => 'Product added successfully.']);
    exit;
} else {
    // Handle other request methods
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid request method.']);
    exit;
}
function generateUniqueFileName($extension) {
   return time() . rand(1000, 9999) . '.' . $extension;
}
function validateProductData($data)
{
    $errors = [];

    // Validate product name
    if (empty($data['productName'])) {
        $errors[] = "Product name cannot be empty.";
    }

    // Validate product description
    if (empty($data['productDescription'])) {
        $errors[] = "Product description cannot be empty.";
    }

    // Add more validation logic for other fields if needed

    return $errors;
}

function validateFile($file)
{
    $errors = [];

    // Validate uploaded file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errors[] = "Error uploading file. Please try again.";
    } else {
        // Check file size
        if ($file['size'] > MAX_FILE_SIZE) {
            $errors[] = "File size exceeded. Maximum allowed file size is 5MB.";
        } else {
            // Check file extension
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            if (!in_array($extension, ALLOWED_EXTENSIONS)) {
                $errors[] = "Invalid file type. Only PDF, JPG, PNG, and JPEG files are allowed.";
            }
        }
    }

    return $errors;
}

function saveProductToDatabase($productData, $merchantId)
{
    global $conn; // Assuming $conn is your database connection

    $sql = "INSERT INTO products (product_name, product_description, product_category, product_color, product_size, product_qty, original_price, product_image, merchant_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Check if the statement was prepared successfully
    if (!$stmt) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Database error.']);
        exit;
    }

    $stmt->bind_param('ssssiiisi', $productData['productName'], $productData['productDescription'], $productData['productCategory'], $productData['productColor'], $productData['productSize'], $productData['productQuantity'], $productData['productPrice'], $productData['productFile'], $merchantId);
    $stmt->execute();

    // Check if the execution was successful
    if ($stmt->affected_rows <= 0) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error inserting data into the database.']);
        exit;
    }

    $stmt->close();
}
