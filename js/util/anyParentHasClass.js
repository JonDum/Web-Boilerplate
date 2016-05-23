var isUndefined = require('lodash/isUndefined');

module.exports = function(el, className, searchDepth) {

    if (isUndefined(searchDepth))
        searchDepth = 5;

    while (!el.classList.contains(className) && --searchDepth >= 0)
        el = el.parentNode;

    return searchDepth > 0 ? el : null;
}
