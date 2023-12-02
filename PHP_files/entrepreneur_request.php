<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include necessary libraries
include 'db_connection.php';

// Constants for allowed file extensions and max file size
const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'png', 'jpeg'];
const MAX_FILE_SIZE = 5242880; // 5MB

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Extract data from POST request
    $file = $_FILES['file'];
    $productDescription = $_POST['productDescription'];
    $user_id = $_POST['user_id']; // Retrieve user_id from the form data

    // Validate data
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

    // Validate product description
    if (empty($productDescription)) {
        $errors[] = "Product description cannot be empty.";
    }

    // Check for errors
    if (!empty($errors)) {
        // Send error response
        header('Content-Type: application/json');
        echo json_encode(['errors' => $errors]);
        exit;
    }

    // Store the uploaded file
    $fileName = generateUniqueFileName($extension);
    $filePath = 'uploads/' . $fileName;

    move_uploaded_file($file['tmp_name'], $filePath);

    // Save request information to the database
    $status = 'pending';
    insertRequestToDatabase($user_id, $filePath, $productDescription, $status);

    // Send success response
    header('Content-Type: application/json');
    echo json_encode(['success' => 'Request submitted successfully.']);
    exit;
} else {
    // Handle other request methods
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid request method.']);
    exit;
}

function generateUniqueFileName($extension)
{
    return uniqid('', true) . '.' . $extension;
}

function insertRequestToDatabase($userId, $filePath, $productDescription, $status)
{
    global $conn; // Assuming $conn is your database connection

    $sql = "INSERT INTO entrepreneur_requests (user_id, image, product_description, status) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Check if the statement was prepared successfully
    if (!$stmt) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Database error.']);
        exit;
    }

    $stmt->bind_param('isss', $userId, $filePath, $productDescription, $status);
    $stmt->execute();

    // Check if the execution was successful
    if ($stmt->affected_rows <= 0) {
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Error inserting data into the database.']);
        exit;
    }

    $stmt->close();
}
?>
