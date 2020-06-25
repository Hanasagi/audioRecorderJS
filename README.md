# transitionJS

First things first, 
<h1>What is it?</h1>

It is a scripts is based on <a href="https://math.unice.fr/~pantz/Geek/transition.html">**transition.js**</a>, used to create 
*powerpoint* presentation but with **HTML/CSS**. It is an extension of 
this one.
It can help you record a full presentation without any need of recording software, and let you add audio recording to your presentation,if you
do not wish to record everything.

<h1>How to use it ?</h1>
<h2>Setup :</h2>

First, you need to download it, you can get it <a href="https://github.com/Hanasagi/transitionJS/archive/Quentin.zip">here</a>. 
Then, create an HTML file and setup everything needed (you need also need to read documentation from
transition.js). once it's done, add 
this to the **head** of your file:
```HTML
<script type="text/javascript" src="jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="lecture.js"></script>
<script type="text/javascript" src="record.js"></script>
```
First script is the **jQuery** library, second is script to add the **reading** functionnality, third is to add the **record** functionnality

Then, at the end of the **body** tag, add this : 
```JS
document.addEventListener("DOMContentLoaded",function(){
		createRecordBar();
})
```
If you have followed how to use transition.js, then you'd have both initFrag() and createRecordBar() in this event listener, like so :
```JS
document.addEventListener("DOMContentLoaded",function(){
		initFrag();
		createRecordBar();
})
```

<h2>Step by Step Guide:</h2>

Now that everything is setup, load your page and at the bottom of it, you'll see an arrow, click on it and you'll see something like this :
<br><img src="https://puu.sh/FZcXZ/6709150e46.png"/>
<br>
In this bottom bar, you have two tabs, first is the recording one, with the classical record button, which are (in order): **Start**, **Pause/
Resume** and **Stop**
Once you hit the start button, it'll ask permission to use your microphone, once accorded it'll start both recording what you're saying and
every action (related to the one usable by transition.js) you make. When you're finished, hit the stops button and you will be given two files
to download : <br>
<img src="https://puu.sh/FZd88/b701fc6e84.png"/>
You can rename them if you want, just don't loose them, lol.

Now that you have everything you want, go to the other tabs by clicking on **Play** and let's break down what you have access to. The bar
is now this one : <br/>
<img src="https://puu.sh/FZdeq/9c9099c06d.png"/><br/>
You have, again, two choices to load the files you need to play your record : 
<br/>One using the files you just downloaded, by uploading them here.
The first upload input is for the audio file, which is a webm file, the second is for the "action" file, which is a json file.<br/>
<img src="https://puu.sh/FZdnZ/7d85d012b0.png"/><br/>
The other use URL to load the files. Be aware that the JSON needs to be uploaded somewhere to work. You can use JSON bin website (like this 
<a href="https://extendsclass.com/json-storage.html">one</a>), the audio files can be uploaded or put in the same directory as your HTML file.

Once everything is in place, you can click on the submit button, and new things will be added to your bar : <br>
<img src="https://puu.sh/FZdFH/1f574acea9.png"/><br> You have, once again, the classical button, **Start**, **Pause/
Resume** and **Stop**, you can either click on them or use **P** to play, **Q** to pause/resume and **S** to stop.<br>
The sliding bar helps to keep track on the time, and you can also go back to another time if you didn't understand something in the record.
If you do not wish to record everything, there is a way to add your own audio files (and add transition.js functions too) without making it yourself (not entirely).
You will also be able to add timer to your html elements.

In order to do so, you need to add this in your html file : 

```JS
document.addEventListener("DOMContentLoaded",function(){
		getTimer(document);
	})	
```

You can add the getTimer(document) function in the same event listener as before.

Once this is done, you can now add timer to your html element, like this : 

```HTML
<div id="test" class="hidden" timer="6" fragments="{hidden} 1s"></div>
```

You can combine this with the transition script so that your element will appear add the end of the X seconds you entered in the timer attribute.
If you wish to add an audio reader, you can call this function :
```JS
<script type="text/javascript">createAudioReader(idParent, class, filePath, timer, fragments)</script>
```

Replace each attribute in the bracket to suits your need, you can do this for example
```JS
<script type="text/javascript">createAudioReader("test", "hidden", "./test.webm", "6", "{hidden} 1s")</script>
```


This project is licensed under the <a href="https://opensource.org/licenses/mit-license.php">MIT License</a>.
