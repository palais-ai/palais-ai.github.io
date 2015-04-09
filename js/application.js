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

function DocClass(name, description, properties, methods) {
	this.name = name;
  this.properties = properties;
  this.description = description;
  this.methods = methods;
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

var timerClass = new DocClass("Timer",
  "Timers are used to execute script code in the future. There are two main types of timers: repeating and one-shot timers.",
  [],
  [
  new DocMethod("setTimeout", 
                 "Creates a one-shot timer. The script code will be called once after the specified time interval has passed.", 
                 [new DocVar("time", "A number that specifies when the timer code should be executed relative to the current time. (in milliseconds)"),
                  new DocVar("function", "A function that will be invoked when the timer is executed.")],
                 new DocVar("handle", 
                            "An integer ID that identifies the created timer. It can be used to remove the timer before it is executed.")),
  new DocMethod("clearTimeout", 
                 "Removes a one-shot timer using its integer ID.", 
                 [new DocVar("handle", 
                             "An integer ID that identifies the timer that should be destroyed. This identifier is obtained by storing the return value of setTimeout.")]
                 ),
  new DocMethod("setInterval", 
                 "Creates a repeating timer. The script code will be called repeatedly whenever the specified time interval has passed.", 
                 [new DocVar("time", "A number that specifies in what time interval the timer should be executed. (in milliseconds)"),
                  new DocVar("function", "A function that will be invoked when the timer is executed.")],
                 new DocVar("handle", 
                            "An integer ID that identifies the created timer. It can be used to remove the timer before it is executed.")),
  new DocMethod("clearInterval", 
                 "Removes a repeating timer using its integer ID.", 
                 [new DocVar("handle", 
                             "An integer ID that identifies the timer that should be destroyed. This identifier is obtained by storing the return value of setInterval.")]
                 )
  ]);

var vector3Class = new DocClass("Vector3",
  "The Vector3 class represents a three-dimensional vector primitive.",
  [new DocVar("x", "The x component of the 3D vector."), new DocVar("y", "The y component of the 3D vector."), new DocVar("z", "The z component of the 3D vector.")],
  [
  new DocMethod("add", 
                "Adds two vectors and returns the result. Note that neither of the original vectors are modified.",
                [new DocVar("otherVector", "The vector on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("subtract", 
                "Subtracts two vectors and returns the result. Note that neither of the original vectors are modified.",
                [new DocVar("otherVector", "The vector on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("multiply", 
                "Multiplies two vectors and returns the result. Note that neither of the original vectors are modified.",
                [new DocVar("otherVector", "The vector on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("divide", 
                "Divides two vectors and returns the result. Note that neither of the original vectors are modified.",
                [new DocVar("otherVector", "The vector on the right side of the mathematical expression.")],
                new DocVar("result", "A Vector3 object that represents the result of the expression.")),
  new DocMethod("normalize",
                "Returns a normalized copy of the vector. Note that the original vector is not modified.",
                [],
                new DocVar("result", "A Vector3 object that represents the normalized original vector.")),
  new DocMethod("distanceTo",
                "Calculates the euclidean distance between two vectors.",
                [new DocVar("otherVector", "The vector to which the distance is computed.")],
                new DocVar("distance", "A number representing the distance between the two vectors.")
                ),
  new DocMethod("equals",
                "Compares two vectors for equality.",
                [new DocVar("otherVector", "The vector to which the original vector is compared.")],
                new DocVar("isEqual", "True if the vectors can be considered equal, false if not.")),
  new DocMethod("toString",
                "Converts the Vector3 to its string representation.",
                [],
                new DocVar("stringRepresentation", "The Vector3 represented as a string."))
  ]
  )

app.controller('DocumentationController', function($scope){
	$scope.classes = [timerClass,
					  vector3Class,
					  new DocClass("Scene"),
					  new DocClass("Actor"),
					  new DocClass("RangeQueryResult"),
					  new DocClass("RaycastResult")]

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