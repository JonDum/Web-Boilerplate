
module.exports = function(obj, alsoEncodeURI) {
	var encoded = '';

	for (var key in obj)
		encoded += '&' + key + '=' + obj[key];

	encoded = encoded.slice(1);
	return alsoEncodeURI ? encodeURIComponent(encoded) : encoded;
}
