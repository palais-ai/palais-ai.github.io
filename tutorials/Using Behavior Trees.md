---
layout: page
title: T-05 Using Behavior Trees
permalink: /tutorials/using-behavior-trees/
category: tutorial
tag: 5
---

<div class="using-behavior-trees">
	<p>
		The code used in this tutorial can be downloaded here: <a href="{{ "/resources/ctf_bt_demo.zip" | prepend: site.baseurl }}">The ctf_bt_demo project</a>.
	</p>
	<h2>Learning Goal</h2>
	<p>
		This tutorial teaches you how to use the behavior tree plugin that comes with PALAIS to add reactive decision making to your agents.
	</p>
	<h2>Description</h2>
	<p>
	 	This project showcases the usage of the behavior tree plugin. We will be using a very simple behavior tree to control two independent agents. The two agents are placed as opponents on the Capture the Flag (CTF) map. Our goal is to implement a behavior tree that controls the agents to capture the opponent's flag and return it to their own base. 
	</p>
	<h2>Defining the Game</h2>
	<p style="margin: 18px 0;"> 
		Firstly, we have to set up our scenario by defining the game rules. You will find the following functions in the file <strong>ctf_game.js</strong>:
	</p>
					{% highlight javascript linenos %}
function shoot(actor, target)
{
    ...
}

function takeFlag(actor, color)
{
    ...
}

function dropFlag(actor, color)
{
    ...
}

function capture(actor)
{
    ...
}

function score(actor)
{
    ...
}
				{% endhighlight %}

<p>
	These functions define the <b>actions</b> our agents can perform. Their actual implementation should be fairly straight-forward and is omitted for brevity.
</p>
	<h2>Spawning Agents</h2>
	<p>
		Next, we will spawn the agents we want to take control over. To do so we will provide a wrapper function that will allow us to spawn an arbitrary amount of actors on both sides using the same code.
	</p>
	<p>
		The wrapper function <b>spawnFighter</b> is defined in <strong>ctf_game.js</strong>:
	</p>

				{% highlight javascript linenos %}
// Spawns a fighter with a given name and color.
function spawnFighter(teamColor, name) 
{
    var startPos = Scene.getActorByName("flag_" + teamColor).position;
    var actor = Scene.instantiate(name,
                                  "Soldier2" + teamColor,
                                  startPos)

    var lookAtPos = Scene.getKnowledge("goal_" + otherColor(teamColor));
    actor.lookAt(lookAtPos)
    actor.setScale(0.2)
    setInitialState(actor)
    ...
				{% endhighlight %}
	<p>
		The first part of the wrapper function instantiates a named programmable actor with the mesh corresponding to the given <strong>teamColor</strong>. The actor is immediately rescaled (to fit better into the scene) and turned towards the opposing flag.
	</p>
				{% highlight javascript linenos %}
    // Set initial knowledge
    actor.setKnowledge("team_color", teamColor)
    actor.setKnowledge("movement_speed", 1)   // in meters per second.
    actor.setKnowledge("rotation_speed", 140) // in degrees per second.
    actor.setKnowledge("self", actor);
    actor.setKnowledge("has_flag", false);
    actor.setKnowledge("team_has_flag", false);
    actor.setKnowledge("enemy_in_range", false);
    ...
				{% endhighlight %}

	<p>
		The second part sets the initial knowledge of the actor by writing to its blackboard. Notably, the agent knows its team color, that it doesn't have the flag yet and that theren't any enemies in range.
	</p>
				{% highlight javascript linenos %}
    // Connect events
    actor.monitorTask = new MonitorTask(actor);
    actor.removedFromScene.connect(function() {
        clearInterval(actor.monitorTask.hasFlagHandle)
        clearInterval(actor.monitorTask.rangeHandle)
    });
    ...
				{% endhighlight %}

	<p>
		Next, we associate a monitoring task with each spawned actor outside of its blackboard knowledge. This monitoring task provides the environment sensing of the agent. The monitoring tasks are registered to be stopped once the <strong>removedFromScene</strong> event is emitted for the spawned actor. You can inspect the monitoring task in <strong>behaviors.js</strong>:
	</p>

				{% highlight javascript linenos %}
function MonitorTask(actor)
{
	this.actor = actor;
	this.hasFlagHandle = setInterval(250, function() {
		...
	})

	this.rangeHandle = setInterval(1000, function() {
		var query = Scene.rangeQuery(actor.position, 3)
		...
	})
}
				{% endhighlight %}
	<p>
		What does this code do? Conceptually, these monitoring tasks register two functions to be executed repeatedly. One of them is executed every 250 ms (1/4th of a second) and checks whether or not the actor has <strong>captured</strong> or <strong>scored</strong> the flag by comparing its position with the opponent flag's position. The other one runs every second and checks whether there are any enemies <strong>close to the actor</strong> by performing a range query on the whole scene. 
	</p>
	<p>
		The motivation to run these sensing tasks on a different rate than the update rate is <strong>performance</strong>. Querying the scene 60 times a second for every spawned actor is not necessary and would severely impact the simulation's interactivity. Note that timers are still dependant of the simulation time, thus, if you turn down the simulation speed to 0.1 times the normal speed, these functions would be executed every 2.5 seconds (2500ms) and 10 seconds (10000ms) in real time.
	</p>

				{% highlight javascript linenos %}
    // Always turn towards the current movement target
    actor.knowledgeChanged.connect(function(key, value) {
        if(key === "movement_target") {
            value.y = Plane.position.y
            actor.setKnowledge("lookat_target", value)
        }
    })
    actor.knowledgeRemoved.connect(function(key) {
        if(key === "movement_target") {
            actor.removeKnowledge("lookat_target")
        }
    })
}
				{% endhighlight %}
	<p>
		Lastly, every actor registers event handlers that automatically turn them towards the next <strong>movement_target</strong>. They will turn towards the current target position with a turn rate governed by the <strong>rotation_speed</strong> property we have set earlier.
	</p>

	<h2>DEFINING BEHAVIORS</h2>
	<p>
		We can now use the behavior tree plugin to define our agent's decision making logic. We do so by wrapping the actions we defined in behaviors (<strong>behaviors.js</strong>). The following example shows how to wrap actions in behaviors by subclassing.
	</p>

				{% highlight javascript linenos %}
function Idle(timeInMS)
{
	this.idleTime = timeInMS;
	Behavior.call(this);
}

Idle.prototype = {
	run: function() {
		var context = this;
		this.handle = setTimeout(this.idleTime, function() {
			delete context.handle
			context.notifySuccess();
		})
		this.setStatus(Status.Waiting)
	},
	terminate: function() {
		if(typeof(this.handle) !== "undefined") {
			clearTimeout(this.handle)
		}
	}
}
extend(Behavior, Idle)
				{% endhighlight %}
	<p>
		This example shows a behavior that lets our agent idle for a specified amount of time. As a first step, we define a <strong>constructor function</strong> which enables us instantiate this behavior when needed. In this example, the constructor function takes a single parameter: The time (in ms) the actor will idle, when this behavior is activated. We store this parameter in the <strong>idleTime</strong> property for later access.
	</p>
	<p>
		It is <strong>important</strong> that you also call the parent constructor of the <strong>Behavior</strong> class within your own constructor. Without this step your behavior will not function. We call the parent constructor via the expression <strong>Behavior.call(this)</strong>.
	</p>
	<p>
		Next, we override the methods <strong>Behavior.run</strong> and <strong>Behavior.terminate</strong> to define what our behavior actually does. The <strong>run</strong> function is invoked repeatedly whenever the behavior is active. We register a timeout handler on the first time run is called. 
	</p>
	<p>
		The timeout handler will call the method <strong>Behavior.notifySuccess()</strong> that will indicate to the behavior's parent that our behavior has finished successfully. Correspondingly, to indicate a failure we could call <strong>Behavior.notifyFailure()</strong>. To stop our behavior from repeatedly getting called we set its status to <strong>Status.Waiting</strong>. This status tells the scheduling system, that our task is waiting for external results and doesn't need computation time.
	</p>
	<p>
		The <strong>terminate</strong> method is called whenever the behavior is forcefully changing status from active to inactive without having notified its parent of its resulting status code. This happens when an event forces a change in the Behavior Tree.
	</p>
	<p>
		Our implementation of the <strong>terminate</strong> method removes the timeout handler, if it has already been registered before the termiante method is called. Similarly, we wrapped the other possible actions.
	</p>
	<h2>USING BEHAVIOR TREES</h2>
	<p>
		All that is left is for us to create a behavior tree and tell the environment to schedule it. This process is shown in <strong>ctflogic.js</strong>.
	</p>

				{% highlight javascript linenos %}
function constructBehaviorTreeForActor(actor)
{
	var color = actor.getKnowledge("team_color");
	var root = new Selector(new HasFlag(new WalkTo(getOwnFlagPos(color)), actor),
							new WalkTo(getOpponentFlagPos(color)))

	root.setUserData(actor.knowledge);
	return root;
}
				{% endhighlight %}
	<p>
		To construct a behavior tree we instantiate the tree nodes one by one. The following composite nodes are available to define your decision making control flow: <strong>Selector, Sequence, Parallel, RandomSelector, RandomSequence</strong> and <strong>BlackboardDecorator</strong>. Composite nodes take their child nodes as parameters to their constructors. 
	</p>
	<p>
		The <strong>BlackboardDecorator</strong> is a notable exception. It provides a conditional inner node that may have only one child node. For an example of how to use the BlackboardDecorator class to react to changes to boolean values in an actor's blackboard take a look at <strong>behaviors.js</strong>. For non boolean-values you have to define your own conditions by subclassing <strong>Behavior</strong>.
	</p>
	<p>
		Note that, to access an actor's blackboard from within behaviors, you have to use <strong>Behavior.setUserData()</strong> on the root node of the behavior tree as is shown above.
	</p>
	<p>
		The depicted behavior tree does exactly what we stated in the problem description for this tutorial. The actor returns to its own base's position, if he currently holds the flag, otherwise he walks to the opponent flag to capture it.
	</p>

				{% highlight javascript linenos %}
function onSetup() {
	...
	var redBT   = constructBehaviorTreeForActor(redAgent)
	Scheduler.enqueue(redBT)
	redAgent.removedFromScene.connect(function(){
		Scheduler.dequeue(redBT)
	})
	...
}
				{% endhighlight %}
	<p>
		Lastly, we tell the environment to schedule our behavior tree by passing its root node to the <strong>Scheduler.enqueue()</strong> method. Correspondingly, we pass it to <strong>Scheduler.dequeue()</strong> to stop the environment from executing behavior tree. We do so when an actor is removed from the scene to prevent any erroneous access to knowledge that was removed.
	</p>
</div>
