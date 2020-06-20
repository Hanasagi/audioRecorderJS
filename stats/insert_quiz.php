<?php

require_once('config.php') ;

$data = json_decode(file_get_contents('php://input'), true) ;
print_r($data) ;

try {
  $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password) ;
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ;

  $sql = $db->prepare("INSERT INTO quiz(id_quiz, question) VALUES (:id, :question)") ;
  $sql->execute(array(
    ":id" => $data['id'],
    ":question" => $data['question']
  )) ;

} catch(PDOException $e) {
  echo $e->getMessage() ;
}
?>
