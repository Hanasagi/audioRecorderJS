let recordButton = document.getElementById("Record");
recordButton.addEventListener("click",start);

let stopButton =document.getElementById("Stop");
stopButton.addEventListener("click",stop);

let chunks = [];
let extension;
let recorder;
let stream;

if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')){
	extension="webm";
}else{
	extension="ogg"
}

function start(){
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
	    	console.log(e.error);
	    }
	    recorder.start();
	});
}

function stop(){
recorder.stop();

	stream.getAudioTracks()[0].stop();
}

function createDownloadLink(blob) {
	
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

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
