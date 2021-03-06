//<![CDATA[
angular.module('components', [])
       .directive('documentationclass', 
                  function() {
                    return {
                      restrict: 'E',
                      templateUrl: "/ng-templates/class.html"
                    };
                  })
       .directive('documentationmethod', 
                  function() {
                    return {
                      restrict: 'E',
                      templateUrl: "/ng-templates/method.html"
                    };
                  })
       .config(function($interpolateProvider){
    		$interpolateProvider.startSymbol('{a{').endSymbol('}a}');
		});

var app = angular.module('app', ['components'])

// CREDITS: http://stackoverflow.com/questions/16630471/how-can-i-invoke-encodeuricomponent-from-angularjs-template
app.filter('encodeURIComponent', function() {
    return function(arg) {
      return window.encodeURIComponent(arg).replace(/%.{2}/g, "_");
    };
});

function DocClass(name, description, properties, methods, events) {
	this.name = name;
  this.properties = properties;
  this.description = description;
  this.methods = methods;
  this.events = events;
}

function mergeClasses(c1, c2) {
  if(c1.properties === undefined) {
    c1.properties = []
  }
  c1.properties = c1.properties.concat(c2.properties);

  if(c1.methods === undefined) {
    c1.methods = []
  }
  c1.methods = c1.methods.concat(c2.methods);

  if(c1.events === undefined) {
    c1.events = []
  }
  c1.events = c1.events.concat(c2.events);
}

function DocVar(name, description) {
  this.name = name;
  this.description = description;
}

function DocMethod(name, description, parameters, returnvalue, examples) {
  this.name = name;
  this.description = description;
  this.parameters = parameters;
  this.returnvalue = returnvalue;
  this.examples = examples;
}

var debugClass = new DocClass("Debug",
  "The Debug module provides simple debugging facilities.",
  [],
  [new DocMethod("[global] print",
                 "Outputs a textual representation of the input value to the environment's console.",
                 [new DocVar("value", 
                             "The value to be printed. Must be either a primitive object (e.g. bool, string, number..) or a custom object that defines a '.toString' method returning a textual representation of the custom object.")]
                 )
  ]
  );

var knowledgeClass = new DocClass("KnowledgeModel",
  "...",
  [],
  [new DocMethod("getKnowledge",
                 "Retrieves a named knowledge item's value.",
                 [new DocVar("key", "The key of the knowledge item to be retrieved. (string)")],
                 new DocVar("value", "The value of the knowledge item with the given key or a default constructed value if it doesn't exist. You can check for existance before using getKnowledge by using the hasKnowledge method.")),
   new DocMethod("hasKnowledge",
                 "Checks whether or not this object's blackboard contains a named knowledge item.",
                 [new DocVar("key", "The key of the knowledge item to be checked. (string)")],
                 new DocVar("flag", "A boolean flag that is true if the knowledge item with the given key exists, and false, if not.")),
   new DocMethod("setKnowledge",
                 "Sets a knowledge item's value. A new knowledge item is added to the blackboard if the given key doesn't exist otherwise the existing entry's value is changed.",
                 [new DocVar("key", "The key of the knowledge item to be set."),
                  new DocVar("value", "The value of the knowledge item to be set.")])
  ],
  [new DocMethod("knowledgeAdded", 
                 "This event is broadcast when a new knowledge key is added to the blackboard.",
                 [new DocVar("key", "The name of the knowledge item that was added."),
                  new DocVar("value", "The value of the knowledge item that was added.")]),
   new DocMethod("knowledgeChanged", 
                 "This event is broadcast when a knowledge key's associated value changes.",
                 [new DocVar("key", "The name of the knowledge item that was changed."),
                  new DocVar("value", "The value of the knowledge item that was changed.")]),
   new DocMethod("knowledgeRemoved", 
                 "This event is broadcast when a new knowledge key is removed from the blackboard.",
                 [new DocVar("key", "The name of the knowledge item that was removed.")])
   ]);

var randomClass = new DocClass("Random",
  "Provides Pseudo Random Number Generation (PRNG) utilities. Static functions from this module can be accessed via the global 'Random' (case-sensitive) variable. NOTE: The random seed is reset to a fixed value everytime a Scene is loaded, which means all 'random' results are reproducible.",
  [],
  [
  new DocMethod("uniform", 
                 "Produces a single pseudo-random real number from a uniform distribution.", 
                 [new DocVar("lowNumber", "The lowest number (inclusive) in the uniform range. (optional, default: 0)"),
                  new DocVar("highNumber", "The highest number (inclusive) in the uniform range. (optional, default: 1)")],
                 new DocVar("value", 
                            "The produced value.")),
  new DocMethod("uniformInt", 
                 "Produces a single pseudo-random integer from a uniform distribution.", 
                 [new DocVar("lowNumber", "The lowest number (inclusive) in the uniform range. (optional, default: 0)"),
                  new DocVar("highNumber", "The highest number (inclusive) in the uniform range. (optional, default: 1)")],
                 new DocVar("value", 
                            "The produced integer."))
  ]);

var timerClass = new DocClass("Timer",
  "Timers are used to execute script code in the future. There are two main types of timers: repeating and one-shot timers. Timer methods are available in the global JS scope.",
  [],
  [
  new DocMethod("[global] setTimeout", 
                 "Creates a one-shot timer. The script code will be called once after the specified time interval has passed.", 
                 [new DocVar("time", "A number that specifies when the timer code should be executed relative to the current time. (in milliseconds)"),
                  new DocVar("function", "A function that will be invoked when the timer is executed.")],
                 new DocVar("handle", 
                            "An integer ID that identifies the created timer. It can be used to remove the timer before it is executed.")),
  new DocMethod("[global] clearTimeout", 
                 "Removes a one-shot timer using its integer ID.", 
                 [new DocVar("handle", 
                             "An integer ID that identifies the timer that should be destroyed. This identifier is obtained by storing the return value of setTimeout.")]
                 ),
  new DocMethod("[global] setInterval", 
                 "Creates a repeating timer. The script code will be called repeatedly whenever the specified time interval has passed.", 
                 [new DocVar("time", "A number that specifies in what time interval the timer should be executed. (in milliseconds)"),
                  new DocVar("function", "A function that will be invoked when the timer is executed.")],
                 new DocVar("handle", 
                            "An integer ID that identifies the created timer. It can be used to remove the timer before it is executed.")),
  new DocMethod("[global] clearInterval", 
                 "Removes a repeating timer using its integer ID.", 
                 [new DocVar("handle", 
                             "An integer ID that identifies the timer that should be destroyed. This identifier is obtained by storing the return value of setInterval.")]
                 )
  ]);


var vector3Class = new DocClass("Vector3",
  "The Vector3 class represents a three-dimensional vector primitive.",
  [new DocVar("x", "The x component of the 3D vector."),
   new DocVar("y", "The y component of the 3D vector."), 
   new DocVar("z", "The z component of the 3D vector.")
  ],
  [
  new DocMethod("Vector3",
                "Constructs a Vector3 object. Must be called with the 'new' operator.",
                [new DocVar("x", "The x component of the 3D vector. (optional, default: 0)"), 
                new DocVar("y", "The y component of the 3D vector. (optional, default: 0)"), 
                new DocVar("z", "The z component of the 3D vector. (optional, default: 0)")],
                new DocVar("v", "The Vector3 object.")),
  new DocMethod("add", 
                "Adds the vector componentwise by a scalar or a vector and returns the result. Scalar other values are treated as if they were a vector with all components equal to the scalar value. ",
                [new DocVar("other", "The vector or scalar on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("subtract", 
                "Subtracts the vector componentwise by a scalar or a vector and returns the result. Scalar other values are treated as if they were a vector with all components equal to the scalar value. ",
                [new DocVar("other", "The vector or scalar on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("multiply", 
                "Multiplies the vector componentwise by a scalar or a vector and returns the result. Scalar other values are treated as if they were a vector with all components equal to the scalar value. ",
                [new DocVar("other", "The vector or scalar on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("divide", 
                "Divides the vector componentwise by a scalar or a vector and returns the result. Scalar other values are treated as if they were a vector with all components equal to the scalar value. ",
                [new DocVar("other", "The vector or scalar on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("normalize",
                "Returns a normalized copy of the vector. Note that the original vector is not modified.",
                [],
                new DocVar("result", "A Vector3 object that represents the normalized original vector.")),
  new DocMethod("distanceTo",
                "Calculates the euclidean distance to another vector.",
                [new DocVar("otherVector", "The vector to which the distance is computed.")],
                new DocVar("distance", "A number representing the distance between the two vectors.")
                ),
  new DocMethod("dot",
                "Calculates the dot product with another vector.",
                [new DocVar("otherVector", "The vector with which the dot product is computed.")],
                new DocVar("value", "A number representing the dot product of the two vectors.")
                ),
  new DocMethod("cross",
                "Calculates the cross product with another vector.",
                [new DocVar("otherVector", "The vector with which the cross product is computed.")],
                new DocVar("value", "A number representing the cross product of the two vectors.")
                ),
  new DocMethod("rotateBy",
                "Rotates the vector by a quaternion and returns the result. ",
                [new DocVar("quaternion", "The rotation to apply.")],
                new DocVar("rotated", "The rotated vector.")
                ),
  new DocMethod("length",
                "Calculates the length of the vector.",
                [],
                new DocVar("length", "The length of the vector.")
                ),
  new DocMethod("equals",
                "Compares the vector to another vector for equality.",
                [new DocVar("otherVector", "The vector to which the original vector is compared.")],
                new DocVar("isEqual", "True if the vectors can be considered equal, false if not.")),
  new DocMethod("toString",
                "Converts the Vector3 to its string representation.",
                [],
                new DocVar("stringRepresentation", "The Vector3 represented as a string."))
  ]);

var quaternionClass = new DocClass("Quaternion",
  "The Quaternion class represents orientations in PALAIS.",
  [
   new DocVar("w", "The w component of the quaternion."), 
   new DocVar("x", "The x component of the quaternion."), 
   new DocVar("y", "The y component of the quaternion."), 
   new DocVar("z", "The z component of the quaternion.")
  ],
  [
  new DocMethod("Quaternion",
                "Constructs a Quaternion object. Must be called with the 'new' operator. You can either specify the components w, x, y and z manually or you can construct a quaternion from an axis and angle.",
                [
                 new DocVar("w / axis", "The w component of the quaternion. (optional, default: 0) / The axis around which to rotate."), 
                 new DocVar("x / angle", "The x component of the quaternion. (optional, default: 0) / The angle by which to rotate."), 
                 new DocVar("y", "The y component of the quaternion. (optional, default: 0)"), 
                 new DocVar("z", "The z component of the quaternion. (optional, default: 0)")
                ],
                new DocVar("q", "The Quaternion object.")),
  new DocMethod("multiply", 
                "Multiplies the quaternion by another quaternion and returns the result. ",
                [new DocVar("other", "The quaternion on the right side of the mathematical expression.")],
                new DocVar("result", "A Quaternion object that represents the result of the expression.")),
  new DocMethod("normalize",
                "Returns a normalized copy of the quaternion. Note that the original quaternion is not modified.",
                [],
                new DocVar("result", "A Quaternion object that represents the normalized original quaternion.")),
  new DocMethod("inverse",
                "Returns an inverted copy of the quaternion. Note that the original quaternion is not modified.",
                [],
                new DocVar("result", "A Quaternion object that represents the inverted original vector.")),
  new DocMethod("slerp",
                "Interpolates between the quaternion and another quaternion using spherical linear interpolation.",
                [new DocVar("t", "The interpolation point to use. In the range of [0, 1] with 0 being this quaternion and 1 being the other quaternion."),
                 new DocVar("other", "The quaternion to interpolate towards."),
                 new DocVar("shortestPath", "A boolean flag indicating whether or not you want the shortest rotation to be taken. (optional, default=true)")],
                new DocVar("result", "The Quaternion at the specified interpolation point.")
                ),
  new DocMethod("nlerp",
                "Interpolates between the quaternion and another quaternion using normalised linear interpolation.",
                [new DocVar("t", "The interpolation point to use. In the range of [0, 1] with 0 being this quaternion and 1 being the other quaternion."),
                 new DocVar("other", "The quaternion to interpolate towards."),
                 new DocVar("shortestPath", "A boolean flag indicating whether or not you want the shortest rotation to be taken. (optional, default=true)")],
                new DocVar("result", "The Quaternion at the specified interpolation point.")
                ),
  new DocMethod("length",
                "Calculates the length of the quaternion.",
                [],
                new DocVar("length", "The length of the quaternion.")
                ),
  new DocMethod("equals",
                "Compares the quaternion to another quaternion for equality.",
                [new DocVar("other", "The quaternion to which the original quaternion is compared.")],
                new DocVar("isEqual", "True if the quaternion can be considered equal, false if not.")),
  new DocMethod("toString",
                "Converts the quaternion to its string representation.",
                [],
                new DocVar("stringRepresentation", "The quaternion represented as a string."))
  ]);

var sceneClass = new DocClass("Scene",
  "The scene class provides all the general, scenewide functionality of PALAIS. A scene class is automatically created by the environment and can be accessed via the 'Scene' (case-sensitive) variable at runtime.",
  [
   new DocVar("name", "The name of the currently loaded project. (read-only)"), 
   new DocVar("actors", "A list of the currently active actors in the scene. (read-only)")],
  [
    new DocMethod("createDrawer",
                  "Creates a named Drawer object.",
                  [
                   new DocVar("name", "The name of the Drawer."),
                   new DocVar("opacity", "The opacity of all the primitives that will be drawn by the created Drawer. Value range: [0.0, 1.0]. (optional, default: 0.5)")
                  ],                   
                  new DocVar("drawer", "The created Drawer or null in case of an error. (Drawer)")
                  ),
    new DocMethod("destroyDrawer",
                  "Destroys a named Drawer object.",
                  [
                   new DocVar("name / drawer", "The name of the drawer or the Drawer object itself.")
                  ]),
    new DocMethod("instantiate",
                  "Dynamically instantiates a new actor in current the scene.",
                  [
                   new DocVar("name", "The name of the created actor."),
                   new DocVar("meshName", "The name of the visual representation (mesh-file) to be assigned to the created actor."),
                   new DocVar("position", "The initial position of the created actor. (Vector3) (optional, default: x: 0, y: 0, z: 0)"),
                   new DocVar("rotation", "The initial rotation of the created actor. (Quaternion) (optional, default: Identity quaternion)"),
                   new DocVar("scale", "The initial scale of the created actor. (Vector3) (optional, default: x: 1, y: 1, z: 1)")
                  ],                   
                  new DocVar("actor", "The created actor or null in case of an error.")
                  ),
    new DocMethod("destroy",
                  "Removes an actor from the scene.",
                  [new DocVar("actor", "The actor to be removed.")]
                  ),
    new DocMethod("destroyLater",
                  "Removes an actor from the scene at a later point. This function is useful if you have to wait for the currently running code to finish before deleting the actor.",
                  [new DocVar("actor", "The actor to be removed.")]),
    new DocMethod("setCameraFocus",
                  "Sets the camera to focus on a specific actor.",
                  [new DocVar("actor", "The actor to be focussed.")]),
    new DocMethod("attach",
                  "Attaches an actor to the scene. Its position, orientation and scale will be in the scene's frame of reference. This is the default for created actors. This method is useful if you attached an actor to another actor and wish to reattach it to the global frame of reference.",
                  [new DocVar("actor", "The actor to be attached to the scene.")]),
    new DocMethod("raycast",
                  "Performs a raycast in the scene. Returns the first hit object. Note that the query operates on the axis-aligned bounding boxes of actors. This means that for free-form objects the query is not 100% accurate.",
                  [new DocVar("origin", "A Vector3 representing the origin of the ray."), 
                  new DocVar("direction", "A Vector3 representing the direction of the ray. Doesn't have to be normalized.")],
                  new DocVar("result", "A RaycastResult representing the result of the raycast operation.")),
    new DocMethod("rangeQuery",
                  "Performs a range query in the scene. Returns all objects contained within a sphere of the specified radius. Note that the query operates on the axis-aligned bounding boxes of actors. This means that for free-form objects the query is not 100% accurate.",
                  [new DocVar("origin", "A Vector3 representing the origin of the sphere."), 
                  new DocVar("distance", "A number representing the radius of the sphere.")],
                  new DocVar("result", "A RangeQueryResult representing the result of the range query operation.")),
    new DocMethod("hasActor",
                  "Returns whether or not an actor with the given name exists in the scene.",
                  [new DocVar("name", "The name of the actor that you want to check.")],
                  new DocVar("result", "A boolean value indicating whether or not the actor exists in the scene.")),
    new DocMethod("getActorByName",
                  "Retrieves an actor by the given name if it exists in the scene.",
                  [new DocVar("name", "The name of the actor that you want to retrieve.")],
                  new DocVar("actor", "The retrieved actor or null if no actor exists with that name."))
  ]);

var actorClass = new DocClass("Actor",
  "The Actor class represents an actor in the scene. Actors are manually instantiated and destroyed via the factory methods provided by the Scene class. If they aren't managed manually they are automatically created and destroyed by the environment at startup and teardown of the scene.",
  [
   new DocVar("name", "The name of the actor. (read-only)"),
   new DocVar("position", "The position of the actor. (Vector3)"),
   new DocVar("rotation", "The rotation of the actor (Quaternion)"),
   new DocVar("scale", "The scale of the actor. (Vector3)"),
   new DocVar("visible", "A boolean indicating whether or not the actor is visible.")
  ],
  [
   new DocMethod("toggleHighlight",
                 "Highlights the actor.",
                 [new DocVar("highlighted", "A boolean value indicating whether or not the actor should be highlighted.")]),
   new DocMethod("setScale",
                 "Sets the scale of the actor as a uniform factor for all components of the scale vector.",
                 [new DocVar("scale", "A number representing the uniform scale factor to be applied.")]),
   new DocMethod("enableAnimation",
                 "Enables an animation by name. Animation names are specified in the actors .mesh-file.",
                  [new DocVar("name", "The name of the animation you wish to enable.")]),
   new DocMethod("disableAnimation",
                 "Disables an animation by name. Animation names are specified in the actors .mesh-file.",
                  [new DocVar("name", "The name of the animation you wish to disable.")]),
   new DocMethod("lookAt",
                 "Rotates the actor to face a specific point.",
                 [new DocVar("target", "The point to face. (Vector3)")]),
   new DocMethod("show",
                 "Makes the actor visible if it was invisible."),
   new DocMethod("hide",
                 "Makes the actor invisible if it was visible."),
   new DocMethod("toString",
                 "Returns the string representation of the actor.",
                [],
                new DocVar("stringRepresentation", "The actor represented as a string.")),
  new DocMethod("rotateBy",
                "Rotates the actor around an angle. This method is provided for convenience. The Quaternion class offers more sophisticated rotation methods.",
                [new DocVar("axis", "The axis around which to rotate the actor."),
                new DocVar("angleDegrees", "The amount of degrees to rotate the actor.")]
                ),
   new DocMethod("attach",
                  "Attaches another actor to the actor. Its position, orientation and scale will be in the actor's frame of reference. You can attach an actor to the global 'Scene' object to detach it again. Every actor is attached either to another actor or to the scene, which is the root frame of reference.",
                  [new DocVar("actor", "The other actor to be attached to this actor. (Actor)")])
  ],
  [
  new DocMethod("removedFromScene",
                "This event is broadcast before the actor is removed from the scene (e.g. by calling 'Scene.destroy()' ).",
                [new DocVar("actor", "The actor that is being removed. (Actor)")]),
  new DocMethod("visibilityChanged",
                "This event is broadcast when an actor's visibility changes (e.g. by calling .hide() or .show()).",
                [new DocVar("actor", "The actor that has had its visibility changed. (Actor)"),
                 new DocVar("isVisible", "A flag indicating whether or not the actor is visible.")])
  ]);

var rangeQueryClass = new DocClass("RangeQueryResult",
                                   "The result of a range query operation.",
                                   [new DocVar("actors", "The list of actors within the queried sphere.")]);

var rayQueryClass = new DocClass("RaycastResult",
                                 "The result of a raycast operation.",
                                 [new DocVar("actor", "The first hit actor."),
                                  new DocVar("distance", "The distance travelled from the origin to the first hit. Note that the first hit is calculated via an actor's axis aligned bounding box, which may significantly differ from the actors 'position' property.")]);

var colorClass = new DocClass("Color",
  "The Color class represents colors in PALAIS.",
  [
   new DocVar("r", "The red component of the color. Value range: [0.0, 1.0]."), 
   new DocVar("g", "The green component of the color. Value range: [0.0, 1.0]."), 
   new DocVar("b", "The blue component of the color. Value range: [0.0, 1.0]."), 
   new DocVar("a", "The alpha component of the color. Value range: [0.0, 1.0].")
  ],
  [
  new DocMethod("Color",
                "Constructs a Color object. Must be called with the 'new' operator.",
                [
                 new DocVar("r", "The red component of the color. (optional, default: 0)"), 
                 new DocVar("g", "The green component of the color. (optional, default: 0)"), 
                 new DocVar("b", "The blue component of the color. (optional, default: 0)"), 
                 new DocVar("a", "The alpha component of the color. (optional, default: 0)")
                ],
                new DocVar("c", "The Color object.")),
   new DocMethod("toString",
                 "Returns the string representation of the color.",
                [],
                new DocVar("stringRepresentation", "The color represented as a string."))
  ]);

var drawerClass = new DocClass("Drawer",
  "The Drawer class provides visualisation primitives that you can use to draw in your scene. You can create and destroy named Drawer objects by using the factory methods provided in the global 'Scene' object. Drawers are registered as programmable actors.",
  [],
  [
   new DocMethod("drawLine",
                 "Draws a solid line.",
                 [new DocVar("start", "The start point of the line. (Vector3)"),
                 new DocVar("end", "The end point of the line. (Vector3)"),
                 new DocVar("color", "The color of the line. (Color)")]),
   new DocMethod("drawCircle",
                 "Draws a circle.",
                 [new DocVar("center", "The center point of the circle. (Vector3)"),
                 new DocVar("radius", "The radius of the circle."),
                 new DocVar("numSegments", "The number of subdivision segments."),
                 new DocVar("color", "The color of the circle. (Color)"),
                 new DocVar("isFilled", "Whether or not the primitive is filled. Otherwise it is a wireframe. (optional, default: false)")]),
   new DocMethod("drawCylinder",
                 "Draws a cylinder.",
                 [new DocVar("center", "The center point of the cylinder. (Vector3)"),
                 new DocVar("radius", "The radius of the cylinder."),
                 new DocVar("numSegments", "The number of subdivision segments."),
                 new DocVar("height", "The height of the cylinder."),
                 new DocVar("color", "The color of the cylinder. (Color)"),
                 new DocVar("isFilled", "Whether or not the primitive is filled. Otherwise it is a wireframe. (optional, default: false)")]),
   new DocMethod("drawSphere",
                 "Draws a sphere.",
                 [new DocVar("center", "The center point of the sphere. (Vector3)"),
                 new DocVar("radius", "The radius of the sphere."),
                 new DocVar("color", "The color of the sphere. (Color)"),
                 new DocVar("isFilled", "Whether or not the primitive is filled. Otherwise it is a wireframe. (optional, default: false)")]),
   new DocMethod("drawTetrahedron",
                 "Draws a tetrahedron.",
                 [new DocVar("center", "The center point of the tetrahedron. (Vector3)"),
                 new DocVar("scale", "The scale of the tetrahedron."),
                 new DocVar("color", "The color of the tetrahedron. (Color)"),
                 new DocVar("isFilled", "Whether or not the primitive is filled. Otherwise it is a wireframe. (optional, default: false)")]),
   new DocMethod("clear",
                 "Clears all primitives drawn by this Drawer."),
   new DocMethod("drawArrow",
                 "Draws an arrow with a sphere head as its tip.",
                 [new DocVar("start", "The start point of the line. (Vector3)"),
                 new DocVar("end", "The end point of the line. (Vector3)"),
                 new DocVar("color", "The color of the line. (Color)"),
                 new DocVar("radius", "The radius of the sphere-shaped head (optional, default: 0.02).")])

  ]);

var moduleClass = new DocClass("Modules",
  "The module system allows you to split your source code into modular javascript files. The functions in this module are available in the global namespace.",
  [],
  [
   new DocMethod("[global] require",
                 "Requires that the code of the source file with the specified name is included into this source file. The file is searched in the current search directories as listed in the '__PATH__' array. The current project directory is automatically added to the __PATH__. You can manually add other directories to the __PATH__ variable.",
                 [new DocVar("filename", "The name of the javascript source file (with its file extension) you want to include. NOT a full filepath. (string)")])
  ]);

app.controller('DocumentationController', function($scope){
  mergeClasses(actorClass, knowledgeClass);
  mergeClasses(sceneClass, knowledgeClass);

	$scope.classes = [randomClass,
            timerClass,
					  vector3Class,
            quaternionClass,
					  sceneClass,
					  actorClass,
					  rangeQueryClass,
					  rayQueryClass,
            colorClass,
            drawerClass,
            moduleClass,
            debugClass]

  $scope.classes.sort(function(a, b){
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    })
})

$(document).ready(function() {
    $('.collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
        e.preventDefault();
    });

    $('[data-toggle="collapse"]').on('click', function(e) {
        e.preventDefault();
        $($(this).data('target')).toggleClass('in');
    });
});
//]]>