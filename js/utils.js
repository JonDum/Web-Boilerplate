

var utils = {}

utils.isArray = function(obj) {		
    return (Object.prototype.toString.call(obj) === '[object Array]')		
}		
		
utils.isElement = function(obj)		
{		
    return !!(obj && obj.nodeType == 1);		
}		
		
utils.isFunction = function(obj)		
{		
    return typeof obj === "function";		
}		
		
utils.isEmpty = function(obj)		
{		
    for(var prop in obj) {		
        if(obj.hasOwnProperty(prop))		
            return false;		
    }		
		
    return true;		
}		


utils.anyParentHasClass = function(el, name) {
    var searchDepth = 5;

    while (!utils.hasClass(el, name) && --searchDepth >= 0)
        el = el.parentNode;

    return searchDepth > 0 ? el : null;
}

utils.hasClass = function(el, name) {
    if (!el)
        return;
    return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
}

utils.addClass = function(el, name) {
    if(name.indexOf(' ') > -1)
        name.split(' ').forEach(function(val) {
            utils.addClass(el, val)
        });

    if (!utils.hasClass(el, name))
        el.className += (el.className ? ' ' : '') + name;
}


utils.removeClass = function(el, name) {
    if (name.indexOf(' ') > -1)
        name.split(' ').forEach(function(val) {
            utils.removeClass(el, val)
        });

    if (utils.hasClass(el, name))
        el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
}

utils.toggleClass = function(el, name) {
    if (utils.hasClass(el, name))
        utils.removeClass(el, name)
    else
        utils.addClass(el, name);
}


utils.q = function(sel, sel2) {

    var container = document;
    var query = sel;

    if(query[0] == '#' && query.indexOf(' ') == -1)
        return document.getElementById(query.slice(1));

    if(sel instanceof NodeList && sel.length == 1)
        sel = sel[0];

    if(utils.isElement(sel) && sel2.length > 0) {
        container = sel;
        query = sel2;
    }

    var result = container.querySelectorAll(query);

    if (result.length == 1)
        result = result[0];

    return result;


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



utils.childElementsOf = function(el) {
    var a = Array.prototype.slice.call(el.childNodes)

    for (var i = 0; i < a.length; i++)
        if (a.nodeType !== 1)
            a.splice(i, 1);

    return a;
}

utils.elementIndexOf = function(el) {

    var a = utils.childElementsOf(el.parentNode);

    return a.indexOf(el);

}


utils.previousSiblingElement = function(el) {
    var siblings = utils.childElementsOf(el.parentNode);

    return siblings[siblings.indexOf(el) - 1];
}


utils.nextSiblingElement = function(el) {
    var siblings = utils.childElementsOf(el.parentNode);

    return siblings[siblings.indexOf(el) + 1];
}


utils.querySelectorForEach = function(queries, callback) {

    if (!utils.isArray(queries)) queries = [queries];

    var elements = [];

    if(isArray(queries))
        queries = queries.join(',');

    q(queries).forEach(function(el) {

        callback(el, elements);

    });

}


utils.nodeListForEach = function(nodeList, callback) {
    Array.prototype.slice.call(nodeList).forEach(callback);
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


utils.clearStyles = function(elements, styles) {
    if(!utils.isArray(elements))
        elements = [elements];

    if(!utils.isArray(styles))
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


/**
 * This is document-space position. For screen-space position use el.getBoundingClientRect()
 * @param element
 */
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



module.exports = utils; 


for(var util in utils)
    window[util] = utils[util];





