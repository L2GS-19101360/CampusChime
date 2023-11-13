<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

session_start();

// Destroy the session or perform other logout actions
session_destroy();

// Send a JSON response indicating success
header('Content-Type: application/json');
echo json_encode(['success' => true]);
exit();
?>
    