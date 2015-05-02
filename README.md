
# Web-Boilerplate

### What

A lean, mean and modern setup for creating web front-ends.

### Why

I and my coworkers frequently need to set up new projects so it was worth the time to standardize and improve on this formula each time. Static HTML is great for caching and CDN performance, so this setup is perfect for Ember apps, Parse apps or your own applicaton. After writing thousands of lines of CSS, I've fallen in love with Stylus, so that and many awesome goodies are included. 


### How

Download and unzip the repository.

`cd` into the project folder and run `npm install` to download the necessary build files.

Then run `grunt` or `grunt build` to build a development version.

The compiled files will be in `build/` with a directory structure like this:
  
    ▸ build/ <--- resultant build files
	▾ css/
	  ▸ effects/
	  ▸ elements/
	  ▸ misc/ <--- utils and Stylus variables
	  ▸ pages/
	  ▸ polyfill/
	  ▸ scaffolding/ <--- Layout, Grid, etc.
	  ▸ typography/
        ... <--- whatever else you need
	    common.styl <--- The main stylesheet.
	▸ js/
        ...
        main.js <!-- main entry point for Webpack. Make additional entry points as needed.
	▸ node_modules/
	▸ pages/ <!--- HTML goes here. Sub folders are supported.
	▾ static/
	  ▸ font/
	  ▸ images/
	  ▸ js/    <!--- one-off javascript files only (will not be preprocessed)
	  ▸ video/
	▸ templates/ <!-- HTML includes and templates here
	  Gruntfile.js
      webpack.config.js
	  package.json
	  README.md

Run `grunt build:production` to build a production version complete with minified and obfuscated code. 
Run `grunt build:staging` to build with production preprocessors, but without the obfuscation (good for debugging in production mode).

Tip: if `NODE_ENV` is set to `production`, `grunt build` will build a production version instead.

##### Developing

Run `grunt serve` to start up webpack-dev-server and grunt-watch at the same time. Changes to the filesystem will rebuild files as needed.

Open [http://localhost:8080/webpack-dev-server](http://localhost:8080/webpack-dev-server)
to view your app with a handy toolbar showing you the build status or
[http://localhost:8080/](http://localhost:8080/) to view your app normally


### Goodies

##### Webpack

Webpack is a very powerful bundler. It allows you to to use CommonJS *or* AMD style module loading javascript.
Webpack is already tied into the Grunt buildsystem and has sensible defaults. It is prime or customizing from there.
Read up on it here: http://webpack.github.io/

##### Preprocessing

All HTML is preprocessed.

This means you can do neat things like

    <div>
         <!-- @include ../templates/navbar.html -->
    </div>

	<!-- @ifdef PRODUCTION -->
	<script src='analytics.js></script>
	<!-- @endif -->

And the resultant text will be included/discluded according to the build type.


##### Grid System

##### DEPRECATED

`I'm looking for a better grid system. I was using the grid from SemanticUI which was very clean to use in HTML, but had some annoying layout problems. No grid is currently included.`

Included is a modified version of Semantic UIs grid system. I have experimented with *many* grid systems and have found Semantic's to be the most flexible, powerful and, well, semantic. More info and features is available at Semantic's Website.


	The grid is percentage based, so each column here will be 20% of the *grid's* parent
	<div class='five column grid'>
	  <div class='column'>1</>
	  <div class='column'>2</>
	  <div class='column'>3</>
	  <div class='column'>4</>
	  <div class='column'>5</>
	</div>

	It also supports multiple rows and variable column widths. 
	In `twelve wide` grids, all column widths add up to twelve.
	<div class='twelve wide grid'>
	   <div class='row'>
	      <div class='three wide column'>3</div>
	      <div class='nine wide column'>9</div>
	   </div>
	   <div class='row'>
	      <div class='four wide column'>4</div>
	      <div class='five wide column'>5</div>
	      <div class='three wide column'>3</div>
	   </div>
	</div>
















