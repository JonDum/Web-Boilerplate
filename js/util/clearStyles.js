

var isArray = require('lodash/lang/isArray');

module.exports = clearStyles = function(elements, styles) {

    if(!isArray(elements))
        elements = [elements];

    if(!isArray(styles))
        styles = [styles];

    elements.forEach(function(el) {

        if (!el)
            return;

        for (var i = 0; i < styles.length; i++)
            el.style[styles[i]] = '';

    });

}
