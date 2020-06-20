<!DOCTYPE html>
<html lang=fr dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projet Transition ARMANDO Julien</title>

  <script type="text/javascript" src="transition/transition.js"></script>
  <script>document.addEventListener("DOMContentLoaded",function(){initFrag()})</script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script type="text/javascript" src="./scripts/quizz.js"></script>
  <script type="text/javascript" src="./scripts/mobile.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

  <link rel="stylesheet" type="text/css" href="transition/transition.css">
  <link rel="stylesheet" type="text/css" href="styles/quizz.css">
  <link rel="stylesheet" type="text/css" href="styles/mobile_quizz.css">
</head>
<body id="slides" class="rated">
  <section>
    <div>
      <p class="title">Bienvenue dans cette présentation faite avec transition.js</p>
    </div>
    <p class="hidden" fragments="{hidden}">Commençons par afficher quelques images</p>
    <div>
      <img id="naruto" class="hidden" src="./images/naruto.jpg" fragments="{hidden}">
    </div>
    <p id="toHide" class="hidden" fragments="{hidden} +1 [naruto]{multiclonage}">Une seule image ?? J'avais pourtant dis "quelques"</p>
    <p class="hidden" fragments="{hidden} +0 [toHide]{hidden}"> MULTICLONAGE !!!!!!</p>
    <div class="hidden" fragments="+1{hidden}">
      <img src="./images/multiclonage.jpg">
      <img src="./images/multiclonage.jpg">
      <img src="./images/multiclonage.jpg">
      <img src="./images/multiclonage.jpg">
      <img src="./images/multiclonage.jpg">
      <img src="./images/multiclonage.jpg">
      <img src="./images/multiclonage.jpg">
    </div>
    <p class="hidden" fragments="{hidden}">Ah voilà là il y a quelques images</p>
  </section>
  <section fragments="[slides]{--shift++} 1s">
    <div>
      <p class="title">Vous voyez cette deuxième slide</p>
    </div>
    <div id="moche" class="ugly">
      <p class="hidden" fragments="{hidden} 1s">On est d'accord cette page est très moche n'est-ce pas ?<p>
      <p class="hidden" fragments="{hidden} 1s">Après mes compètences en CSS ne sont pas très développées<p>
      <p class="hidden" fragments="{hidden} 1s">Donc il est difficile pour moi de faire un truc beau<p>
      <p class="hidden" fragments="{hidden} [moche]{ugly beautiful}">Quoi que ...<p>
      <img class="hidden" fragments="+0{hidden}" src="./images/en_fait_non.gif" />
  </div>
    <p class="hidden beautiful" fragments="{hidden police}">Vous avez vraiment cru je savais faire des belles choses en CSS ptdr</p>
    <p class="hidden beautiful" fragments="{hidden rotate}">LOLILOL</p>
  </section>
  <section class="quizz" fragments="[slides]{--shift++} 1s">
    <div>
      <p class="title">Now it's question time</p>
    </div>
    <p class="question">Quand suis-je né ?</p>
    <div class="hidden" fragments="{hidden} 1s">
      <p class="answer false">1910</p>
      <p class="answer false">1920</p>
      <p class="answer false">1930</p>
      <p class="answer false">1940</p>
      <p class="answer false">1950</p>
      <p class="answer false">1970</p>
      <p class="answer false">1990</p>
      <p class="answer true">2000</p>
    </div>
    <div>
      <p class="submit hidden" fragments={hidden}>valider</p>
    </div>
  </section>
  <section class="quizz qcm" fragments="[slides]{--shift++} 1s">
    <div>
      <p class="title">Now it's question time</p>
    </div>
    <p class="question">De quelle couleur était le cheval blanc d'Henri IV ?</p>
    <div class="hidden" fragments="{hidden} 1s">
      <p class="answer true">Pas noir</p>
      <p class="answer false">Bleu</p>
      <p class="answer false">Orange</p>
      <p class="answer true">Blanc</p>
    </div>
    <div class="hidden" fragments={hidden}>
      <p class="submit">valider</p>
    </div>
  </section>
  <section fragments="[slides]{--shift++} 1s">
    <div>
      <p class="delete">Recharger la base de données</p>
    </div>
  </section>
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
  </body>
  </html>
