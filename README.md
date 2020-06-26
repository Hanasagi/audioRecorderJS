# transitionJS

First things first, 
<h1>What is it?</h1>

It is a script is based on <a href="https://math.unice.fr/~pantz/Geek/transition.html">**transition.js**</a>, used to create 
*powerpoint* presentation but with **HTML/CSS**. It is an extension of 
this one.
It can help you record a full presentation without any need of recording software, and let you add audio recording to your presentation, if you
do not wish to record everything.

<h1>How to use it ?</h1>
<h2>Setup :</h2>

First, you need to download it. You can get it here. Then, create an HTML file and setup everything needed (You also need to read documentation from transition.js). Once it's done, add this to the **head** of your file:

```HTML
<script type="text/javascript" src="jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="lecture.js"></script>
<script type="text/javascript" src="record.js"></script>
```

First script is the **jQuery** library, second is script to add the **reading** functionality, third is to add the **record** functionnality

Then, at the end of the **body** tag, add this: 
```JS
document.addEventListener("DOMContentLoaded",function(){
		createRecordBar();
})
```
If you have followed how to use transition.js, then you'd have both initFrag() and createRecordBar() in this event listener, like so:
```JS
document.addEventListener("DOMContentLoaded",function(){
		initFrag();
		createRecordBar();
})
```

<h2>Step by Step Guide:</h2>

---

<h4>How to use record & read functions<h4>

Now that everything is setup, load your page and at the bottom of it, you'll see an arrow, click on it and you'll see something like this:
<br><img src="https://puu.sh/FZcXZ/6709150e46.png"/>
<br>
In this bottom bar, you have two tabs, first is the recording one, with the classical record button, which are (in order): **Start**, **Pause/
Resume** and **Stop**
Once you hit the start button, it'll ask permission to use your microphone, once accorded it'll start both recording what you're saying and
every action (related to the one usable by transition.js) you make. When you're finished, hit the stops button and you will be given two files
to download: <br>
<img src="https://puu.sh/FZd88/b701fc6e84.png"/>
You can rename them if you want, just don't loose them, lol.

Now that you have everything you want, go to the other tabs by clicking on **Play** and let's break down what you have access to. The bar
is now this one: <br/>
<img src="https://puu.sh/FZdeq/9c9099c06d.png"/><br/>
You have, again, two choices to load the files you need to play your record: 
<br/>One using the files you just downloaded, by uploading them here.
The first upload input is for the audio file, which is a webm file, the second is for the "action" file, which is a json file.<br/>
<img src="https://puu.sh/FZdnZ/7d85d012b0.png"/><br/>
The other use URL to load the files. Be aware that the JSON needs to be uploaded somewhere to work. You can use JSON bin website (like this 
<a href="https://extendsclass.com/json-storage.html">one</a>), the audio files can be uploaded or put in the same directory as your HTML file.

Once everything is in place, you can click on the submit button, and new things will be added to your bar : <br>
<img src="https://puu.sh/FZdFH/1f574acea9.png"/><br> You have, once again, the classical button, **Start**, **Pause/
Resume** and **Stop**, you can either click on them or use **P** to play, **Q** to pause/resume and **S** to stop.<br>
The sliding bar helps to keep track on the time, and you can also go back to another time if you didn't understand something in the record.

---

<h4>How to use timer functions & add audio reader<h4>

If you do not wish to record everything, there is a way to add your own audio files (And add transition.js functions too) without making it yourself (not entirely).
You will also be able to add timer to your HTML elements.

In order to do so, you need to add this in your HTML file: 

```JS
document.addEventListener("DOMContentLoaded",function(){
		getTimer(document);
	})	
```

You can add the getTimer(document) function in the same event listener as before.

Once this is done, you can now add timer to your HTML element, like this: 

```HTML
<div id="test" class="hidden" timer="6" fragments="{hidden} 1s"></div>
```

You can combine this with the transition script so that your element will appear add the end of the X seconds you entered in the timer attribute.
If you wish to add an audio reader, you can call this function:
```JS
<script type="text/javascript">createAudioReader(idParent, class, filePath, timer, fragments)</script>
```

Replace each attribute in the bracket to suits your need, you can do this for example.
```JS
<script type="text/javascript">createAudioReader("test", "hidden", "./test.webm", "6", "{hidden} 1s")</script>
```

<h1>Want to learn more about it ?</h1>

If you do wish to learn about how my script work, then I will explain some stuff that my it do.
Be aware that the code I will show is not the entirety of it, I will only use some patch of it.

<h4>How do you record the audio ?</h4>

The audio recording use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder">MediaRecorder</a> API.
Here's the code:
```JS
if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
  extension = "webm";
} else {
  extension = "ogg"
}

function startRecord() {
  //audio
  let timestamp = 0;
  let info = document.getElementById("infoRecord");
  navigator.mediaDevices.getUserMedia({
    audio: true
  }).then(function(tmpStream) {
    stream = tmpStream;
    let options = {
      audioBitsPerSecond: 256000,
      videoBitsPerSecond: 2500000,
      bitsPerSecond: 2628000,
      mimeType: 'audio/' + extension + ';codecs=opus'
    }
    recorder = new MediaRecorder(stream, options);
    recorder.ondataavailable = function(e) {
      chunks.push(e.data);
      if (recorder.state == 'inactive') {
        const blob = new Blob(chunks, {
          type: 'audio/' + extension,
          bitsPerSecond: 128000
        });
        createDownloadLink(blob, timingMap)
      }
    };
    recorder.onerror = function(e) {
      console.log(e);
    }
    recorder.start();
    info.innerHTML = "Recording";
  }).catch(e => {
    console.log("Aucun micro détecté");
    info.innerHTML = "Aucun micro détecté";
  });
}
```

The first "if" is important because it checks whether your browser supports .webm or .ogg.
The line ```navigator.mediaDevices.getUserMedia({audio: true})``` will decide which media types you want use. Here it's "audio" so it will use the microphone. For privacy reason, it will ask you the permissions to use it.
<br/>The ``` recorder.ondataavailable``` is the function that will be called once you hit the stop button; here, once the recording is finished, it will create a Blob object, that will next be used to create the file you need to download, with the extension your browser support.

<h4>How do you record each action ?</h4>

To record the action a user can make, I use the time function given by JavaScript, setInterval(). Here's the code: 
```JS
recordInterval = setInterval(function() {
      timestamp++;
      console.log(timestamp);
    }, 1000);
    document.addEventListener('keyup', function(event) {
      if ((event.keyCode == 13) || (event.keyCode == 32) || (event.keyCode == 40) || (event.keyCode == 34) || (event.keyCode == 39)) {
        event.preventDefault();
        timingMap.set(timestamp, "next");
      } else if ((event.keyCode == 38) || (event.keyCode == 33) || (event.keyCode == 37)) {
        timingMap.set(timestamp, "prev");
      } else if (event.keyCode == 27) {
        timingMap.set(timestamp, "jump");
      }
    });
```

The setInterval() is a function is called every X millisecond. 
To store the action and the time, I use JavaScript Map which is "structured" like this (_roughly_) {keys:"",value:""}. Each row have a key, which here is the time, and value, here, the action a user make.

The ```document.addEventListener``` will check if the user click on the right keys, managed by the if that check the keyCode (you can check keyCode of every key <a href="https://keycode.info/">here</a>) and once the user hit one the key managed by the listener, it will store the action corresponding to the key in the map.

<h4>How do you create the download link ?</h4>

For the audio file, it's rather easy: 
```JS
let url = URL.createObjectURL(blob);
let audiolink = document.createElement('a');

audiolink.href = url;
audiolink.download = "audio_" + new Date().toISOString() + '.' + extension;
audiolink.innerHTML = "Audio File : " + "<span style='color:red'>" + audiolink.download + "</span>";
audiolink.style.color = 'white';
audiolink.style.textDecoration = "none";
audiolink.style.padding = "0 10 0 10";
```

First we use ```URL.createObjectURL(blob)``` to transform the Bob in a URL that can be used on the ```a```  element, then we set the download name and the href to the url created just before. You can add whatever the hell you want to the text (innerHTML) of the element, just don't forget the add the ```.download``` element, like I did (not necessarily in a span tag).

For the action file, it's a little bit more complicated: 
```JS
let jsonlink = document.createElement('a');

function mapToObjectRec(m) {
    let lo = {}
    for (let [k, v] of m) {
      if (v instanceof Map) {
        lo[k] = mapToObjectRec(v)
      } else {
        lo[k] = v
      }
    }

    return lo
  }
map = mapToObjectRec(map);

jsonlink.href = "data:text/json;charset=utf-8," + JSON.stringify(map);
jsonlink.download = "actionRecord_" + new Date().toISOString() + ".json";
jsonlink.innerHTML = "Action File : " + "<span style='color:red'>" + jsonlink.download + "</span>";
jsonlink.style.color = 'white';
jsonlink.style.textDecoration = "none";
jsonlink.style.padding = "0 10 0 10";
```

The first need we need to do is to transform the Map object, because it isn't managed by JSON. The closest thing to a Map is a List, so the function ```mapToObjectRec(m)``` break down the Map and build a List. This function is not made by myself, I took from <a href="https://www.xul.fr/ecmascript/map-et-objet.php">here</a>.
Once that is done, we do the same things as the audio, except we use JSON.stringify() on the list to convert it to a JSON string.

<h4>And finally, how do you load the files ?</h4>

If the file is loaded from the computer, then I use once again the URL.createObjectURL() on the audio File object to add the link as the source of an audio tag. Something like this: 
```JS

audio = URL.createObjectURL(audio);

let audioPlayer = document.createElement("audio")
audioPlayer.style.visibility = "hidden";
audioPlayer.controls = "controls";
audioPlayer.src = audio;
```

As for the action file, I use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader">FileReader</a> API.

```JS
 reader.addEventListener('load', function(e) {
    actionMap = JSON.parse(e.target.result);

    actionMap = objectToMap(actionMap)
    createButton();
  });
  if (typeof action == "string" && typeof audio == "string") {
    let stringJSON = $.getJSON(action, function(data) {
      action = data;
    });
    $.when(stringJSON).done(function() {
      actionMap = objectToMap(action)
      createButton();
    })
reader.readAsBinaryString(action);
```

I use the API to the read the file and transpose the content in a string.Then, i call JSON.parse() so it can be transformed in a List once again. But for my need, I need to transform it again in a Map, so I used a function taken from <a href="https://www.xul.fr/ecmascript/map-et-objet.php">here</a>

However, if the files are loaded by a URL, the action file cannot be read by the FileReader API. So i used a jQuery function that can read file asynchronously, if the URL isn't a local one (if it is, it will fail to read the file), and then transpose once again the content in a Map.

```JS
 let stringJSON = $.getJSON(action, function(data) {
      action = data;
    });
    $.when(stringJSON).done(function() {
      actionMap = objectToMap(action)
      createButton();
    })
```

<h1>Credits</h1>

This project was a part of a school project to replace end-of-study internship in the <a href="http://unice.fr/en">University of Nice-Sophia</a>.
<br>It is licensed under the <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.
