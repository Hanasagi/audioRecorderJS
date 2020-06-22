$(document).ready(function() {
  console.log("mobile.js is running !") ;

  $('.btn-right').on('click', function() {
    var event = new KeyboardEvent('keydown', {'keyCode':39}) ;
    document.dispatchEvent(event) ;
  }) ;

  $('.btn-left').on('click', function() {
    var event = new KeyboardEvent('keydown', {'keyCode':37}) ;
    document.dispatchEvent(event) ;
  }) ;
}) ;
