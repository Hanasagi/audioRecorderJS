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
      question VARCHAR(100)
    )" ;

    $db->exec($sql) ;
    $db->exec($sql2) ;
    break ;

    case 'delete':
    $sql = "DROP TABLE answers" ;
    $sql2 = "DROP TABLE quiz" ;

    $db->exec($sql) ;
    $db->exec($sql2) ;
    break;
  }
} catch(PDOException $e) {
  echo $e->getMessage() ;
}

?>
