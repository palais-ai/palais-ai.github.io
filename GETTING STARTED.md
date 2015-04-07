---
layout: page
title: Getting Started
permalink: /getting-started/
---

<div class="getting_started">
	<div class="container">
		<div class="row col-md-12">
			<p>
			The best way to learn how to use PALAIS for your project is to go through the tutorials listed on this page. To get started grab the latest version of PALAIS from <a href="{{ "/download/" | prepend: site.baseurl }}">here</a>.
			</p>
		</div>
		<div class="row col-md-12">
			<p class="callout callout-highlight">
			Note that these tutorials are meant to ease your adoption of PALAIS by giving you an overview over the workflow of creating your own projects. As such they will only introduce you to the concepts of PALAIS. You can consult the <a href="{{ "/documentation/" | prepend: site.baseurl }}">documentation</a> for more thorough description of the features of PALAIS.
			</p>
		</div>
	</div>
	<p>
		<h2>TUTORIALS</h2>
		<ul class="tutorial-list">
		    {% assign tutorials = site.pages | where:"category", "tutorial" | sort: 'tag' %}
		    {% for link in tutorials %}

				<li><a href="{{ link.url | prepend: site.baseurl }}">{{ link.title }}</a></li>

		    {% endfor %}
		</ul>
	</p>
</div>
