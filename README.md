# Documentation

## Introduction&nbsp;:

Quiz.js is a script based on an other script called Transition.js. Transition.js is used for creating presentation on HTML and the script is available on this address&nbsp;: <https://math.unice.fr/~pantz/Geek/transition.html>.

## How to use&nbsp;:

To use this script, you'll need first to install the transition.js script. When this is done, you'll have to download quiz.js available there `./scripts/quiz.js`. The script is fully configurable as you can see from line 1 to 35, you'll can select all the class names used and all the messages that are append from the script. On this documentation, only default values will be used. Now that everything is installed, you can choose between 2 versions&nbsp;:

<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#FF0000" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
</svg> Don't forget to include the line `<script type='text/javascript' src='./scripts/quiz.js'></script>` on your index page.

### The local version&nbsp;:

For the local version, you only need HTML and quiz.js script. To create a quiz, you have to add "quiz" class name on each `<section>` tag. Warning, if it's a MCQ, you also need to add "mcq" as class name. Now your section should look like this&nbsp;: `<section class="quiz">` or like this for a MCQ&nbsp;: `<section class="quiz mcq">`. Once this is done, you can add a `<p>` tag with the class "question" that will contain the title of the question. Then, for each answer you just have to add a `<p>` tag with "answer true" or "answer false" (depending if the answer is true or not) as class name. Finally, put an other `<p>` tag with class name "submit" and your quiz is ready. Your code should look like&nbsp;:
<br>
![an example of quiz](./images/quiz_example.png) <br> or like this for a MCQ&nbsp;: <br>
![an example of MCQ](./images/mcq_example.png)

### The online version&nbsp;:

Now, for the online version, you need to import all the files on `./stats/` and don't forget to set your index page from .html to .php. You also need to insert this lines on your file for seeing the charts and for making all the request from the script and the PHP files.
- Script for the charts&nbsp;: `<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>`,
- Scripts for the request&nbsp;: `<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`, <br>
`<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>`.

 Once this is done, you have to change all the informations on the file `./stats/config.php`. When it's done, you have to add the class "rated" to the `<body>` tag. The quiz.js script will automatically add all your quiz on your database. Now, when you press the submit button, the script will append a show results button and when you press It, It'll show you a chart with all answers given.

## Credits&nbsp;:

This script was entirely done by ARMANDO Julien as part of individual projects led by the IUT of Nice during the health crisis that affected the whole world. Here the link to access IUT website&nbsp;: <http://unice.fr/iut/presentation/accueil>

The displayed charts are made by an other script called Chart.js and available here&nbsp;: <https://www.chartjs.org/>

## License&nbsp;:

Quiz.js is a free open source script and can be used by anyone wishing to use it.
