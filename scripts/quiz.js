// All the config variables
// Class name for the quiz default to "quiz"
const quizClassName = "quiz" ;
// Class name for the mcq quiz default to "mcq"
const mcqClassName = "mcq" ;
// Class name for the question default to "question"
const questionClassName = "question" ;
// Class name for the answers default to "answer"
const answerClassName = "answer" ;
// Class name to define if the quiz is rated or not default to "rated"
const ratedClassName = "rated" ;
// Class name of the submit button default to "submit"
const submitClassName = "submit" ;
// Class name to indicate if submitted answer is correct default to "correct"
// If you don't want to indicate this to the user, let the field blank ""
const correctAnswerSelectedClassName = "" ;
// Class name to indicate if submitted answer is incorrect default to "incorrect"
// If you don't want to indicate this to the user, let the field blank ""
const incorrectAnswerSelectedClassName = "" ;
// Class name for the showResults button default to "show_results"
const showResultClassName = "show_results" ;
// Class name for the chart container default to "chart-container"
const chartContainerClassName = "chart-container" ;
// Class name for the button which resets the database default to "delete"
const deleteDatabaseClassName = "delete" ;

// Message for the show_result button
const showResultsMessage = "Voir les résultats" ;
// Message if the given answer is correct
const correctAnswerMessage = "Bonne réponse" ;
// Message if the given answer is incorrect
const incorrectAnswerMessage = "Mauvaise réponse" ;

// Path to all the PHP files default to "../stats/"
const statsPath = "../stats/" ;

var allquiz ;
var allAnswers = [] ;
var isRated = false ;

$(document).ready(function() {
  console.log("quiz.js is running !") ;

  allquiz = $('.'+quizClassName) ;
  // Check if the ratedClassName is set to the tag <body>, if yes, it will start the PHP files
  if($('body')[0].className.includes(ratedClassName)) {
    isRated = true ;
    // We initialize the database
    let json = JSON.stringify({action: "init"}) ;
    ajaxCall(statsPath + "database_handler.php", json) ;
  }

  for(var i = 0; i < allquiz.length; i++) {
    // We add the attribute "data-quiz" on each section that includes quizClassName on its classname
    var currentQuiz = allquiz.eq(i) ;
    currentQuiz.attr('data-quiz', i) ;
    if(isRated) {
      // If the quizs are rated, we save the question and the id of the quiz to the database
      var question = currentQuiz.find('.'+questionClassName)[0] ;
      let json = JSON.stringify({id: i, question: question.innerText}) ;
      ajaxCall(statsPath + '/insert_quiz.php', json) ;
    }

    // We fill the answers array depending on the current quiz
    allAnswers[i] = [] ;
    var answers = allquiz[i].getElementsByClassName(answerClassName) ;
    for(var j = 0; j < answers.length; j++) {
      if(isRated) {
        // We save on the database the answers (only if the quizs are rated)
        let json = JSON.stringify({id: i, answer: answers[j].innerText}) ;
        ajaxCall(statsPath + 'insert_answers.php', json) ;
      }
      // We browse through all the answers in the current quiz to add it to the allAnswers array and delete the HTML class to prevent users from seeing the correct answers
      // The array will have this form :
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

// When we click on an answer it selects it and deselects the last answer
$('.'+answerClassName).on('click', function() {
  if(!$(this)[0].className.includes('selected')) {
    $(this).addClass('selected') ;
    if(!($(this).closest('section')[0].className.includes(mcqClassName))) $('.selected').not(this).removeClass('selected') ;
  }
  else $(this).removeClass('selected') ;
}) ;


// When we click on submit button
$('.'+submitClassName).on('click', function() {
  // Function used to check if the user has already responded and delete the result of his response
  checkIfAlreadyAnswered() ;

  // The quiz ID is retrieved using the "data-quiz" attribute
  var quizID = $(this).closest('section').attr('data-quiz') ;
  // And we select the current quiz
  var currentQuiz = allquiz[quizID] ;

  // Handling different responses if it is a MCQ
  if(currentQuiz.className.includes(mcqClassName)) {
    // Here, we retrieve an array of selected answers
    var selectedAnswers = $('.selected') ;

    // We verify that at least 1 answer is selected
    if(selectedAnswers.length > 0) {
      var positionOfSelectedAnswers = [] ;
      var selectedAnswersText = [] ;
      // And looking for the position of all checked answers
      for(var i = 0; i < selectedAnswers.length; i++) {
        positionOfSelectedAnswers[i] = getAnswerPosition(selectedAnswers[i], quizID) ;
        selectedAnswersText[i] = selectedAnswers[i].innerText ;
      }
      if(isRated) {
        // Loop to save all selected responses in the database
        let json = JSON.stringify({id: quizID, selected: selectedAnswersText}) ;
        ajaxCall(statsPath + 'update_answers.php', json) ;
        // If the quizs are rated, we show the result button
        showResultButton($(this)) ;
      }
      // Count the correct number of answers for the current quiz
      var totalCorrectAnswers = countCorrectAnswers(quizID) ;
      // If the number of selected answers is different from the total number of correct answers then the answer(s) are incorrect
      if(totalCorrectAnswers !== selectedAnswers.length) answerIsIncorrect(currentQuiz) ;
      else {
        // Here we look for the number of correct selected answers
        var correctAnswers = 0 ;
        for(var i = 0; i < positionOfSelectedAnswers.length; i++) {
          var index = positionOfSelectedAnswers[i] ;
          if(allAnswers[quizID][index] === true) correctAnswers++ ;
        }
        // If the number of responses given is equal to the total number of correct responses then the response is correct ...
        if(correctAnswers === totalCorrectAnswers) answerIsCorrect(currentQuiz) ;
        // ... else the response is inccorect
        else answerIsIncorrect(currentQuiz) ;
      }
    }
  }
  else {
    // Retrieve the selected response and verify that a response has been selected
    var selectedAnswer = $('.selected')[0] ;
    var selectedAnswerText = [] ;
    if(selectedAnswer != undefined) {
      selectedAnswerText[0] = selectedAnswer.innerText ;
      // The selected response position is retrieved
      var answerPosition = getAnswerPosition(selectedAnswer, quizID) ;
      if(isRated) {
        // Save the selected response in the database
        let json = JSON.stringify({id: quizID, selected: selectedAnswerText}) ;
        ajaxCall(statsPath + 'update_answers.php', json) ;
        // If the quizs are rated, we show the result button
        showResultButton($(this)) ;
      }
      // Check with the variable allAnswers if the position corresponds to  'true ' then the selected response is correct otherwise it is false
      switch(allAnswers[quizID][answerPosition]) {
        case true:
        answerIsCorrect(currentQuiz) ;
        break ;

        case false:
        answerIsIncorrect(currentQuiz) ;
        break ;
      }
    }
  }
}) ;

$('.'+deleteDatabaseClassName).on('click', function() {
  // We delete the database
  if(isRated) {
    let json = JSON.stringify({action: "delete"}) ;
    ajaxCall(statsPath + "database_handler.php", json) ;
  }
}) ;

}) ;

// Function to show the results after clicking show result button
function showResults() {

  var alreadyExist = $('.'+chartContainerClassName)[0] ;
  if(alreadyExist !== undefined) alreadyExist.remove() ;

  var currentSection = $('.'+showResultClassName)[0].closest('section') ;

  var newPara = document.createElement("div") ;
  newPara.setAttribute('class', chartContainerClassName) ;
  newPara.innerHTML = "<canvas id='chart'></canvas>" ;
  currentSection.append(newPara) ;

  let getData = axios({
    method: 'POST',
    url: statsPath + 'get_answers_count.php',
    data: {id: currentSection.getAttribute('data-quiz')},
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
  getData.then(r => {
    var dataLab = [] ;
    var dataCount = [] ;
    for(var i = 0; i < r.length; i++) {
      dataLab[i] = r[i]['answer_text'] ;
      dataCount[i] = r[i]['count'] ;
    }
    drawChart(dataLab, dataCount) ;
  });
}

// Function to count the number of correct answers in the quiz (only for MCQ)
function countCorrectAnswers(quizID) {
  var total = 0 ;
  for(var i = 0; i < allAnswers[quizID].length; i++) {
    if(allAnswers[quizID][i] === true) total++ ;
  }
  return total ;
}

// Function to show the correct message
function answerIsCorrect(currentQuiz) {
  if(correctAnswerSelectedClassName !== "") {
    var newPara = document.createElement( "div" );
    newPara.setAttribute( 'class', correctAnswerSelectedClassName);
    newPara.innerHTML = "<p>" + correctAnswerMessage + "</p>";
    currentQuiz.appendChild(newPara);
  }
}

// Function to show the incorrect message
function answerIsIncorrect(currentQuiz) {
  if(incorrectAnswerSelectedClassName) {
    var newPara = document.createElement( "div" );
    newPara.setAttribute( 'class', incorrectAnswerSelectedClassName);
    newPara.innerHTML = "<p>" + incorrectAnswerMessage + "</p>";
    currentQuiz.appendChild(newPara);
  }
}

// Function to get the position of the answer
function getAnswerPosition(selectedAnswer, quizID) {
  var currentQuiz = allquiz[quizID] ;
  var currentQuizAnswers = currentQuiz.getElementsByClassName(answerClassName) ;
  for(var i = 0; i < currentQuizAnswers.length; i++) {
    if(currentQuizAnswers[i] === selectedAnswer) return i ;
  }
}

// Function to show the result button
function showResultButton(submitButton) {
  var alreadyExist = $('.'+showResultClassName)[0] ;
  if(alreadyExist != undefined) alreadyExist.remove() ;

  var newPara = document.createElement( "p" );
  newPara.setAttribute( 'class', showResultClassName);
  newPara.innerText = showResultsMessage;
  submitButton.parent().append(newPara);
  newPara.addEventListener('click', showResults) ;
}

// Function to check if the user has already answered the question
function checkIfAlreadyAnswered() {
  if(correctAnswerSelectedClassName !== "") var check1 = $('.'+correctAnswerSelectedClassName)[0] ;
  if(incorrectAnswerSelectedClassName !== "") var check2 = $('.'+incorrectAnswerSelectedClassName)[0] ;
  if(check1 != undefined) check1.remove() ;
  if(check2 != undefined) check2.remove() ;
}

// Function to make ajax call on the PHP files
function ajaxCall(url, data) {
  $.ajax({
    url: url,
    type: 'POST' ,
    data: data,
    dataType: 'json'
  }) ;
}

// Function to draw the chart
// Function used with Chart.js
// https://www.chartjs.org/
function drawChart(dataLabels, dataCount) {
  var data = {
    labels: dataLabels,
    datasets: [{
      label: "Nombre de votes ",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: dataCount,
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        stacked: true,
        gridLines: {
          display: true,
          color: "rgba(255,99,132,0.2)"
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };

  Chart.Bar('chart', {
    options: options,
    data: data
  });

}

// To deselect the answers when a key is press
$(document).on('keydown', function(e) {
  checkIfAlreadyAnswered() ;
  $('.selected').removeClass('selected') ;
}) ;
