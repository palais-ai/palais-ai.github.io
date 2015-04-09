---
layout: page
title: Creating a New Project
permalink: /tutorials/creating-a-new-project/
category: tutorial
tag: 2
---

<div class="creating-a-new-project">
	<p>
		The easiest way to set up a new project in PALAIS is to use the <em>"New project"</em> dialog. You can access the <em>"New project"</em> dialog through the menu bar or by pressing [CTRL] + [N] on Windows or [CMD] + [N] on Mac.
	</p>

	<h2>The New Project Dialog</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				The new project dialog enables you to let PALAIS create the base structure of your project. Simply enter the desired project name, the name of the main JavaScript logic file and a directory in which to place the project. Upon creation PALAIS will create a folder in this directory containing a file named <em>"project.js"</em> that contains the meta data for your project and your project's main logic file. 
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/newproject.png" | prepend: site.baseurl }}"/>
		</div>
	</div>

	<h2>The Project File</h2>
				{% highlight javascript linenos %}
{
  "name" : "my_scene",
  "scene" : "resources/my_scene.scene",
  "resources" : ["resources/scene_characters", 
                 "resources/scene_villains"],
  "logic"  : "main.js"
}
				{% endhighlight %}

	<p>
		A project file is simply a JSON object with special keys describing the meta data of your project. The following list explains the purpose of each of the available properties.
		<ul>
			<li><strong>name:</strong> The name of your project.</li>
			<li><strong>scene:</strong> A relative path to the scene file you wish to load at startup. Currently only OGRE's <em>.scene</em> files can be loaded. PALAIS can only load a single scene in a project.</li>
			<li><strong>resources:</strong> A list of relative resource directories to load at startup. Currently only resources in OGRE's <em>.mesh</em> format can be loaded. Any 3D models you wish to dynamically instantiate (eg. through javascript code) have to reside in one of these directories or the <em>.scene</em> file's directory.</li>
			<li><strong>logic:</strong> The main JavaScript logic file to load at startup.</li>
		</ul>
	</p>

	<h2>The Main Logic File</h2>
				{% highlight javascript linenos %}
function onSetup() {
}

function onTeardown() {
}

function update(deltaTime) {
}
				{% endhighlight %}
	<p>
		The main logic file is your projects entry point. It contains 3 important functions that PALAIS automatically calls at the appropiate times. Note that for PALAIS to be able to call these functions they must exactly match these names. Any code that is placed in the global scope will be evaluated at load time.
		<ul>
			<li><strong>onSetup():</strong> Called before the first time <em>update</em> is invoked.</li>
			<li><strong>onTeardown():</strong> Called when a project is closed.</li>
			<li><strong>update(deltaTime):</strong> Called periodically by the simulation environment. Note that for the sake of reproducibility <em>deltaTime</em> is actually a fixed time interval. The simulation is sped up or slowed down by emitting fewer of these events per actual time passed.</li>
		</ul>
	</p>

	<h2>Loading Your Project</h2>
	<p>
		To load your project bring up the <em>"Open Project"</em> file dialog by clicking the corresponding button in the menu bar or pressing down [CTRL] + [O] on Windows or [CMD] + [O] on Mac. Next, select your project's meta data file (<em>"project.js"</em> in the example above) from your hard drive. PALAIS will automatically load the project according to the configuration given in the meta data file.
	</p>
</div>
