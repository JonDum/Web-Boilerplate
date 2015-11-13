/**
 * This is document-space position. For screen-space position use el.getBoundingClientRect()
 *
 * @param {HTMLElement} element The element to get the position of 
 * @returns {Object} {top: ..., left: ...}
 *
 */
module.exports = function(element) {

    var curleft = 0;
    var curtop = 0;

    if (element.offsetParent) {

        /* jshint -W084 */
        do {

            curleft += element.offsetLeft;
            curtop += element.offsetTop;

        } while ((element = element.offsetParent));

        return {
            top: curtop,
            left: curleft,
        };
    }

};
