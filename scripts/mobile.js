$(document).ready(function() {
  console.log("Mobile_quizz.js a bien démarré") ;

  $('.btn-right').on('click', function() {
    var event = new KeyboardEvent('keydown', {'keyCode':39}) ;
    document.dispatchEvent(event) ;
  }) ;

  $('.btn-left').on('click', function() {
    var event = new KeyboardEvent('keydown', {'keyCode':37}) ;
    document.dispatchEvent(event) ;
  }) ;
}) ;
