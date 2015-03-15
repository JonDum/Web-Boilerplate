(function(window, document) {

    if(DEBUG)
        console.log('DEBUG mode is enabled.');

    require('polyfills');

    require('util/lazyload');

    /**
     *
     *  Check the page had loaded and is ready to run javascript stuffs
     *
     */
    if(document.readyState == 'complete' || document.readyState == 'interactive')
        init();
    else
        document.addEventListener("DOMContentLoaded", init);


    function init()
    {
        FastClick.attach(document.body);

        require('util/animatedHashScrolling.js');

    }




})(window, document);
