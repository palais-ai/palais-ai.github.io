---
layout: page
title: T-01 The User Interface
permalink: /tutorials/the-user-interface/
category: tutorial
tag: 1
---

<div class="the-user-interface">	
	<h2>Learning Goal</h2>
	<p>
		The goal of this tutorial is to provide an overview of the (runtime) features of PALAIS and how they can be accessed via the GUI.
	</p>

	<h2>Structure</h2>
	<p>
		The GUI of PALAIS is separated in four distinct areas: The <a href="#scene">Scene View</a>, the <a href="#overview">Scene Overview</a>, the <a href="#console">Console</a> and the <a href="#knowledge">Knowledge Inspector</a>. There are hotkeys to quickly access most of the GUI actions. The hotkeys are displayed next to the corresponding entry in the menu bar of PALAIS.
	</p>

	<h2 id="scene">Scene View</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				The Scene View is the actual 3D rendering of your scenario. An actor can be selected by clicking it with the left mouse button. The <i class="fa fa-video-camera"></i> - Button can be used to focus a selected actor. You can orbit the camera around the currently focussed actor by clicking and dragging with your left mouse button. Clicking and dragging with the right mouse button zooms towards / away from the currently focussed actor. Additionally you can control the execution of the simulation by using the control buttons at the bottom of the Scene View. The <i class="fa fa-play"></i> / <i class="fa fa-pause"></i> - Buttons can be used to play / pause the simulation. The slider can be used to adjust the simulation speed and the <i class="fa fa-expand"></i> - Button toggles the fullscreen mode.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/scene.jpg" | prepend: site.baseurl }}"/>
		</div>
	</div>


	<h2 id="overview">Scene Overview</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				The Scene Overview displays the name of the currently active project and lists all active actors in the simulation. You can select actors by clicking the corresponding entry in the list. Furthermore, actors can be hidden / shown by clicking the <i class="fa fa-eye"></i> / <i class="fa fa-eye-slash"></i> - Button next to the actor's list entry.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/overview.jpg" | prepend: site.baseurl }}"/>
		</div>
	</div>


	<h2 id="console">Console</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				The Console displays the textual output of the simulation environment. You can output text to the Console by using <code>print</code> in your JavaScript code. Additionally, warnings and errors generated by the simulation environment are displayed in the Console. They are marked with <i class="fa fa-warning" style="color: yellow"></i> and <i class="fa fa-warning" style="color: red"></i> symbols, respectively. The <i class="fa fa-info-circle"></i> symbol is the default symbol and marks informational output. You can clear the console by clicking the <i class="fa fa-trash"></i> - Button. The current rendering's frames per second (fps) and total execution time in simulation time are displayed on the right side of the Console header area.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/console.jpg" | prepend: site.baseurl }}"/>
		</div>
	</div>


	<h2 id="knowledge">Knowledge Inspector</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				The Knowledge Inspector shows the knowledge of the currently selected actor. The knowledge of an actor is represented in form of a <a href="http://en.wikipedia.org/wiki/Blackboard_system">blackboard</a>. If no actor is selected the global knowledge of the scene is shown. Each knowledge entry shows its name, its type (if it can be determined) and its current value. The Knowledge inspector is updated live during simulations.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/knowledgeinspector.jpg" | prepend: site.baseurl }}"/>
		</div>
	</div>
</div>
