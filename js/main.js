(function(window, document) {

    if(DEBUG)
        console.log('DEBUG mode is enabled.');

    if(PRODUCTION)
        console.log('PRODUCTION mode is enabled.');

    /* Dependencies */

    //these export globals
    require('utils');
    require('polyfills');

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

        if(hrefTarget)
        {
            hashTargetScrollPosition = offset(hrefTarget).top - 50;

            TweenLite.to(siteWrap, 0.4, {scrollTo: hashTargetScrollPosition, onComplete: function() {
                addEventListener('scroll', onScroll)
            } })
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
