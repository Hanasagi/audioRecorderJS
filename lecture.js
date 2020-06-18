let timerList;
let frag;
let audio;
let action;
let audioFile;
let actionFile;
let pageURL;

function log(message) {
  console.log(message);
}

function createAudioReader(idParent, classe, filePath, timer = "", fragments = "") {
  let audio = new Audio(filePath);
  let reader = document.createElement("audio");
  reader.src = filePath;
  reader.preload = "metadata";
  reader.controls = "controls";
  reader.className = classe;
  if (timer != "")
    reader.setAttribute("timer", timer);
  if (fragments != "")
    reader.setAttribute("fragments", fragments);

  let parent = document.getElementById(idParent);
  parent.appendChild(reader);
}

function getTimer(element) {
  function checkTimerBegin(event) {
    if ((event.keyCode == 13) || (event.keyCode == 32) || (event.keyCode == 40) || (event.keyCode == 34) || (event.keyCode == 39)) {
      event.preventDefault();
      log(event.keyCode)
      if (frag[time].target[0] == timerList[0]) {
        nextElem(0);
        document.removeEventListener('keyup', checkTimerBegin);
      }
    }
  }
  frag = getFragments(document);
  timerList = element.querySelectorAll("[timer]");
  if (frag[0].target[0].hasAttribute("timer"))
    nextElem(0)
  else {

    document.addEventListener('keyup', checkTimerBegin);
  }


}

function getAudioTime(currentTimedElement, element) {
  //Source : https://zeke.blog/2018/02/14/get-video-and-audio-blob-duration-in-html5/
  let audioObject = new Audio(element);
  let time = 0;

  timerList[currentTimedElement].addEventListener('loadedmetadata', function() {
    audioObject.currentTime = 10000;

    audioObject.addEventListener('timeupdate', function() {
      time = Math.ceil(audioObject.duration) + parseInt(timerList[currentTimedElement].getAttribute("timer"), 10);
      log(Math.ceil(audioObject.duration) + parseInt(timerList[currentTimedElement].getAttribute("timer"), 10))
    });
  });
  return time;
}

function nextElem(current) {
  function changeElem(event) {
    if ((event.keyCode == 13) || (event.keyCode == 32) || (event.keyCode == 40) || (event.keyCode == 34) || (event.keyCode == 39)) {
      event.preventDefault();
      log(timerList[current]);
      log("test")
      nextElem(current)
      document.removeEventListener('keyup', changeElem);
    }
  }


  if (current < timerList.length) {

    if (frag[time].target[0].hasAttribute("timer")) {
      //log(timerList[current])	;
      let seconds = timerList[current].getAttribute("timer");
      log(seconds + " secondes")
      if (timerList[current].nodeName != "AUDIO") {
        setTimeout(function() {
          current++;
          log(timerList[current])
          next();
          nextElem(current);
        }, seconds * 1000);
      } else {
        setTimeout(function() {
          current++;
          next();
          nextElem(current);
        }, seconds * 1000);

      }
    } else {
      document.addEventListener('keyup', changeElem);

    }
  }
}

function initPlay(audio, action) {

  var playButton = document.createElement("button");
  playButton.innerText = "Play";
  var pauseButton = document.createElement("button");
  pauseButton.innerText = "Pause";
  pauseButton.disabled = true;
  var stopButton = document.createElement("button");
  stopButton.innerText = "Stop";
  stopButton.disabled = true;
  var reader = new FileReader();
  let actionMap;
  if(typeof audio == "object"){
  reader.addEventListener('load', function(e) {
    actionMap = JSON.parse(e.target.result);
    //source https://www.xul.fr/ecmascript/map-et-objet.php
    function objectToMap(o) {
      let m = new Map()
      for (let k of Object.keys(o)) {
        if (o[k] instanceof Object) {
          m.set(k, objectToMap(o[k]))
        } else {
          m.set(k, o[k])
        }
      }
      return m
    }
    actionMap = objectToMap(actionMap)
    log(actionMap)
    document.addEventListener("keyup", function(e) {
      if (e.keyCode == 80) {
        playRecord(audioPlayer, actionMap);
        pauseButton.disabled = false;
        stopButton.disabled = false;
        playButton.disabled = true;
      } else if (e.keyCode == 81) {
        if (pauseButton.innerText == "Pause") {
          pauseButton.innerText = "Resume";
          pauseRecord(audioPlayer, actionMap);
        } else {
          pauseButton.innerText = "Pause";
          resumeRecord(audioPlayer, actionMap);
        }
      } else if (e.keyCode == 83) {
        stopRecord(audioPlayer, actionMap);
        playButton.disabled = false;
        pauseButton.disabled = true;
        stopButton.disabled = true;
      }
    });
    playButton.addEventListener("click", function() {
      playRecord(audioPlayer, actionMap);
      pauseButton.disabled = false;
      stopButton.disabled = false;
      playButton.disabled = true;
    });
    pauseButton.addEventListener("click", function() {
      if (pauseButton.innerText == "Pause") {
        pauseButton.innerText = "Resume";
        pauseRecord(audioPlayer, actionMap);
      } else {
        pauseButton.innerText = "Pause";
        resumeRecord(audioPlayer, actionMap);
      }
    });
    stopButton.addEventListener("click", function() {
      stopRecord(audioPlayer, actionMap);
      playButton.disabled = false;
      pauseButton.disabled = true;
      stopButton.disabled = true;
    });
  });
  reader.readAsBinaryString(action);
}
  let span = document.getElementById("spanPlay");
  span.appendChild(playButton);
  span.appendChild(pauseButton);
  span.appendChild(stopButton);
  audio = URL.createObjectURL(audio);
  let audioPlayer = document.createElement("audio")
  audioPlayer.style.visibility = "hidden";
  audioPlayer.controls = "controls";
  audioPlayer.src = audio;
  span.appendChild(audioPlayer)
}

let audioDuration = 0;
let currentTime = 0;

function playRecord(audioPlayer, actionMap) {
  audioPlayer.play();

  let audioObject = new Audio(audioPlayer.src);

  audioObject.currentTime = 10000;
  audioObject.addEventListener('timeupdate', e => {
    setAudioDuration(audioObject.duration);
  });

  startInterval(audioPlayer, actionMap);

}

function pauseRecord(audioPlayer, actionMap) {
  audioPlayer.pause()
  clearInterval(actionTimer)
}

function resumeRecord(audioPlayer, actionMap) {
  audioPlayer.play();
  startInterval(audioPlayer, actionMap);
}

function stopRecord(audioPlayer, actionMap) {
  audioPlayer.pause();
  currentTime = audioPlayer.currentTime = 0;
  clearInterval(actionTimer);
  log("End.")
}

function setAudioDuration(duration) {
  audioDuration = duration;
}

function startInterval(audioPlayer, actionMap) {
  actionTimer = setInterval(function() {
    currentTime++;
    if (actionMap.get("" + currentTime) != undefined) {
      switch (actionMap.get("" + currentTime)) {
        case "next":
          next();
          break;
        case "prev":
          prev();
          break;
        case "jump":
          jump();
          break;
      }
    } else if (currentTime >= audioDuration) {
      stopRecord(audioPlayer, actionMap);
    }
  }, 1000);
}
