---
layout: page
title: DOWNLOAD
permalink: /download/
---

<div class="download">
	<div class="row">
		<div class="col-md-12">Thank you for your interest in PALAIS! <br/>PALAIS is currently available for Windows (starting at Windows XP) and Mac OS X (starting at 10.6).</div>
	</div>

	<div class="row">
		<div class="col-md-3"><b>Latest Version:</b> v0.0.1-beta</div>
	</div>

	<div class="row">
		<div class="col-md-5">
			<button class="btn btn-default" data-link="https://github.com/palais-ai/palais-simulator/releases/download/v0.0.1-beta-win32/PalaisSetup.exe.zip">
				<i class="fa fa-windows"></i>WINDOWS DOWNLOAD
			</button>
		</div>
		<div class="install_instructions col-md-7">
			This downloads PalaisSetup.exe.zip (24 MB). It contains the Windows installer for PALAIS. Extract the installer executable and follow the instructions to install PALAIS.
		</div>
	</div>
	<div class="row">
		<div class="col-md-5">
			<button class="btn btn-default" data-link="https://github.com/palais-ai/palais-simulator/releases/download/v0.0.1-beta-mac/Palais.app.zip">
				<i class="fa fa-apple"></i>MAC OS X DOWNLOAD
			</button>
		</div>
		<div class="install_instructions col-md-7">
			This downloads Palais.app.zip (25 MB). It contains the Mac application bundle. Simply extract the application bundle to your application directory to install PALAIS.
		</div>
	</div>

	<script>
		$('.download > button').click(function() {
			ga('send', 'event', 'button', 'click', 'download', 1);
		});
	</script>
</div>