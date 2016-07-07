var isElement = require('lodash/isElement');

module.exports = function(sel, sel2) {

    var container = document;
    var query = sel;

    if (query[0] == '#' && query.indexOf(' ') == -1)
        return document.getElementById(query.slice(1));

    if (sel instanceof NodeList && sel.length == 1)
        sel = sel[0];

    if (isElement(sel) && sel2.length > 0) {
        container = sel;
        query = sel2;
    }

    var result = container.querySelectorAll(query);

    if (result.length == 1)
        return result[0];
    else
    if (result.length === 0)
        return null;

    return Array.prototype.slice.call(result);
};
