# Documentation

## Introduction :

Quiz.js is a script based on an other script called Transition.js. Transition.js is used for creating presentation on HTML and the script is available on this address : <https://math.unice.fr/~pantz/Geek/transition.html>.

## How to use :

To use this script, you'll need first to install the transition.js script. When this is done, you'll have to download quiz.js available there `./scripts/quiz.js`. The script is fully configurable as you can see from line 1 to 30, you'll can select all the class names used and all the messages that are append from the script. On this documentation, only default values will be used. Now that everything is installed, you can choose between 2 versions :

### The local version :

For the local version, you only need HTML and quiz.js script. To create a quiz, you have to add "quiz" class name on each `<section>` tag. Warning, if it's a MCQ, you also need to add "mcq" as class name. Now your section should look like this : `<section class="quiz">` or like this for a MCQ : `<section class="quiz mcq">`. Once this is done, you can add a `<p>` tag with the class "question" that will contain the title of the question. Then, for each answer you just have to add a `<p>` tag with "answer true" or "answer false" (depending if the answer is true or not) as class name. Finally, put an other `<p>` tag with class name "submit" and your quiz is ready. Your code should look like :
<br>
![an example of quiz](./images/quiz_example.png) <br> or like this for a MCQ :
![an example of MCQ](./images/mcq_example.png)

### The online version :

## Credits :

This script was entirely done by ARMANDO Julien as part of individual projects led by the IUT of Nice during the health crisis that affected the whole world. Here the link to access IUT website : <http://unice.fr/iut/presentation/accueil>

## License :

Quiz.js is a free open source script and can be used by anyone wishing to use it.
