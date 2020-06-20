<?php

require_once('config.php') ;

$data = json_decode(file_get_contents('php://input'), true) ;
print_r($data) ;

try {
  $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password) ;
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ;

  $sql = $db->prepare("INSERT INTO answers(id_quiz, answer_text) VALUES (:id, :text)") ;
  $sql->execute(array(
    ":id" => $data['id'],
    ":text" => $data['answer']
  )) ;

} catch(PDOException $e) {
  echo $e->getMessage() ;
}
?>
