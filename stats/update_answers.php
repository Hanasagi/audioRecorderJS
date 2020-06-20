<?php

session_start() ;
require_once('config.php') ;

$data = json_decode(file_get_contents('php://input'), true) ;

try {
  $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password) ;
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ;

  if(!isset($_SESSION['quiz'.$data['id']])) {

    for($i = 0; $i < count($data['selected']); $i++) {
      $sql = $db->prepare("UPDATE answers SET count = ((SELECT count FROM answers WHERE id_quiz = :id AND answer_text = :text) + 1) WHERE id_quiz = :id AND answer_text = :text") ;
      $sql->bindParam(':id', $data['id'], PDO::PARAM_INT) ;
      $sql->bindParam(':text', $data['selected'][$i], PDO::PARAM_STR) ;
      $sql->execute() ;
    }

    $_SESSION['quiz'.$data['id']] = $data['selected'] ;

  } else {

    echo "Session : " ;
    print_r($_SESSION['quiz'.$data['id']]) ;
    echo "Selected : " ;
    print_r($data['selected']) ;

    for($i = 0; $i < count($_SESSION['quiz'.$data['id']]); $i++) {
      $sql = $db->prepare("UPDATE answers SET count = ((SELECT count FROM answers WHERE id_quiz = :id AND answer_text = :text) - 1)  WHERE id_quiz = :id AND answer_text = :text") ;
      $sql->bindParam(':id', $data['id'], PDO::PARAM_INT) ;
      $sql->bindParam(':text', $_SESSION['quiz'.$data['id']][$i], PDO::PARAM_STR) ;
      $sql->execute() ;
    }

    for($i = 0; $i < count($data['selected']); $i++) {
      $sql = $db->prepare("UPDATE answers SET count = ((SELECT count FROM answers WHERE id_quiz = :id AND answer_text = :text) + 1) WHERE id_quiz = :id AND answer_text = :text") ;
      $sql->bindParam(':id', $data['id'], PDO::PARAM_INT) ;
      $sql->bindParam(':text', $data['selected'][$i], PDO::PARAM_STR) ;
      $sql->execute() ;
    }

    $_SESSION['quiz'.$data['id']] = $data['selected'] ;

  }
} catch(PDOException $e) {
  echo $e->getMessage() ;
}

?>
