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

function DocClass(name, description, methods) {
	this.name = name;
  this.description = description;
  this.methods = methods;
}

function DocVar(name, description) {
  this.name = name;
  this.description = description;
}

function DocMethod(name, description, parameters, returnvalue) {
  this.name = name;
  this.description = description;
  this.parameters = parameters;
  this.returnvalue = returnvalue;
}

var timerClass = new DocClass("Timer",
                              "Timers are used to execute script code in the future. There are two main types of timers: repeating and one-shot timers.",
                              [new DocMethod("setTimeout", 
                                             "Creates a one-shot timer.", 
                                             [new DocVar("time", "A number that specifies when the timer code should be executed relative to the current time. (in milliseconds)"),
                                              new DocVar("function", "A function that will be invoked when the timer is executed.")],
                                             new DocVar("handle", 
                                                        "An integer ID that identifies the created timer. It can be used to remove the timer before it is executed."))]
                              )

app.controller('DocumentationController', function($scope){
	$scope.classes = [timerClass,
					  new DocClass("Vector3"),
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