/*##############################################################################
# Input
# TODO: Add another layer of abstraction to hide actual keys behind actions
# in order to allow dynamic keybinding through an input menu.
##############################################################################*/
var INPUT = {};
INPUT._mousePos = null;


// Define all possible keys
INPUT.KEYS = {
  K_W: 87,
  K_A: 65,
  K_S: 83,
  K_D: 68,
  K_SPACE: 32
};

// Configure which keys will be used
var KEYS_USED = [
  INPUT.KEYS.K_W, 
  INPUT.KEYS.K_A, 
  INPUT.KEYS.K_S, 
  INPUT.KEYS.K_D, 
  INPUT.KEYS.K_SPACE
];

// Configure keys to check for presses
var KEY_PRESSES_USED = [
  INPUT.KEYS.K_SPACE
];

// Key state
INPUT.activeKeys = {};
INPUT.activeKeyPresses = {};


INPUT.getMousePosition = function(){
  if(INPUT._mousePos){
    return VECTOR2.new(INPUT._mousePos.x, INPUT._mousePos.y);  
  }
  return null;
};

INPUT.key = function(which){
  if(!(which in INPUT.activeKeys)){
    return false;
  }
  return INPUT.activeKeys[which];
};

INPUT.keyPress = function(which){
  if(!(which in INPUT.activeKeyPresses)){
    return false;
  }
  return INPUT.activeKeyPresses[which];
};

INPUT.onMouseDown = function(evt){
  SCENE.mouseDown(evt);
};

INPUT.onMouseUp = function(evt){
  SCENE.mouseUp(evt);
};

INPUT.onMouseMove = function(evt){
  var rect = GRAPHICS.getCanvas().getBoundingClientRect();
  INPUT._mousePos = VECTOR2.new(evt.clientX - rect.left, evt.clientY - rect.top);
};

INPUT.onMouseOut = function(evt){};

INPUT.onKeyDown = function(evt){
  if(evt.which in INPUT.activeKeys){
    let previousDown = INPUT.activeKeys[evt.which];
    INPUT.activeKeys[evt.which] = true;
    if(evt.which in INPUT.activeKeyPresses){
      INPUT.activeKeyPresses[evt.which] = false;
      if(!previousDown){
        INPUT.activeKeyPresses[evt.which] = true;
      }
    }
  }
};

INPUT.onKeyUp = function(evt){
  if(evt.which in INPUT.activeKeys){
    INPUT.activeKeys[evt.which] = false;
  }
  if(evt.which in INPUT.activeKeyPresses){
    INPUT.activeKeyPresses[evt.which] = false;
  }
};

INPUT.cancelSpacebarScroll = function(evt){
  if(evt.keyCode == INPUT.KEYS.K_SPACE && evt.target == document.body) {
    evt.preventDefault();
  }
};

// Only allow presses to appear for a single frame
INPUT.clearPresses = function(){
    for(let i in KEY_PRESSES_USED){
      let key = KEY_PRESSES_USED[i];
      INPUT.activeKeyPresses[key] = false;
    }
};

INPUT.initInput = function(){
  for(let i in KEYS_USED){
    let key = KEYS_USED[i];
    INPUT.activeKeys[key] = false;
  }
  for(let i in KEY_PRESSES_USED){
    let key = KEY_PRESSES_USED[i];
    INPUT.activeKeyPresses[key] = false;
  }
  var canvas = GRAPHICS.getCanvas();
  canvas.addEventListener("mousedown", INPUT.onMouseDown);
  canvas.addEventListener("mouseup", INPUT.onMouseUp);
  canvas.addEventListener("mousemove", INPUT.onMouseMove);
  canvas.addEventListener("mouseout", INPUT.onMouseOut);
  window.addEventListener('keydown', INPUT.onKeyDown, false);
  window.addEventListener('keyup', INPUT.onKeyUp, false);
  window.addEventListener('keydown', INPUT.cancelSpacebarScroll, false);
};