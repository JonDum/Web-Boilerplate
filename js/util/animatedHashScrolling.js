

require('gsap');
var q = require('util/query');

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

onHashChange();
window.addEventListener('hashchange', onHashChange);
