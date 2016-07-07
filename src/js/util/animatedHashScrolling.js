var w = window;
var d = w.document;
var q = require('util/query');
var animate = require('util/animate');
var offset = require('util/offset');

var hashTargetScrollPosition;
var startPosition;


function onHashChange(e) {
	if (!location.hash.length)
		return;

	var id = location.hash.slice(0, location.hash.length - 1);
	var hrefTarget = q(id);

	removeEventListener('scroll', onScroll);

	if (hrefTarget) {

		hashTargetScrollPosition = offset(hrefTarget).top - 50;
		startPosition = getScrollTop();

		if (DEBUG)
			console.log('hashTargetScrollPosition: ' + hashTargetScrollPosition);

		if (e) {
			e.preventDefault();
			animate({
				duration: 1.8,
				step: step,
				complete: function() {
					console.log('scroll');
					addEventListener('scroll', onScroll);
				},
			});
		} else
			window.scrollTo(0, hashTargetScrollPosition);
	}
}

function step(p) {

	var y = getScrollTop();
	y = startPosition + (hashTargetScrollPosition - startPosition) * p;
	w.scrollTo(0, y);

}


function onScroll() {
	var delta = hashTargetScrollPosition - scrollY;
	if (Math.abs(delta) > 50) {
		if ('pushState' in history)
			history.pushState('', d.title, location.pathname + location.search); //Clear the hash
		else
			location.hash.replace(/#.+?/, '');

		removeEventListener('scroll', onScroll);
	}

}

function getScrollTop() {
	if (typeof pageYOffset != 'undefined') {
		//most browsers except IE before #9
		return pageYOffset;
	} else {
		var B = d.body; //IE 'quirks'
		var D = d.documentElement; //IE with doctype
		D = (D.clientHeight) ? D : B;
		return D.scrollTop;
	}
}

onHashChange();

w.addEventListener('hashchange', onHashChange);
