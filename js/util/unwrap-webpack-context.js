
/**
 * Converts a webpack context into a clean key:value object
 * where the key is the name of the file without extension and
 * the value is the export of the module.
 *
 * Ex:
 *
 * var unwrap = require('util/unwrap-webpack-context');
 * var context = require.context('stuff/*');
 * var functions = unwrap(context);
 *
 */
module.exports = function(context, extension) {

    extension = extension || 'js';

    var ret = {};
    var regex = new RegExp('\\.'+extension+'$');

    /* jshint -W033 */
    context.keys()
    .filter(function(s)  { 
        return !regex.test(s);
    })
    .forEach(function(k) {
        ret[k.replace('./', '')] = context(k);
    });

    return ret;

};
