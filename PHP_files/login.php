<?php
include 'db_connection.php';

// Check if a session is not already active
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    if (isset($request->email) && isset($request->password)) {
        $email = $conn->real_escape_string($request->email);
        // Server-side Email Validation
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(["success" => false, "message" => "Invalid email format"]);
            exit();
        }

        $stmt = $conn->prepare("SELECT * FROM users WHERE email=?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $hashedPasswordFromDatabase = $row['password'];

            if (password_verify($request->password, $hashedPasswordFromDatabase)) {
               
                $firstName = $row['firstname'];
                $lastName = $row['lastname'];
                $contactNumber = $row['contactnumber'];
                $email = $row['email'];
                $id = $row['user_id'];
                $role = $row['role'];
                $imageData = $row['user_image'];
                $activeStatus = $row['active_status'];
                // $password = $row['password'];

                // Set session variables
                $_SESSION['user_id'] = $id;
                $_SESSION['firstName'] = $firstName;
                $_SESSION['lastName'] = $lastName;
                $_SESSION['email'] = $email;
                $_SESSION['contactNumber'] = $contactNumber;
                $_SESSION['user_image'] = $imageData;
                $_SESSION['role'] = $role;
                $_SESSION['active_status'] = $activeStatus;
                // $_SESSION['password'] = $password;

                echo json_encode([
                    "success" => true,
                    "message" => "Login successful",
                    "firstName" => $firstName,
                    "lastName" => $lastName,
                    "contactNumber" => $contactNumber,
                    "email" => $email,
                    "userId" => $id,
                    "role" => $role,
                    "user_image" => $imageData,
                    "active_status" => $activeStatus
                    // "password" => $password,
                ]);
            } else {
                $attempts = $_SESSION['attempts'] ?? 0;
                $attempts++;
                $_SESSION['attempts'] = $attempts;

                if ($attempts > 3) {
                    echo json_encode(["success" => false, "message" => "Disabled input momentarily."]);
                    sleep($attempts * 2);
                   
                }

                echo json_encode(["success" => false, "message" => "Invalid email or password. Please try again."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Invalid email or password"]);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["success" => false, "message" => "Invalid data"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
