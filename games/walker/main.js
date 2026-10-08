/*##############################################################################
# Main
# God object/singleton. Runs before all other scripts, runs main game loop
##############################################################################*/
var MAIN = {};

MAIN.START_TIME = Date.now();
MAIN.LAG = 0;
MAIN.ANIM_START_TIME = Date.now();
MAIN.ANIM_LAG = 0;
MAIN.FRAMES_TO_ADVANCE = 0;
MAIN.EVENT_BUS = [];
MAIN.nextEventId = 0;
MAIN.nextEntityId = 0;

MAIN.GameLoop = function(){
  requestAnimationFrame(MAIN.GameLoop, GRAPHICS.getCanvas());
  // Handle FPS for game loop
  let current_time = Date.now();
  let elapsed = current_time - MAIN.START_TIME;
  MAIN.START_TIME = current_time;
  MAIN.LAG += elapsed;
  while(MAIN.LAG >= SETTINGS.frameDuration){

    SCENE.update();
    UTILITY.prune_events();
    MAIN.LAG -= SETTINGS.frameDuration;
    
    // Handle FPS timer for animations
    current_time = Date.now();
    elapsed = current_time - MAIN.ANIM_START_TIME;
    MAIN.ANIM_START_TIME = current_time;
    MAIN.ANIM_LAG += elapsed;
    MAIN.FRAMES_TO_ADVANCE = MAIN.ANIM_LAG / SETTINGS.animationFrameDuration;
    if(MAIN.FRAMES_TO_ADVANCE >= 1){
      MAIN.ANIM_LAG = 0;
    }
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