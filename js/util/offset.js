
/**
 * This is document-space position. For screen-space position use el.getBoundingClientRect()
 * @param element
 */
module.exports = function(element) {
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

