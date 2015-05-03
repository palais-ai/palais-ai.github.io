---
layout: page
title: Creating and Importing Assets
permalink: /tutorials/creating-and-importing-assets/
category: tutorial
tag: 3
---

<div class="creating-and-importing-assets">
	<p>
		PALAIS works independently of any asset creation workflow you wish to employ. Thus you can use your favorite 3D modeling tool to create 3D models and scenes that can be imported in PALAIS. Examples of such 3D modeling tools are <a href="http://www.blender.org/">blender</a>, <a href="http://www.autodesk.de/products/3ds-max/overview">3ds Max</a> and <a href="http://www.autodesk.de/products/maya/overview">Maya</a>.
	</p>
	<h2>Importing Assets in PALAIS</h2>
	<p>
		To be able to use your models in PALAIS you have to export them to the <a href="http://www.ogre3d.org/tikiwiki/DotScene">OGRE .mesh / .scene</a> format. There are various exporters for many different modeling tools available. A list of available exporters can be found <a href="http://www.ogre3d.org/tikiwiki/OGRE+Exporters">in the OGRE wiki</a>. 
	</p>
	<p>
		Note that your modelling environment doesn't need to directly support exporting to the .scene format. Since most 3D modeling tools support exporting to standardized formats you can simply export to a common format and then use one of the modeling tools for which an OGRE exporter exists. You can employ the same workflow to convert any existing 3D models you wish to use to the .mesh / .scene format.
	</p>
	<p>
		PALAIS will automatically import the assets you named in your project's meta data file in the <em>resources</em> and <em>scene</em> properties. You can find out more about the meta data file and projects in general in the tutorial <a href="{{ "/tutorials/creating-a-new-project/" | prepend: site.baseurl }}">Creating a New Project</a>.
	</p>
	<p>
		In this tutorial we will be using <a href="http://www.blender.org/">blender</a> and the <a href="https://bitbucket.org/MindCalamity/blender2ogre">OGRE exporter</a> to import a cube model in a PALAIS project. You can download the project used in this tutorial here: <a href="{{ "/resources/cube_scene.zip" | prepend: site.baseurl }}">The cube_scene project</a>.
	</p>

	<h2>STEP 1: Create Your Model</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				For demonstration purposes we create a simple cube object in blender. As stated above the workflow here is independent of PALAIS.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/blendermodel.png" | prepend: site.baseurl }}"/>
		</div>
	</div>


	<h2>STEP 2: Export Your Model</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				Next we invoke the OGRE exporter via the <em>File > Export > Ogre3D (.scene and .mesh)</em> menu. Choose appropiate export options for your model and the file path to which you wish to export your mesh / scene. We chose to export our cube to a folder named <em>cube_model</em> in the same directory in which our project <em>my_scene</em> is located. The exporter then exports the <em>Cube.mesh</em> file corresponding to our cube model to the specified folder.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/blenderexport.png" | prepend: site.baseurl }}"/>
		</div>
	</div>

	<h2>STEP 3: Add Your Model to the Meta Data File</h2>
				{% highlight javascript linenos %}
{
  "name" : "my_scene",
  "scene" : "",
  "resources" : ["../cube_model"],
  "logic"  : "main.js"
}
				{% endhighlight %}
	<p>
		We have to tell PALAIS where to find the .mesh file to have our cube loaded into its environment. To do so we specify the folder to which we exported the cube model in the <em>resources</em> property in our project's meta data file. Note that the directories listed here are evaluated relative to the project meta data file, hence the <em>../</em> prefix. If you exported a whole scene you have to enter the location of your .scene file in the <em>scene</em> property.
	</p>

	<h2>STEP 4: Using Your Model</h2>
				{% highlight javascript linenos %}
function onSetup() {
  Scene.instantiate("myCube", "Cube", new Vector3(0,0,0));
}

function onTeardown() {
}

function update(deltaTime) {
}
				{% endhighlight %}
	<p>
		Call <em>Scene.instantiate()</em> in your logic file to dynamically instantiate our cube as a scriptable actor. The first parameter to <em>Scene.instantiate()</em> is the actor's name, the second parameter is the name of our mesh file and the third parameter sets the initial position of the actor. If you exported a whole scene you don't have to do anything on the scripting side. PALAIS will automatically load your scene and all actors in it will be instantiated for you.
	</p>
	<div class="row">
		<div class="col-md-6">
			<p>
				With the changes made we can now start up PALAIS. After pressing the play button to start the simulation we can view our cube model in all of its beauty. 
			</p>
			<p>
				If you wish to have your model already loaded before starting the simulation you can call <em>Scene.instantiate()</em> in the global scope of your logic file.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/cubescene.png" | prepend: site.baseurl }}"/>
		</div>
	</div>
</div>
