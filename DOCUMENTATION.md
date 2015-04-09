---
layout: page
title: DOCUMENTATION
permalink: /documentation/
---

<p>
	The content on this page describes the scripting interface of PALAIS.
</p>

<div class="row documentation" ng-controller="DocumentationController">
	<aside class="col-md-4">
		<div class="documentation-sidebar-box">
			<header>
				<h2>OVERVIEW</h2>
			</header>
			<nav>
				<ul class="documentation-sidebar">
					<li ng-repeat="c in classes"><a href="#{a{ c.name }a}">{a{ c.name }a}</a></li>
				</ul>
			</nav>
		</div>
	</aside>

	<main class="col-md-8">
		<documentationclass ng-repeat="class in classes"/>
	</main>
</div>
