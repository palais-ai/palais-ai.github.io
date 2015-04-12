---
layout: page
title: DOCUMENTATION
permalink: /documentation/
---

<p>
	The content on this page describes the scripting interface of PALAIS. It documents every class and their associated properties and methods available in the simulation environment. 
</p>
<p>
	Note that you can only construct objects that provide a constructor method (a method with the same name as the class) using the 'new' operator. Objects that don't provide a constructor are instantiated by the environment or must be explicitly instantiated using a factory method in a global object, such as the global 'Scene' object.
</p>

<div class="row documentation" ng-controller="DocumentationController">
	<aside class="col-md-4">
		<div class="documentation-sidebar-box">
			<header>
				<h2>OVERVIEW</h2>
			</header>
			<nav>
				<ul class="documentation-sidebar">
					<li ng-repeat="c in classes | orderBy:'name'"><a href="#{a{ c.name }a}">{a{ c.name }a}</a></li>
				</ul>
			</nav>
		</div>
	</aside>

	<main class="col-md-8">
		<documentationclass ng-repeat="class in classes | orderBy:'name'"/>
	</main>
</div>
