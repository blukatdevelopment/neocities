/*##############################################################################
# Main
# Runs before all other scripts
##############################################################################*/
var MAIN = {};
// Assumes a square screen
MAIN.SCREEN_MIN = 0;
MAIN.SCREEN_MAX = 500;

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
    INPUT.clearEvents();
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

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

MAIN.main();