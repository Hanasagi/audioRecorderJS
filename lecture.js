
let timerList;

function log(message){
	console.log(message);
}


function readAudio(id,filePath){
	let reader = document.createElement("audio");
	reader.src=filePath;
	reader.controls="controls";
	let idElement = document.getElementById(id);
	idElement.appendChild(reader);
}

function getTimer(element){
	timerList=element.querySelectorAll("[timer]");
	nextElem(0);

	}

function nextElem(c){
	if(c<timerList.length){
	let seconds=timerList[c].getAttribute("timer");
	log(seconds);
	setTimeout(function(){
		timerList[c].innerText="test";
		c++;
		next(c);
	},seconds*1000);
}
}