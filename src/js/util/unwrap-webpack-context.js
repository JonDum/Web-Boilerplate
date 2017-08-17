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
 * @param {Object} context Webpack context via `require.context()`
 * @param {String} extension The filename extension to filter out. Default: 'js'.
 * @returns {Object} Object with each key mapped to the exportof the file in the context
 */
module.exports = function(context, extension) {

	extension = extension || 'js';

	var ret = {};
	var regex = new RegExp('\\.'+extension+'$');

	/* jshint -W033 */
	context.keys()
	.filter(function(s) {
		return !regex.test(s);
	})
	.forEach(function(k) {
		let module = context(k);
		if(module.__esModule) {
			if(DEBUG && !module.default) {
				console.warn('No default export for '+k);
			}
			module = module.default;
		}
		ret[k.replace('./', '')] = module;
	});

	return ret;

};
