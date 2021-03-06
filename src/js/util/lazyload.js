
var throttle = require('lodash/throttle');
var isUndefined = require('lodash/isUndefined');
var isArray = require('lodash/isArray');

var q = require('util/query');

var elements = q('img[data-src], [data-bg-url]');

if (elements && !isArray(elements))
	elements = [elements]

var checkImagePositions = throttle(function() {

	if (!elements || elements.length === 0) {
		window.removeEventListener('scroll', checkImagePositions);
		return;
	}

	for (var i = 0; i < elements.length; i++) {

		var el = elements[i];

		if (elementInViewport(el)) {
			if (el.nodeName.toLowerCase() == 'img')
				el.src = el.getAttribute('data-src');
			else
				el.style.backgroundImage = 'url("' + el.getAttribute('data-bg-url') + '")';

			elements.splice(i--, 1);
		}

	}


}, 200);


checkImagePositions();

window.addEventListener('scroll', checkImagePositions);

function elementInViewport(el) {

	var rect = el.getBoundingClientRect();

	return (
		rect.left >= 0 &&
		(rect.top - (window.innerHeight / 2)) <= (window.innerHeight || document.documentElement.clientHeight)
	);
}
