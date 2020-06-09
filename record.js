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
let timingArray = new Map();
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
	          createDownloadLink(blob)
	      	}
	    };
	    recorder.onerror = function(e){
	    	
	    }
	    recorder.start();
	    info.innerHTML="Recording";

	   //autre
	   recordInterval= setInterval(function(){
	   	timestamp++;
	   	console.log(timestamp);
	   },1000);
	   document.addEventListener('keyup',function(){
	   	timingArray.set(timestamp,fragList[time]);
	   	log(timingArray);
	   });
	}).catch(e=> {
	console.log("Aucun micro détecté");
	    	info.innerHTML="Aucun micro détecté";
	    	});
}

function stopRecord(){
	let info = document.getElementById("infoRecord");
	recorder.stop();
	clearInterval(recordInterval);
	stream.getAudioTracks()[0].stop();
	info.innerHTML="Stopped";
}

function createDownloadLink(blob) {
	
	let url = URL.createObjectURL(blob);
	let au = document.createElement('audio');
	let li = document.createElement('li');
	let link = document.createElement('a');

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//link the a element to the blob
	link.href = url;
	link.download = new Date().toISOString() + '.'+extension;
	link.innerHTML = link.download;

	//add the new audio and a elements to the li element
	li.appendChild(au);
	li.appendChild(link);

	//add the li element to the ordered list
	recordingsList.appendChild(li);
}

function createRecordButton(){
	let div = document.createElement("div");
	div.style.position='fixed';
	div.style.bottom="0";
	div.style.left="0";
	div.style.backgroundColor="#23272A";
	div.style.height="50px";
	div.style.width="100vw";
	div.style.display="flex";
	div.style.color="white";
	let pause = document.createElement("p");
	pause.innerHTML="&#9612;&#9612;";
	pause.style.color="red";
	pause.style.padding="0 5 0 5";

	let stop = document.createElement("p");
	stop.innerHTML="&#9724;";
	stop.style.color="red";
	stop.style.padding="0 5 0 5";

	stop.addEventListener('click',stopRecord);
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

	div.appendChild(record);
	div.appendChild(pause);
	div.appendChild(stop);
	div.appendChild(info);
	document.body.appendChild(div)
}