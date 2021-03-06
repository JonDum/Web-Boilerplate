// It's ok for polyfills to write to globals here

if (!window.getComputedStyle) {
	window.getComputedStyle = function(el) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function() {
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		};
		return this;
	};
}


if (!('contains' in Array.prototype)) {
	Array.prototype.contains = function(arr, startIndex) {
		return ''.indexOf.call(this, arr, startIndex) !== -1;
	};
}


(function(win, doc) {
	if (win.addEventListener) return; //No need to polyfill

	function docHijack(p) {
		var old = doc[p];
		doc[p] = function(v) {
			return addListen(old(v));
		};
	}

	function addEvent(on, fn, self) {
		return (self = this).attachEvent('on' + on, function(e) {
			e = e || win.event;
			e.preventDefault = e.preventDefault || function() {
				e.returnValue = false;
			};
			e.stopPropagation = e.stopPropagation || function() {
				e.cancelBubble = true;
			};
			fn.call(self, e);
		});
	}

	function addListen(obj, i) {
		/* jshint -W084 */
		if ((i = obj.length))
			while (i--) obj[i].addEventListener = addEvent;
		else obj.addEventListener = addEvent;
		return obj;
	}

	addListen([doc, win]);
	if ('Element' in win) win.Element.prototype.addEventListener = addEvent; //IE8
	else { //IE < 8
		doc.attachEvent('onreadystatechange', function() {
			addListen(doc.all);
		}); //Make sure we also init at domReady
		docHijack('getElementsByTagName');
		docHijack('getElementById');
		docHijack('createElement');
		addListen(doc.all);
	}

})(window, document);
