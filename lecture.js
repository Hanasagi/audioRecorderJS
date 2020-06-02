
function readAudio(id,filePath){
	let reader = document.createElement("audio");
	reader.src=filePath;
	reader.controls="controls";
	let idElement = document.getElementById(id);
	idElement.appendChild(reader);
}