<?php

session_start() ;
require_once('config.php') ;

$data = json_decode(file_get_contents('php://input'), true) ;

try {
  $db = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password) ;
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ;

  $alreadyVoted = $db->prepare('SELECT alreadyVoted FROM quiz WHERE id_quiz = :id') ;
  $alreadyVoted->execute(['id' => $data['id']]) ;
  $currentAlreadyVotedIndex = $alreadyVoted->fetch()[0] ;

  if(!isset($_SESSION['alreadyVoted'.$data['id']]))  {
    $_SESSION['alreadyVoted'.$data['id']] = $currentAlreadyVotedIndex ;
  }
  $oldAlreadyVotedIndex = $_SESSION['alreadyVoted'.$data['id']] ;

  if($oldAlreadyVotedIndex !== $currentAlreadyVotedIndex) {
    unset($_SESSION['quiz'.$data['id']]) ;
    $_SESSION['alreadyVoted'.$data['id']] = $currentAlreadyVotedIndex ;
  }

  if(!isset($_SESSION['quiz'.$data['id']])) {

    for($i = 0; $i < count($data['selected']); $i++) {
      $sql = $db->prepare("UPDATE answers SET count = ((SELECT count FROM answers WHERE id_quiz = :id AND answer_text = :text) + 1) WHERE id_quiz = :id AND answer_text = :text") ;
      $sql->bindParam(':id', $data['id'], PDO::PARAM_INT) ;
      $sql->bindParam(':text', $data['selected'][$i], PDO::PARAM_STR) ;
      $sql->execute() ;
    }

    $_SESSION['quiz'.$data['id']] = $data['selected'] ;

  } else {

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
