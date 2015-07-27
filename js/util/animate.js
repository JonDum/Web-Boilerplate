
//default ease from ease.js
var ease = require('eases/quint-in-out');

/**
* Simple and easy RAF animation function
*
* Example:
*
*    animate({
*        duration: 1.8,
*        step: step,
*        complete: function() {
*           //stuff
*        }
*    });
*
*     function step(progress) {
*        // `progress` ranges from 0 to 1 —- 0 start, 1 is done
*     }
*
*
* @param ani Object
*/
function animate(params) {
 
  var duration = 1000*params.duration,
      end = +new Date() + duration;
 
  var step = function() {
 
    var current = +new Date(),
        remaining = end - current;
 
    if(remaining <= 0) {
      if(params.complete)
          requestAnimationFrame(params.complete);
      return;
    } else {
      var rate = 1 - remaining/duration;
      rate = params.ease ? params.ease(rate) : ease(rate);
      params.step(rate);
    }
 
    requestAnimationFrame(step);
  };

  step();
}

module.exports = animate;
