// These are all to be included on every page
// Otherwise it will be loaded in via script loader

// @include vendor/TweenMax.js
// @include vendor/retina.js

// @include utils.js
// @include polyfills.js


/**
 *
 *  Check the page had loaded and is ready to run javascript stuffs
 *
 */
var readyStateCheckInterval = setInterval(readyCheck, 10);

function readyCheck()
{
    if(document.readyState === 'complete')
    {
        clearInterval(readyStateCheckInterval);
        init(window, document);
    }
}


function init(window, document)
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


function injectScript(src)
{
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    document.body.appendChild(s);
}

