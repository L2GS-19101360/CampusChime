<?php
header("Access-Control-Allow-Origin: *");
session_start();

$host = "localhost";
$username = "root";
$password = "";
$dbname = "campuschime";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (!$conn){
    die("Connection failed: " . mysqli_connect_error());
}
// echo "Yes";

?>