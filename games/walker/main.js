/*##############################################################################
# Main
# Runs before all other scripts
##############################################################################*/
var MAIN = {};

// GRAPHICS
// Resolution of the viewport
MAIN.VIEWPORT_MIN = 0;
MAIN.VIEWPORT_MAX = 400;

// Scaled of the canvas the viewport is drawn to
MAIN.CANVAS_MIN = 0;
MAIN.CANVAS_MAX = 800;


MAIN.FPS = 60;
MAIN.START_TIME = Date.now();
MAIN.FRAME_DURATION = 1000 / MAIN.FPS
MAIN.LAG = 0;

MAIN.GameLoop = function(){
  requestAnimationFrame(MAIN.GameLoop, GRAPHICS.getCanvas());
  
  var current_time = Date.now();
  var elapsed = current_time - MAIN.START_TIME;
  MAIN.START_TIME = current_time;
  MAIN.LAG += elapsed;
  while(MAIN.LAG >= MAIN.FRAME_DURATION){
    SCENE.update();
    MAIN.LAG -= MAIN.FRAME_DURATION;
  }
}

MAIN.init = function(){
  GRAPHICS.init();
  INPUT.initInput();
}

MAIN.main = function(){
  this.init();
  this.GameLoop();
}



document.addEventListener('DOMContentLoaded', function() {
  MAIN.main();
});