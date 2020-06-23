# Documentation

## Introduction&nbsp;:

Quiz.js is a script based on an other script called Transition.js. Transition.js is used for creating presentation using HTML and the script is available at this address&nbsp;: <https://math.unice.fr/~pantz/Geek/transition.html>.

## How to use&nbsp;:

To use this script, you'll need first to install the transition.js script. When this is done, you'll have to download quiz.js available there `./scripts/quiz.js`. The script is fully configurable as you can see from line 1 to 37, you'll can select all the class names used and all the messages that are appended from the script. On this documentation, only default values will be used. Now that everything is installed, you can choose between 2 versions&nbsp;:

Don't forget to include the line `<script type='text/javascript' src='./scripts/quiz.js'></script>` on your index page.

### The local version&nbsp;:

For the local version, you only need quiz.js script. To create a quiz, you have to add "quiz" class name on each `<section>` tag. Warning, if it's a MCQ, you also need to add "mcq" as class name. Now your section should look like this&nbsp;: `<section class="quiz">` or like this for a MCQ&nbsp;: `<section class="quiz mcq">`. Once this is done, you can add a `<p>` tag with the class "question" that will contain the title of the question. Then, for each answer you just have to add a `<p>` tag with "answer true" or "answer false" (depending if the answer is true or not) as class name. Finally, put an other `<p>` tag with class name "submit" and your quiz is ready. Your code should look like&nbsp;:
<br>
```HTML
<section class="quiz">
  <p class="question">On which script is based quiz.js ?</p>
  <div>
    <p class="answer false">42.js</p>
    <p class="answer true">transition.js</p>
    <p class="answer false">idontknow.js</p>
    <p class="answer false">kojima.js</p>
  </div>
  <p class="submit">Submit</p>
</section>
```
or like this for a MCQ&nbsp;: <br>
```HTML
<section class="quiz mcq">
  <p class="question">2 + 2 is ?</p>
  <div>
    <p class="answer true">4</p>
    <p class="answer false">8</p>
    <p class="answer true">(3 * 5) / 2 + 4 * 26 - ((2 * 50) + 7.5)</p>
    <p class="answer false">90</p>
  </div>
  <p class="submit">Submit</p>
</section>
```

### The online version&nbsp;:

Now, for the online version, you need to import all the files on `./stats/`. You also need to insert these lines on your file for seeing the charts and for making all the request from the script and the PHP files.

- Script for the charts&nbsp;: `<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>`,
- Scripts for the request&nbsp;: `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`, <br>
`<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>`.

Once this is done, you have to change all the information on the file `./stats/config.php`. When it's done, you have to add the class "rated" to the `<body>` tag. The quiz.js script will automatically add all your quiz on your database. Now, when you press the submit button on your quiz, the script adds 1 to the count of the selected answer.

### Presenter mode :

To access the presenter mode, you have to add in the URL `?presenter_mode=true`. Once this is done, for each quiz slide you'll have 2 buttons. The first one, "reload votes" is used to reload all the count of answers in the database for the current quiz. The second one, "show results" serves to show all the results for the current quiz.

### Mobile version :

If you want your presentation to be available on mobile, you just have to import the files `./scripts/mobile.js` and `./styles/mobile.css` and set in your code before the `</body>` tag the following code&nbsp;:
```html
<span class="mobile_buttons">
  <div class="btn-left">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
    </svg>
  </div>
  <div class="btn-right">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
    </svg>
  </div>
</span>
```

## Some technical points&nbsp;:

### For the JavaScript&nbsp;:

Here, a little explanation on how the script works. <br>
First, when the document is loaded, the script stores in the variable allquiz, all the section that contains "quiz" in class name. Then, it sets for each section the attribute "data-quiz", an integer that represents the index of each quiz and then, it fills the array allAnswers with all the answers at the current index and it deletes the "true" or "false" of each answer.
```js
for(var i = 0; i < allquiz.length; i++) {
  var currentQuiz = allquiz.eq(i) ;
  currentQuiz.attr('data-quiz', i) ;

  allAnswers[i] = [] ;
  var answers = allquiz[i].getElementsByClassName(answerClassName) ;
  for(var j = 0; j < answers.length; j++) {
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
```
Then, we have multiple EventListener. The first one line 93, `$('.'+answerClassName).on('click', function() {` is the listener when we click on an answer. The script first checks if the clicked answer wasn't already selected, if yes then it deletes the 'selected' class of the answer and if no, it adds the class name 'selected' to the clicked answer and if the answer isn't from a mcq section, then it deletes the class 'selected' from all others answers.

The second one line 103, `$('.'+submitClassName).on('click', function() {` is used to manage the selected answers when we click on the submit button. First, the script gets the index of the quiz through the "data-quiz" attribute and then, the variable currentQuiz will store the quiz corresponding to this id. Next, it checks if the currentQuiz is a mcq or not. If it is, then it gets all the selected answers through 'selected' class name and verify the position of each selected answer. Then, it checks with the variable allAnswers if each position of the selected answers corresponds to "true" and if everything is correct, it runs the function `answerIsCorrect()` or else the function `answerIsIncorrect()` (the content of these functions can be changed to fit with your presentation). Else, if it's a normal quiz, it just checks if the position of the selected answer corresponds to "true" in the variable allAnswers.

The third EventListener is for the result button, the function `showResults()` is called when you press the button. This function gets from the PHP file `./stats/get_answers_count.php` all the data we need (each answer and the number of votes for each answer). Then, with the function `drawChart()` it displays the chart with all the values it got from the request.

Finally, the last EventListener serves to deselect the selected answers when we press a key (this function is used because we need to press a key to switch between slides on the presentation).

### For the PHP&nbsp;:

During this part, I'll explain what each PHP file available on `./stats/` is used for.

The first one, `./stats/config.php` is the config file, inside you need to set all the data for the database connection (server name, username, password, database name).

The second one, `./stats/database_handler.php` is used for the creation of the tables quiz and answers and also used for reloading count for the answers.

The third file `./stats/get_answers_count.php` serves to get the data used to display the charts. It makes a query to the database to select the count and the text of each answer of the current quiz ID passed in parameter (through the `$data` variable).

The fourth one, `./stats/insert_answers.php` is used to insert in the database all the answers in the table 'answer'.

The fifth, `./stats/insert_quiz.php` is almost the same as the previous but here it serves to store the quiz in the table 'quiz'.

Finally, the last one `./stats/update_answers.php` is used to update the count of answers in the database every time someone votes. It stores in a session variable an index that correspond to how many times the votes have been reloaded and check first if the last index is different from the new index. If it is, then it stores in the session variable `$_SESSION['alreadyVoted'.$data['id']]` the current index and unset the last selected answers. Then, it updates in the database the values of the count for each selected answer if the session variable `$_SESSION['quiz'.$data['id']]` is set and adds 1 to the count. Else, it first get all the last selected answers from the session variable `$_SESSION['quiz'.$data['id']]` and remove 1 from the count in the database then, it adds 1 to the count for each currently selected answers.

## Credits&nbsp;:

This script was entirely done by ARMANDO Julien as part of individual projects led by the IUT of Nice during the pandemic that affected the whole world. Here the link to access IUT website&nbsp;: <http://unice.fr/iut/presentation/accueil>

The displayed charts are made by another script called Chart.js and available here&nbsp;: <https://www.chartjs.org/>

## License&nbsp;:

Quiz.js is a free, open source script and can be used by anyone wishing to use it.
