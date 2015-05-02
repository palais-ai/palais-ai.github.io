---
layout: page
title: DOWNLOAD
permalink: /download/
---

<div class="download">
	<div class="row">
		<div class="col-md-12">Thank you for your interest in PALAIS! <br/>PALAIS is currently available for Windows (starting at Windows XP) and Mac OS X (starting at 10.6). PALAIS is under active development, so check this page for updates regularily. Please report any bugs you may encounter to <a href="mailto:admin@palais.io">admin@palais.io</a></div>
	</div>

	<div class="row">
		<div class="col-md-3"><b>Latest Version:</b> v0.0.3-beta</div>
		<div class="col-md-3"><b>Release Date:</b> 2nd May 2015</div>
	</div>

	<div class="row">
		<div class="col-md-5">
			<button id="windows_dl" class="btn btn-default" data-link="{{ "/resources/PalaisSetup.exe" | prepend: site.baseurl }}">
				<i class="fa fa-windows"></i>WINDOWS DOWNLOAD
			</button>
		</div>
		<div class="install_instructions col-md-7">
			This downloads PalaisSetup.exe (35 MB). It contains the Windows installer for PALAIS. Run the installer executable and follow the instructions to install PALAIS.
		</div>
	</div>
	<div class="row">
		<div class="col-md-5">
			<button id="mac_dl" class="btn btn-default" data-link="{{ "/resources/Palais.app.zip" | prepend: site.baseurl }}">
				<i class="fa fa-apple"></i>MAC OS X DOWNLOAD
			</button>
		</div>
		<div class="install_instructions col-md-7">
			This downloads Palais.app.zip (25 MB). It contains the Mac application bundle. Simply extract the application bundle to your application directory to install PALAIS.
		</div>
	</div>

	<script>
		$('#windows_dl').click(function() {
			ga('send', 'event', 'button', 'click', 'windows_download', 1);
		});
		$('#mac_dl').click(function() {
			ga('send', 'event', 'button', 'click', 'mac_download', 1);
		});
	</script>
</div>