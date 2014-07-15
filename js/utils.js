

var utils = {}
/**
 *  Returns true if it's an array. Mind blowing, I know.
 * @param value
 */


utils.isArray = function(obj) {
    return (Object.prototype.toString.call(obj) === '[object Array]')
}


utils.hasClass = function(el, name) {
    if (!el)
        return;
    return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
}


utils.anyParentHasClass = function(el, name) {
    var searchDepth = 5;

    while (!hasClass(el, name) && --searchDepth >= 0)
        el = el.parentNode;

    return searchDepth > 0 ? el : null;
}


utils.addClass = function(el, name) {
    if (name.indexOf(' ') > -1)
        name.split(' ').forEach(function(val) {
            addClass(el, val)
        });

    if (!hasClass(el, name))
        el.className += (el.className ? ' ' : '') + name;
}


utils.removeClass = function(el, name) {
    if (name.indexOf(' ') > -1)
        name.split(' ').forEach(function(val) {
            removeClass(el, val)
        });

    if (hasClass(el, name))
        el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
}

utils.toggleClass = function(el, name) {
    if (hasClass(el, name))
        removeClass(el, name)
    else
        addClass(el, name);
}


utils.q = function(sel) {

    if (sel[0] == '#' && sel.indexOf(' ') == -1)
        return document.getElementById(sel.slice(1));
    else
        return document.querySelector(sel);

}

utils.getPosition = function(element) {
    var pos = {
        x: 0,
        y: 0
    };

    while (element) {
        pos.x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        pos.y += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return pos;
}


utils.elementIndexOf = function(el) {

    var a = childElementsOf(el.parentNode);

    return a.indexOf(el);

}


utils.childElementsOf = function(el) {
    var a = Array.prototype.slice.call(el.childNodes)

    for (var i = 0; i < a.length; i++)
        if (a.nodeType !== 1)
            a.splice(i, 1);

    return a;
}


utils.previousSiblingElement = function(el) {
    var siblings = childElementsOf(el.parentNode);

    return siblings[siblings.indexOf(el) - 1];
}


utils.nextSiblingElement = function(el) {
    var siblings = childElementsOf(el.parentNode);

    return siblings[siblings.indexOf(el) + 1];
}


utils.querySelectorForEach = function(queries, callback) {

    if (!isArray(queries)) queries = [queries];

    var elements = [];

    queries.forEach(function(query) {
        if (typeof query === 'string')
            elements = elements.concat(Array.prototype.slice.call(document.querySelectorAll(query)));
    });

    elements.forEach(function(el) {

        callback(el, elements);

    });

}


utils.nodeListForEach = function(nodeList, callback) {
    nodeList = Array.prototype.slice.call(nodeList);

    nodeList.forEach(callback);
}


//calculate 'length' of an associative array
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


utils.debounce = function(func, wait) {
    // we need to save these in the closure
    var timeout, args, context, timestamp;

    return function() {

        // save details of latest call
        context = this;
        args = [].slice.call(arguments, 0);
        timestamp = new Date();

        // this is where the magic happens
        var later = function() {

            // how long ago was the last call
            var last = (new Date()) - timestamp;

            // if the latest call was less that the wait period ago
            // then we reset the timeout to wait for the difference
            if (last < wait) {
                timeout = setTimeout(later, wait - last);

                // or if not we can null out the timer and run the latest
            } else {
                timeout = null;
                func.apply(context, args);
            }
        };

        // we only need to set the timer now if one isn't already running
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
    }
}


utils.clearStyles = function(elements, styles) {
    if (!isArray(elements))
        elements = [elements];

    if (!isArray(styles))
        styles = [styles];

    elements.forEach(function(el) {

        if (!el)
            return;

        for (var i = 0; i < styles.length; i++)
            el.style[styles[i]] = '';

    });

}


utils.formEncodeObject = function(obj, alsoEncodeURI) {
    var encoded = '';

    for (var key in obj)
        encoded += '&' + key + '=' + obj[key];

    encoded = encoded.slice(1);
    return alsoEncodeURI ? encodeURIComponent(encoded) : encoded;
}


utils.offset = function(element) {
    var curleft = curtop = 0;

    if (element.offsetParent) {

        do {

            curleft += element.offsetLeft;
            curtop += element.offsetTop;

        } while (element = element.offsetParent);

        return {
            top: curtop,
            left: curleft
        };
    }

}

utils.removeElementFromDom = function(element) {
    element.parentNode.removeChild(element);
}



//export

module.exports = utils;


for(var util in utils)
    window[util] = utils[util];






