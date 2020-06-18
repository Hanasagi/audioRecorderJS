/*let recordButton = document.getElementById("Record");
recordButton.addEventListener("click",start);

let stopButton =document.getElementById("Stop");
stopButton.addEventListener("click",stop);
*/
let chunks = [];
let extension;
let recorder;
let stream;
let recordInterval;
let timingMap=new Map();
let fragList;


if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')){
	extension="webm";
}else{
	extension="ogg"
}

function startRecord(){
	//audio
	fragList=getFragments(document);
	let timestamp=0;
	let info = document.getElementById("infoRecord");
	navigator.mediaDevices.getUserMedia({audio:true}).then(function(tmpStream){
		stream=tmpStream;
		let options = {
	      audioBitsPerSecond :  256000,
	      videoBitsPerSecond : 2500000,
	      bitsPerSecond:       2628000,
	      mimeType : 'audio/'+extension+';codecs=opus'
	    }
	    recorder = new MediaRecorder(stream,options);
	    recorder.ondataavailable = function(e){
	      	chunks.push(e.data);
	      	if (recorder.state == 'inactive') {
	          const blob = new Blob(chunks, { type: 'audio/'+extension, bitsPerSecond:128000});
	          console.log(blob);
	          createDownloadLink(blob,timingMap)
	      	}
	    };
	    recorder.onerror = function(e){
	    	console.log(e);
	    }
	    recorder.start();
	    info.innerHTML="Recording";

	   //action
	   recordInterval= setInterval(function(){
	   	timestamp++;
	   	console.log(timestamp);
	   },1000);
	   document.addEventListener('keyup',function(event){
	   	if ((event.keyCode==13) || (event.keyCode==32) || (event.keyCode==40)|| (event.keyCode==34)|| (event.keyCode==39)){
	   		event.preventDefault();
	   		timingMap.set(timestamp,"next");
	   	}else if ((event.keyCode==38) || (event.keyCode==33)  || (event.keyCode==37)) {
	   		timingMap.set(timestamp,"prev");
	   	}else if (event.keyCode==27){
	   		timingMap.set(timestamp,"jump");
	   	}
	   	log(timingMap);
	   });
	}).catch(e=> {
	console.log("Aucun micro détecté");
	    	info.innerHTML="Aucun micro détecté";
	    	});
}

function stopRecording(){
	let info = document.getElementById("infoRecord");
	recorder.stop();
	clearInterval(recordInterval);
	stream.getAudioTracks()[0].stop();
		info.innerText="Stopped";
	
}

function createDownloadLink(blob,map) {
	
	let url = URL.createObjectURL(blob);
	let audiolink = document.createElement('a');
	let jsonlink = document.createElement('a');

	audiolink.href = url;
	audiolink.download = "audio_"+new Date().toISOString() + '.'+extension;
	audiolink.innerHTML = "Audio File : "+"<span style='color:red'>"+audiolink.download+"</span>";
	audiolink.style.color='white';
	audiolink.style.textDecoration="none";
	audiolink.style.padding="0 10 0 10";

	//source https://www.xul.fr/ecmascript/map-et-objet.php
	function mapToObjectRec(m) {
    let lo = {}
    for(let[k,v] of m) {
        if(v instanceof Map) {
            lo[k] = mapToObjectRec(v)
        }
        else {
            lo[k] = v
        }
    }
    return lo
}
	map=mapToObjectRec(map);

	jsonlink.href = "data:text/json;charset=utf-8," + JSON.stringify(map);
	jsonlink.download = "actionRecord_"+new Date().toISOString()+".json";
	jsonlink.innerHTML = "Action File : "+"<span style='color:red'>"+jsonlink.download+"</span>";
	jsonlink.style.color='white';
	jsonlink.style.textDecoration="none";
	jsonlink.style.padding="0 10 0 10";

	timingMap.clear();

	document.getElementById("infoRecord").appendChild(audiolink);
	document.getElementById("infoRecord").appendChild(jsonlink);
}

function createRecordBar(){

	let div = document.createElement("div");
	div.style.position='fixed';
	div.style.bottom="0";
	div.style.left="0";
	div.style.backgroundColor="#23272A";
	div.style.height="50px";
	div.style.width="100vw";
	div.style.color="white";
	div.style.display="flex";

	let span = document.createElement("span")
	span.style.width="6rem";
	span.style.position='relative';
	span.style.top="0";
	span.style.display="block";
	span.style.padding="0 10 0 5";

	let chooseURLspan = document.createElement("span")
	chooseURLspan.style.position='relative';
	chooseURLspan.style.top="0";
	chooseURLspan.style.display="none";
	chooseURLspan.style.padding="0 10 0 5";

	let typeChooserSpan = document.createElement("span")
	typeChooserSpan.style.width="5rem";
	typeChooserSpan.style.position='relative';
	typeChooserSpan.style.top="0";
	typeChooserSpan.style.display="none";
	typeChooserSpan.style.padding="0 15 0 15";

	let chooseFileText = document.createElement("p");
	chooseFileText.innerText="File";
	chooseFileText.style.float="left";
	chooseFileText.style.color="red";
	chooseFileText.addEventListener('click',function(){
			fileChooseSpan.style.display="flex";
			chooseURLspan.style.display="none";
			chooseURLText.style.color="white";
			chooseFileText.style.color="red";
	});
	let chooseURLText = document.createElement("p");
	chooseURLText.innerText="URL";
	chooseURLText.style.float="right";
		chooseURLText.addEventListener("click",function(){
		chooseFileText.style.color="white";
		chooseURLText.style.color="red";
		chooseURLspan.style.display="block";
		fileChooseSpan.style.display="none";
	})
	typeChooserSpan.appendChild(chooseFileText)
	typeChooserSpan.appendChild(chooseURLText)

	let URLform= document.createElement("form")
	URLform.addEventListener("submit",function(e){
		e.preventDefault();
			let newURL=window.location.href+"?audio="+inputAudioURL.value+"?action="+inputActionURL.value;
		window.history.pushState(null, null, newURL);
		//initPlay(audioFile,jsonFile);
		
	})
	let inputAudioURL = document.createElement("input");
	inputAudioURL.type="text"
	inputAudioURL.required=true;
	inputAudioURL.placeholder="Enter Audio File URL (.webm)"
	inputAudioURL.style.padding="10 0 10 0"

	let inputActionURL = document.createElement("input");
	inputActionURL.type="text"
	inputActionURL.required=true;
	inputActionURL.placeholder="Enter Action File URL (.json)"
	inputActionURL.style.padding="10 0 10 0"

	let submitURLfile = document.createElement("input");
	submitURLfile.type="submit";

	URLform.appendChild(inputAudioURL)
	URLform.appendChild(inputActionURL)
	URLform.appendChild(submitURLfile)
	chooseURLspan.appendChild(URLform);

	let recordText = document.createElement("p");
	recordText.innerText="Record";
	recordText.style.float="left";
	recordText.style.color="red";
	recordText.addEventListener('click',function(){
			fileChooseSpan.style.display="none";
			recordSpan.style.display="flex";
			playText.style.color="white";
			recordText.style.color="red";
	});

	let playText = document.createElement("p");
	playText.innerText="Play";
	playText.style.float="right";
		playText.addEventListener("click",function(){
		recordText.style.color="white";
		playText.style.color="red";
		fileChooseSpan.style.display="flex";
		typeChooserSpan.style.display="block";
		recordSpan.style.display="none";
	})
	span.appendChild(recordText)
	span.appendChild(playText)

	//RECORD
	let recordSpan = document.createElement("span");
	recordSpan.style.display="flex";
	recordSpan.id="spanRecord";
	recordSpan.style.position="relative";

	let pause = document.createElement("p");
	pause.innerHTML="&#9612;&#9612;";
	pause.style.color="red";
	pause.style.padding="0 5 0 5";

	let stop = document.createElement("p");
	stop.innerHTML="&#9724;";
	stop.style.color="red";
	stop.style.padding="0 5 0 5";

	stop.addEventListener('click',stopRecording);
	stop.addEventListener('mouseover',function(){
		stop.style.color="#d63031";
	});
	stop.addEventListener('mouseleave',function(){
		stop.style.color="red";
	});

	let record = document.createElement("p");
	record.innerHTML="&#x2B24;";
	record.style.color="red";
	record.style.padding="0 5 0 5";
	record.addEventListener('mouseover',function(){
		record.style.color="#d63031";
	});
	record.addEventListener('mouseleave',function(){
		record.style.color="red";
	});
	record.addEventListener('click',startRecord);

	let info = document.createElement("p");
	info.id="infoRecord";
	info.style.padding="0 5 0 5";

	//PLAY
	let fileChooseSpan = document.createElement("span");
	fileChooseSpan.style.display="none";
	fileChooseSpan.id="spanPlay"
	fileChooseSpan.style.position="relative";

	let audioFile;
	let jsonFile;

	let form = document.createElement("form");
	form.addEventListener("submit",function(e){
		e.preventDefault();
		initPlay(audioFile,jsonFile);
		
	})
	let submit = document.createElement("input");
	submit.type="submit";
	

	let audioFileButton = document.createElement("input");
	audioFileButton.type ="file";
	audioFileButton.id="audioFile"
	audioFileButton.accept=".webm"
	audioFileButton.required=true;
	audioFileButton.style.padding="10 0 10 0";
	audioFileButton.onchange= function(e){
		audioFile=e.target.files[0];
	}
	
	let jsonFileButton = document.createElement("input");
	jsonFileButton.type ="file";
	jsonFileButton.id="jsonFile";
	jsonFileButton.required=true;
	jsonFileButton.accept=".json"
	jsonFileButton.style.padding="10 0 10 0";

	jsonFileButton.onchange= function(e){
		jsonFile=e.target.files[0];
	}

	form.appendChild(audioFileButton);
	form.appendChild(jsonFileButton);
	form.appendChild(submit)
	fileChooseSpan.appendChild(form);

	recordSpan.appendChild(record)
	recordSpan.appendChild(pause);
	recordSpan.appendChild(stop);
	recordSpan.appendChild(info);
	div.appendChild(span)
	div.appendChild(typeChooserSpan)
	div.appendChild(recordSpan);
	div.appendChild(fileChooseSpan);
	div.appendChild(chooseURLspan);
	document.body.appendChild(div)

}