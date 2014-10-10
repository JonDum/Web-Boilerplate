(function(window, document) {

    if(DEBUG)
        console.log('DEBUG mode is enabled.');

    if(PRODUCTION)
        console.log('PRODUCTION mode is enabled.');

    /* Dependencies */

    //these export globals
    require('utils');
    require('polyfills');
    require('util/lazyload');

    //var $ = require('jquery');

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

        if(window.addEventListener)
            window.addEventListener('hashchange', onHashChange);
        else
            window.onhashchange = onHashChange;

        onHashChange();
    }


    var hashTargetScrollPosition;

    function onHashChange(e)
    {
        if(!location.hash.length)
            return;

        var id = location.hash.slice(0, location.hash.length - 1)
        var hrefTarget = q(id);

        removeEventListener('scroll', onScroll);

        if(hrefTarget)
        {

            hashTargetScrollPosition = offset(hrefTarget).top - 50;

            if(e)
            {
                e.preventDefault();
                TweenLite.to(window, 0.8, {scrollTo: hashTargetScrollPosition, onComplete: function() {
                    addEventListener('scroll', onScroll)
                } })
            }
            else
              window.scrollTo(0, hashTargetScrollPosition);
        }
    }
    

    function onScroll(e)
    {
        var delta = hashTargetScrollPosition - scrollY;
        if(Math.abs(delta) > 50)
        {
            if('pushState' in history)
                history.pushState("", document.title, location.pathname + location.search); //Clear the hash
            else
                location.hash.replace(/#.+?/, '');

            removeEventListener('scroll', onScroll);
        }

    }

})(window, document);
