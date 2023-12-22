<?php

include("db_connection.php");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$retVal = "Request status update failed.";
$isValid = true;
$status = 400;
$data = -1;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $requestData = json_decode(file_get_contents("php://input"), true);

    if (isset($requestData["action"]) && $requestData["action"] === "update_request_status") {
        // Check if required parameters are present
        if (
            isset($requestData["requestId"]) &&
            isset($requestData["userId"]) &&
            isset($requestData["status"])
        ) {
            // Escape and sanitize data
            $requestId = mysqli_real_escape_string($conn, $requestData["requestId"]);
            $userId = mysqli_real_escape_string($conn, $requestData["userId"]);
            $status = mysqli_real_escape_string($conn, $requestData["status"]);

            // Update the decision_date with the current timestamp
            $currentTimestamp = date("Y-m-d H:i:s");
            $query = "UPDATE entrepreneur_requests SET status='$status', decision_date='$currentTimestamp' WHERE user_id='$userId' AND request_id='$requestId'";

            if (mysqli_query($conn, $query)) {
                $retVal = "Request status updated successfully.";
                $status = 200;
                $data = 1;
            } else {
                $retVal = "Error updating request status: " . mysqli_error($conn);
            }
        } else {
            $retVal = "Invalid request data.";
        }
    } else {
        $retVal = "Invalid action specified.";
    }
} else {
    $retVal = "Invalid request method.";
}

$myObj = array(
    'status' => $status,
    'data' => $data,
    'message' => $retVal  
);

$myJSON = json_encode($myObj, JSON_FORCE_OBJECT);
echo $myJSON;

?>
