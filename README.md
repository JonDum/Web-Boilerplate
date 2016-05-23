
# Web-Boilerplate

### What

A lean, mean and modern setup for creating web front-ends.

### Why

I and my coworkers frequently need to set up new projects so it was worth the time to standardize and improve on this formula each time. Static HTML is great for caching and CDN performance, so this setup is perfect for Ember apps, Parse apps or your own applicaton. After writing thousands of lines of CSS, I've fallen in love with Stylus, so that and many awesome goodies are included.

### How

Download and unzip the repository. Or `git clone` && `rm -rf .git/`

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
        common.styl <--- The main stylesheet. Any other top-level .styl file in css/ is exported to build/css as well
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

Run `grunt production` to build a production version complete with minified and obfuscated code.
Run `grunt staging` to build with production preprocessors, but without the obfuscation (good for debugging in production mode).

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

##### ES6

Code in `js/` runs through Babel for cool ES6 funtimes. `[1,2,3].map(i=>i*2) // [2,4,6]` etc.

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

















