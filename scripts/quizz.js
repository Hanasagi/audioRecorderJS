var allQuizz ;

$(document).ready(function() {
  allQuizz = $('.quizz') ;

  $('.answer').on('click', function() {
    $(this).addClass('selected') ;
    $('.answer').not(this).removeClass('selected') ;
  }) ;

  $('.submit').on('click', function() {
    var selectedAnswer = $('.selected')[0] ;
    if(selectedAnswer === undefined) alert('Selectionnez une réponse') ;
    else {
      if(selectedAnswer.className.includes('true')) alert('Bonne réponse') ;
      else alert('Mauvaise réponse');
    }
  }) ;
}) ;

$(document).on('keydown', function() {
  $('.selected').removeClass('selected') ;
}) ;
