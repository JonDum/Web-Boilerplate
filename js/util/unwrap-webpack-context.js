
module.exports = function(context, extension) {

    if(DEBUG) {

        if(!extension) {
            throw new Error('unwrap-webpack-context: you need to supply an extension as second param');
            return;
        }
    }

    var ret = {}
    context.keys()
    .filter(function(s)  { return s.indexOf(extension) < 0})
    .forEach(function(k) {
        ret[k.replace('./', '')] = context(k);
    })

    return ret;

}
