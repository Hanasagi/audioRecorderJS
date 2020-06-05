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
      // On parcourt l'ensemble des réponses du quizz courant pour l'ajouter au tableau allAnswers et on supprime la classe du HTML
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
  $(this).addClass('selected') ;
  $('.answer').not(this).removeClass('selected') ;
}) ;

// Lorsque l'on clique sur le bouton submit
$('.submit').on('click', function() {
  // Fonction servant à supprimer les append lorsque l'on donne une réponse
  checkIfAlreadyAnswered() ;

  // On récupère l'ID du quizz grâce à l'attribut "data-quizz"
  var quizzID = $(this).closest('section').attr('data-quizz') ;
  // Et on sélectionne le quizz correspondant
  var currentQuizz = allQuizz[quizzID] ;

  // On récupère la réponse sélectionné et on vérifie qu'une réponse a bien été sélectionnée
  var selectedAnswer = $('.selected')[0] ;
  if(selectedAnswer != undefined) {
    // On récupère la position de la réponse sélectionnée
    var answerPosition = getAnswerPosition(selectedAnswer, quizzID) ;
    // On vérifie grâce à la variable allAnswers si la position correspond à 'true' alors la réponse sélectionnée est juste sinon elle est fausse
    switch(allAnswers[quizzID][answerPosition]) {
      case true:
      var newPara = document.createElement( "div" );
      newPara.setAttribute( 'class', 'good' );
      newPara.innerHTML = "<p> Bonne réponse BG </p>";
      currentQuizz.appendChild(newPara);
      break ;

      case false:
      var newPara = document.createElement( "div" );
      newPara.setAttribute( 'class', 'bad' );
      newPara.innerHTML = "<p> Mauvaise réponse PD </p>";
      currentQuizz.appendChild(newPara);
      break ;
    }
  }
}) ;

}) ;

$(document).on('keydown', function() {
  $('.selected').removeClass('selected') ;
}) ;

function getAnswerPosition(selectedAnswer, quizzID) {
  var currentQuizz = allQuizz[quizzID] ;
  var currentQuizzAnswers = currentQuizz.getElementsByClassName('answer') ;
  for(var i = 0; i < currentQuizzAnswers.length; i++) {
    if(currentQuizzAnswers[i] === selectedAnswer) return i ;
  }
}

function checkIfAlreadyAnswered() {
  var check1 = $('.good')[0] ;
  var check2 = $('.bad')[0] ;
  if(check1 != undefined) check1.remove() ;
  if(check2 != undefined) check2.remove() ;
}
