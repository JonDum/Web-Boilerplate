
module.exports = clearStyles = function(elements, styles) {

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
