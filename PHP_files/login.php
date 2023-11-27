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

        $stmt = $conn->prepare("SELECT * FROM customer WHERE email=?");
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
                $id = $row['customer_id'];
                // $password = $row['password'];

                // Set session variables
                $_SESSION['firstName'] = $firstName;
                $_SESSION['lastName'] = $lastName;
                $_SESSION['email'] = $email;
                $_SESSION['contactNumber'] = $contactNumber;
                $_SESSION['email'] = $email;
                $_SESSION['customer_id'] = $id;
                // $_SESSION['password'] = $password;

                echo json_encode([
                    "success" => true,
                    "message" => "Login successful",
                    "firstName" => $firstName,
                    "lastName" => $lastName,
                    "contactNumber" => $contactNumber,
                    "email" => $email,
                    "customerId" => $id,
                    // "password" => $password,
                ]);
            } else {
                echo json_encode(["success" => false, "message" => "Invalid email or password"]);
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
