---
layout: page
title: DOWNLOAD
permalink: /download/
---

<div class="container download">
	<button class="btn btn-default row" data-link="https://github.com/palais-ai/palais-simulator/releases/download/v0.0.1-beta-win32/PalaisSetup.exe.zip"><i class="fa fa-windows"></i>WINDOWS DOWNLOAD</button>
	<button class="btn btn-default row" data-link="https://github.com/palais-ai/palais-simulator/releases/download/v0.0.1-beta-mac/Palais.app.zip"><i class="fa fa-apple"></i>MAC OS X DOWNLOAD</button>

	<script>
		$('.download > button').click(function() {
			ga('send', 'event', 'button', 'click', 'download', 1);
		});
	</script>
</div>