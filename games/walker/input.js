/*##############################################################################
# Input
# TODO: Add another layer of abstraction to hide actual keys behind actions
# in order to allow dynamic keybinding through an input menu.
##############################################################################*/
var INPUT = {};
INPUT._mousePos = null;
INPUT._mouseWheelInput = 0;

INPUT.LEFT_CLICK = 0;
INPUT.MIDDLE_CLICK = 1;
INPUT.RIGHT_CLICK = 2;

// Define all possible keys
INPUT.KEYS = {
  K_1: 49,
  K_2: 50,
  K_3: 51,
  K_4: 52,
  K_5: 53,
  K_6: 54,
  K_7: 55,
  K_8: 56,
  K_9: 57,
  K_W: 87,
  K_A: 65,
  K_S: 83,
  K_D: 68,
  K_E: 69,
  K_SPACE: 32,
  K_TAB: 9
};

// Configure which keys will be used for ondown
var KEYS_USED = [
  INPUT.KEYS.K_W, 
  INPUT.KEYS.K_A,
  INPUT.KEYS.K_S,
  INPUT.KEYS.K_D,
  INPUT.KEYS.K_E,
  INPUT.KEYS.K_SPACE,
  INPUT.KEYS.K_E,
  INPUT.KEYS.K_1,
  INPUT.KEYS.K_2,
  INPUT.KEYS.K_3,
  INPUT.KEYS.K_4,
  INPUT.KEYS.K_5,
  INPUT.KEYS.K_6,
  INPUT.KEYS.K_7,
  INPUT.KEYS.K_8,
  INPUT.KEYS.K_9,
  INPUT.KEYS.K_TAB,
];

// Configure keys to check for presses
var KEY_PRESSES_USED = [
  INPUT.KEYS.K_SPACE,
  INPUT.KEYS.K_E,
  INPUT.KEYS.K_1,
  INPUT.KEYS.K_2,
  INPUT.KEYS.K_3,
  INPUT.KEYS.K_4,
  INPUT.KEYS.K_5,
  INPUT.KEYS.K_6,
  INPUT.KEYS.K_7,
  INPUT.KEYS.K_8,
  INPUT.KEYS.K_9,
  INPUT.KEYS.K_TAB
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
  // Suppress Tab Key
  if(evt.which == 9){
    evt.preventDefault();
    evt.stopPropagation();
  }

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

INPUT.handleMouseWheel = function(evt){
  event.preventDefault();
  if(event.deltaY != 0){
    INPUT._mouseWheelInput = event.deltaY;
  }
};

// Only allow presses to appear for a single frame
INPUT.clearPresses = function(){
    for(let i in KEY_PRESSES_USED){
      let key = KEY_PRESSES_USED[i];
      INPUT.activeKeyPresses[key] = false;
    }
    INPUT._mouseWheelInput = 0;
};

INPUT.getMouseWheel = function(){
  return INPUT._mouseWheelInput;
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
  window.addEventListener("wheel", INPUT.handleMouseWheel, { passive:false });
};