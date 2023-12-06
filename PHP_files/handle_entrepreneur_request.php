    <?php
    include 'db_connection.php';

    // Read raw POST data
    $data = json_decode(file_get_contents("php://input"), true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data['action'])) {
        $action = $data['action'];

        switch ($action) {
            case 'update_request_status':
                updateRequestStatus($data);
                break;

            default:
                echo json_encode(['success' => false, 'error' => 'Invalid action']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid request method or missing action']);
    }

    function updateRequestStatus($data)
    {
        global $conn;

        $requestId = isset($data['requestId']) ? $data['requestId'] : null;
        $status = isset($data['status']) ? $data['status'] : null;

        // Validate input
        if ($requestId === null || $status === null) {
            echo json_encode(['success' => false, 'error' => 'Invalid input']);
            return;
        }

        // Update the request status using prepared statements
        $query = "UPDATE entrepreneur_requests SET status = ?, decision_date = CURRENT_TIMESTAMP WHERE request_id = ?";
        $stmt = mysqli_prepare($conn, $query);

        // Bind parameters
        mysqli_stmt_bind_param($stmt, "si", $status, $requestId);

        // Execute the statement
        $result = mysqli_stmt_execute($stmt);

        if (!$result) {
            echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
            return;
        }

        // Check if the request was accepted and update user role accordingly
        if ($status === 'accepted' && isset($data['userId'])) {
            $userId = $data['userId'];

            // Validate input
            if ($userId === null) {
                echo json_encode(['success' => false, 'error' => 'Invalid input']);
                mysqli_stmt_close($stmt);
                mysqli_close($conn);
                return;
            }

            // Define and set the role if needed
            $role = 'entrepreneur';

            // Update user role using prepared statements
            $query = "UPDATE users SET role = ? WHERE user_id = ?";
            $stmt = mysqli_prepare($conn, $query);

            // Bind parameters
            mysqli_stmt_bind_param($stmt, "si", $role, $userId);

            // Execute the statement
            $result = mysqli_stmt_execute($stmt);

            if (!$result) {
                echo json_encode(['success' => false, 'error' => mysqli_error($conn)]);
                mysqli_stmt_close($stmt);
                mysqli_close($conn);
                return;
            }
        }

        echo json_encode(['success' => true]);

        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }
