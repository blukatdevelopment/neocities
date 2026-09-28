/*##############################################################################
# Main
# Runs before all other scripts, runs main game loop
##############################################################################*/
var MAIN = {};

MAIN.START_TIME = Date.now();
MAIN.LAG = 0;

MAIN.GameLoop = function(){
  requestAnimationFrame(MAIN.GameLoop, GRAPHICS.getCanvas());
  
  var current_time = Date.now();
  var elapsed = current_time - MAIN.START_TIME;
  MAIN.START_TIME = current_time;
  MAIN.LAG += elapsed;
  while(MAIN.LAG >= SETTINGS.frameDuration){
    SCENE.update();
    MAIN.LAG -= SETTINGS.frameDuration;
  }
}

MAIN.init = function(){
  SETTINGS.init();
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