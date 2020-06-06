var allQuizz ;
var allAnswers = [] ;

$(document).ready(function() {
  console.log("Quizz.js a bien démarré") ;

  allQuizz = $('.quizz') ;

  for(var i = 0; i < allQuizz.length; i++) {
    // On ajoute l'attribut "data-quizz" à chaque section contenant la classe "quizz"
    var currentQuizz = allQuizz.eq(i) ;
    currentQuizz.attr('data-quizz', i) ;

    // On remplit le tableau des réponses en fonction du quizz courant
    allAnswers[i] = [] ;
    var answers = allQuizz[i].getElementsByClassName('answer') ;
    for(var j = 0; j < answers.length; j++) {
      // On parcourt l'ensemble des réponses du quizz courant pour l'ajouter au tableau allAnswers et on supprime la classe du HTML pour empecher aux utilisateurs de voir les réponses justes
      // Le tableau aura la forme :
      /* allAnswers {
      0:
      0: false ;
      1: false;
      2: true ;
    } */
    if(answers[j].className.includes('false')) {
      allAnswers[i][j] = false ;
      answers[j].classList.remove('false') ;
    }
    else {
      allAnswers[i][j] = true ;
      answers[j].classList.remove('true') ;
    }
  }
}

// Quand on clique sur une réponse ça la sélectionne et ça deselectionne l'ancienne réponse
$('.answer').on('click', function() {
  if(!$(this)[0].className.includes('selected')) {
    $(this).addClass('selected') ;
    if(!($(this).closest('section')[0].className.includes('qcm'))) $('.selected').not(this).removeClass('selected') ;
  }
  else $(this).removeClass('selected') ;
}) ;


// Lorsque l'on clique sur le bouton submit
$('.submit').on('click', function() {
  // Fonction servant à vérifier si le joueur à déjà répondu et supprimer le résultat de sa réponse
  checkIfAlreadyAnswered() ;

  // On récupère l'ID du quizz grâce à l'attribut "data-quizz"
  var quizzID = $(this).closest('section').attr('data-quizz') ;
  // Et on sélectionne le quizz correspondant
  var currentQuizz = allQuizz[quizzID] ;

  // Gestion des réponses différente s'il s'agit d'un QCM
  if(currentQuizz.className.includes('qcm')) {
    // On récupère ici un tableau de réponses sélectionnées
    var selectedAnswers = $('.selected') ;
    var positionOfSelectedAnswers = [] ;
    // Et on cherche la position de toutes les réponses cochées
    for(var i = 0; i < selectedAnswers.length; i++) {
      positionOfSelectedAnswers[i] = getAnswerPosition(selectedAnswers[i], quizzID) ;
    }
    // On compte le nombre de réponses correctes pour le quizz courant
    var totalCorrectAnswers = countCorrectAnswers(quizzID) ;
    // Si le nombre de réponses sélectionnées est différent du nombre total de bonnes réponses alors la/les réponses sont incorrectes
    if(totalCorrectAnswers !== selectedAnswers.length) answerIsIncorrect(currentQuizz) ;
    else {
      // Ici on cherche le nombre de réponses sélectionnées justes
      var correctAnswers = 0 ;
      for(var i = 0; i < positionOfSelectedAnswers.length; i++) {
        var index = positionOfSelectedAnswers[i] ;
        if(allAnswers[quizzID][index] === true) correctAnswers++ ;
      }
      // Si le nombre de réponses données est égal au nombre de bonnes réponses total alors la réponse est juste ...
      if(correctAnswers === totalCorrectAnswers) answerIsCorrect(currentQuizz) ;
      // ... sinon elle est fausse
      else answerIsIncorrect(currentQuizz) ;
    }
  }
  else {
    // On récupère la réponse sélectionné et on vérifie qu'une réponse a bien été sélectionnée
    var selectedAnswer = $('.selected')[0] ;
    if(selectedAnswer != undefined) {
      // On récupère la position de la réponse sélectionnée
      var answerPosition = getAnswerPosition(selectedAnswer, quizzID) ;
      // On vérifie grâce à la variable allAnswers si la position correspond à 'true' alors la réponse sélectionnée est juste sinon elle est fausse
      switch(allAnswers[quizzID][answerPosition]) {
        case true:
        answerIsCorrect(currentQuizz) ;
        break ;

        case false:
        answerIsIncorrect(currentQuizz) ;
        break ;
      }
    }
  }
}) ;

}) ;

function countCorrectAnswers(quizzID) {
  var total = 0 ;
  for(var i = 0; i < allAnswers[quizzID].length; i++) {
    if(allAnswers[quizzID][i] === true) total++ ;
  }
  return total ;
}

function answerIsCorrect(currentQuizz) {
  var newPara = document.createElement( "div" );
  newPara.setAttribute( 'class', 'correct' );
  newPara.innerHTML = "<p> Bonne réponse </p>";
  currentQuizz.appendChild(newPara);
}

function answerIsIncorrect(currentQuizz) {
  var newPara = document.createElement( "div" );
  newPara.setAttribute( 'class', 'incorrect' );
  newPara.innerHTML = "<p> Mauvaise réponse </p>";
  currentQuizz.appendChild(newPara);
}

function getAnswerPosition(selectedAnswer, quizzID) {
  var currentQuizz = allQuizz[quizzID] ;
  var currentQuizzAnswers = currentQuizz.getElementsByClassName('answer') ;
  for(var i = 0; i < currentQuizzAnswers.length; i++) {
    if(currentQuizzAnswers[i] === selectedAnswer) return i ;
  }
}

function checkIfAlreadyAnswered() {
  var check1 = $('.correct')[0] ;
  var check2 = $('.incorrect')[0] ;
  if(check1 != undefined) check1.remove() ;
  if(check2 != undefined) check2.remove() ;
}

$(document).on('keydown', function() {
  $('.selected').removeClass('selected') ;
}) ;
