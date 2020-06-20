<?php

require_once('config.php') ;

$data = json_decode(file_get_contents('php://input'), true) ;

try {
  $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password) ;
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ;

  $sql = $db->prepare("SELECT answer_text, count FROM answers WHERE id_quiz = :id ORDER BY answer_text") ;
  $sql->bindParam(':id', $data['id'], PDO::PARAM_INT) ;
  $sql->execute() ;

  $data = $sql->fetchAll() ;

  echo json_encode($data) ;

} catch(PDOException $e) {
  echo $e->getMessage() ;
}

?>
