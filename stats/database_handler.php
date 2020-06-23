<?php

require_once('config.php') ;

$data = json_decode(file_get_contents('php://input'), true) ;

try {
  $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password) ;
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  switch($data['action']) {
    case 'init':
    $sql = "CREATE TABLE IF NOT EXISTS answers (
      id_quiz INT ,
      answer_text VARCHAR(50) ,
      count INT DEFAULT 0,
      UNIQUE(id_quiz, answer_text)
    )" ;

    $sql2 = "CREATE TABLE IF NOT EXISTS quiz (
      id_quiz INT PRIMARY KEY,
      question VARCHAR(100),
      alreadyVoted int default 0
    )" ;

    $db->exec($sql) ;
    $db->exec($sql2) ;
    break ;

    case 'reload':
    $sql = $db->prepare("UPDATE answers SET COUNT = 0 WHERE id_quiz = :id") ;
    $sql->bindParam(":id", $data['id']) ;
    $sql->execute() ;

    $sql2 = $db->prepare("UPDATE quiz SET alreadyVoted = ((SELECT alreadyVoted FROM quiz WHERE id_quiz = :id) + 1) WHERE id_quiz = :id") ;
    $sql2->bindParam(":id", $data['id']) ;
    $sql2->execute() ;
    break;
  }
} catch(PDOException $e) {
  echo $e->getMessage() ;
}

?>
