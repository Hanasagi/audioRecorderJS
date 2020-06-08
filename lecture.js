let timerList;
let frag;

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
			log("testbegin")
    if ((event.keyCode == 13) || (event.keyCode == 32) || (event.keyCode == 40) || (event.keyCode == 34) || (event.keyCode == 39)) {
      event.preventDefault();
      log(event.keyCode)
      if (frag[time].target[0] == timerList[0]) {
        nextElem(0);
        document.removeEventListener('keyup',checkTimerBegin);
      }
    }
  }
  frag = getFragments(document);
  timerList = element.querySelectorAll("[timer]");
  	if(frag[0].target[0].hasAttribute("timer"))
 		nextElem(0)
 	else{
 		
 		   document.addEventListener('keyup',checkTimerBegin);
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
      log(timerList[current])	;	
      	log("test")
	     nextElem(current)
        document.removeEventListener('keyup',changeElem);
      }
    }
	
 
    if (current < timerList.length) {

    	 if (frag[time].target[0].hasAttribute("timer")) {
    	 	//log(timerList[current])	;	
      let seconds = timerList[current].getAttribute("timer");
      log(seconds+" secondes")
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
    }else{

    		document.addEventListener('keyup',changeElem);

    	}
    }
  }
