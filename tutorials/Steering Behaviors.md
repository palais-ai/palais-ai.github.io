---
layout: page
title: T-04 Implementing and Visualizing Steering Behaviors
permalink: /tutorials/implementing-steering-behaviors/
category: tutorial
tag: 4
---

<div class="implementing-steering-behaviors">
	<p>
		The sandbox scenario for this tutorial be downloaded here: <a href="{{ "/resources/steering_playground.zip" | prepend: site.baseurl }}">The steering_playground project</a>.
	</p>
	<h2>Learning Goal</h2>
	<p>
	 	The goal of this tutorial is to get familiar with the scripting API of PALAIS within a pre-made movement playground. In particular, we will be covering the Vector API and actor movement. Finally, we will discuss how we realised this steering playground environment within PALAIS using just 67 lines of code.
	</p>
	<h2>The Scene Logic</h2>
	<div class="row">
		<div class="col-md-6">
			<p>
				The scene itself depicts an empty playing field. Once you run the scene two actors will be spawned: A red and a green one. The green one will indefinitely move in between two set points on the playing field. The red one will do nothing but turn towards the green actor - for now.
			</p>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/playground.png" | prepend: site.baseurl }}"/>
		</div>
	</div>
	<p style="margin: 18px 0;">
		You will find the following code in the file <strong>movement.js</strong> within the project directory:
	</p>
					{% highlight javascript linenos %}
function seek(agent, targetPosition, maxSpeed) {
	return targetPosition.subtract(agent.position)
	                     .normalize()
	                     .multiply(maxSpeed);
}

function flee(agent, targetPosition, maxSpeed) {
	return targetPosition.subtract(agent.position)
	                     .normalize()
	                     .multiply(-maxSpeed);
}

function movementBehavior(agent, targetPosition, maxSpeed) {
	//return seek(agent, targetPosition, maxSpeed);
	//return flee(agent, targetPosition, maxSpeed);
	return new Vector3(0,0,0);
}
				{% endhighlight %}
	<p>
		The code represents two different movement behaviors: seek and flee. The seeking behavior will cause the red agent to home in on the moving green agent. The flee behavior will cause the red agent to run away from the green agent. 
	</p>
	<p>
		The inputs to each of these behaviors is the <strong>agent</strong> being moved, the position of the green agent in <strong>targetPosition</strong> and the maximum velocity <strong>maxSpeed</strong> of the red agent. The return value is the velocity vector that, when applied to the red agent, realizes a specific movement behavior.
	</p>
	<p>
		Uncomment line 10 or 11 and reload the project ([CTRL] + [L] / [CMD] + [L]) to watch the simulation of these behaviors.
	</p>
	<p style="margin-bottom: 18px;">
		The path of the red agent will be drawn for the first 8 seconds of the simulation to visualise the movement behavior. The resulting scene approaching the timepoint at 8 seconds after simulation start should look like the following pictures. The first picture shows the resulting path of the seek behavior and the second picture shows the path taken when employing the flee behavior.
	</p>
	<div class="row">
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/seek.png" | prepend: site.baseurl }}"/>
		</div>
		<div class="col-md-6">
			<img data-toggle="magnify" src="{{ "/img/flee.png" | prepend: site.baseurl }}"/>
		</div>
	</div>
	<h2>How is it implemented?</h2>
	<p style="margin-bottom: 18px;">
	Lets start by looking at the scene setup code in the main project file <strong>scenario.js</strong>. Firstly, we create a Drawer object that will be used to draw the red agents path. We spawn the two agents in the actual onSetup function by calling a custom routine. For the green agent we set up the indefinite movement pattern by making sure the movement target is switched to the mirrored position on the map every time the movement target is reached. We set the orientation of both actors by setting their look-at targets. The movement_target and lookat_target properties are added to PALAIS via the pathfinding plugin.
	</p>
				{% highlight javascript linenos %}
var d = Scene.createDrawer("velocityDrawer");
function onSetup() {
	spawnAgent(new Vector3(0,0,0), "green");
	spawnAgent(new Vector3(2.5,0,2.5), "red");

	redAgent.setKnowledge("lookat_target", greenAgent.position);
	greenAgent.setKnowledge("lookat_target", redAgent.position);
	greenAgent.setKnowledge("movement_target", new Vector3(-3,0,3))
	greenAgent.knowledgeRemoved.connect(function(key) {
		// Keep moving between the two target points indefinitely.
		if(key == "movement_target") {
			var p = greenAgent.position;
			greenAgent.setKnowledge("movement_target", 
			                        new Vector3(-p.x, p.y, -p.z))
		}
	})
	greenAgent.setKnowledge("movement_speed", 1)
}
				{% endhighlight %}
	<p style="margin-bottom: 18px;">
	The custom <strong>spawnAgent</strong> routine simply instantiates an agent at a specified position and performs some setup on it. Specifically, the walk animation ("my_animation") is enabled and the rotation_speed property used by the pathfinding plugin is set.
	</p>

				{% highlight javascript linenos %}
function spawnAgent(position, color) {
	var agent = Scene.instantiate(color + "Agent", 
	                              "soldier2" + color, 
	                              position);
	agent.setScale(0.2)
	agent.setKnowledge("rotation_speed", 140) // in degrees per second.
	agent.enableAnimation("my_animation")
	return agent;
}
				{% endhighlight %}
	<h2>The update-loop</h2>
	<p style="margin-bottom: 18px;">
	The <strong>update</strong> function controls the time-dependent logic of the scene. The active movement behavior <strong>movementBehavior</strong> is evaluated at every time step to obtain the current velocity of the red agent. Since <strong>movementBehavior</strong> function is defined in another file (movement.js) it has to be included into the current file via <strong>require()</strong> to be accessible. An integration step using the current velocity advances the red agent's position in line 27. Additionally, the custom drawing routine <strong>drawPath()</strong> is invoked for the first 8 seconds of the simulation.
	</p>
				{% highlight javascript linenos %}
require("movement.js")

var accum = 0;
function update(deltaTime) {
	var maxSpeed = 0.75;
	var before = redAgent.position;

	// Apply the custom movement behavior.
	var v = movementBehavior(redAgent, greenAgent.position, maxSpeed);

	// Clamp the agent's velocity to __maxSpeed__.
	if(v.length() > maxSpeed) {
		v.normalize().multiply(maxSpeed);
	}
	var velocity = new Vector3(v.x, v.y, v.z);
	velocity.multiply(deltaTime);

	// Draw the path fo the agent for the first 8 seconds.
	accum += deltaTime;
	if(accum < 8) {
		drawPath(velocity);
	}

	// Apply the position update if the agent isn't going to move out of bounds.
	var newPos = before.add(velocity);
	if(newPos.x < 8 && newPos.x > -8 &&
	   newPos.z < 8 && newPos.z > -8) {
		redAgent.position = newPos;
	}

	// Update the actor's orientations.
	redAgent.setKnowledge("lookat_target", greenAgent.position)
	greenAgent.setKnowledge("lookat_target", redAgent.position)
}
				{% endhighlight %}
	<h2>Visualization</h2>
	<p style="margin-bottom: 18px;">
	The custom <strong>drawPath()</strong> function simply draws an arrow from the current position of the red agent to the position the red agent would have if it were to move in direction of its movement vector. Furthermore, the start and end positions of the arrow are offset in the y-axis to prevent z-fighting with the ground plane.
	</p>
				{% highlight javascript linenos %}
function drawPath(velocity) {
	var s = redAgent.position;
	s.y += 0.2;
	var e = redAgent.position.add(velocity);
	e.y += 0.2;
	d.drawArrow(s, e, Colors.RED);
}
				{% endhighlight %}
</div>