<?php
//sample not functional yet
//case 'GET':
   $sql = "SELECT * FROM sales_data";
   $stmt = $db->prepare($sql);
   $stmt->execute();
   $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);       
   echo json_encode($sales);
  

?>