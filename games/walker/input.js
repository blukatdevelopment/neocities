/*##############################################################################
# Input
# TODO: Add another layer of abstraction to hide actual keys behind actions
# in order to allow dynamic keybinding through an input menu.
##############################################################################*/
INPUT._mousePos = null;
INPUT._mouseWheelInput = 0;
INPUT._mouseClick = [false, false, false];
INPUT._mouseDown = [false, false, false];
INPUT._fullClick = false;

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
  K_A: 65,
  K_B: 66,
  K_C: 67,
  K_D: 68,
  K_E: 69,
  K_F: 70,
  K_G: 71,
  K_H: 72,
  K_I: 73,
  K_J: 74,
  K_K: 75,
  K_L: 76,
  K_M: 77,
  K_N: 78,
  K_O: 79,
  K_P: 80,
  K_Q: 81,
  K_R: 82,
  K_S: 83,
  K_T: 84,
  K_U: 85,
  K_V: 86,
  K_W: 87,
  K_X: 88,
  K_Y: 89,
  K_Z: 90,
  K_SPACE: 32,
  K_TAB: 9,
  K_LEFT_SHIFT: 16,
  K_LEFT_CTRL: 17
};

// Configure which keys will be used for ondown
var KEYS_USED = [

];

// Configure keys to check for presses
var KEY_PRESSES_USED = [

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

INPUT.getDownScaledMousePosition = function(){
  if(INPUT._mousePos){
    return VECTOR2.new(GRAPHICS.downScale(INPUT._mousePos.x), GRAPHICS.downScale(INPUT._mousePos.y));
  }
  return null;
};


INPUT.mouseClick = function(mouseButton){
  if(mouseButton > -1 && mouseButton < 3){
    return INPUT._mouseClick[mouseButton];
  }
};

INPUT.isMouseDragging = function(){
  return INPUT._mouseDown[0] && !INPUT._mouseClick[0];
};

INPUT.fullClick = function(){
  return INPUT._fullClick;
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

// Triggers when you left click and then release
// Differentiates between click and drag
INPUT.onMouseFullClick = function(evt){
  INPUT._fullClick = true;
};

INPUT.onMouseDown = function(evt){
  let which = evt.button;
  if(which > -1 && which < 3){
    let previousDown = INPUT._mouseDown[which];
    INPUT._mouseDown[which] = true;
    if(!previousDown){
      INPUT._mouseClick[which] = true;
    }
  }
};

INPUT.onMouseUp = function(evt){
  let which = evt.button;
  if(which > -1 && which < 3){
    INPUT._mouseDown[which] = false;
  }
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
    INPUT._mouseClick[0] = false;
    INPUT._mouseClick[1] = false;
    INPUT._mouseClick[2] = false;
    INPUT._fullClick = false;
};

INPUT.getMouseWheel = function(){
  return INPUT._mouseWheelInput;
};

INPUT.initInput = function(){
  for(let key of Object.keys(INPUT.KEYS)){
    KEYS_USED.push(INPUT.KEYS[key]);
    KEY_PRESSES_USED.push(INPUT.KEYS[key]);
  }
  for(let i in KEYS_USED){
    let key = KEYS_USED[i];
    INPUT.activeKeys[key] = false;
  }
  for(let i in KEY_PRESSES_USED){
    let key = KEY_PRESSES_USED[i];
    INPUT.activeKeyPresses[key] = false;
  }
  var canvas = GRAPHICS.getCanvas();
  canvas.addEventListener("click", INPUT.onMouseFullClick);
  canvas.addEventListener("mousedown", INPUT.onMouseDown);
  canvas.addEventListener("mouseup", INPUT.onMouseUp);
  canvas.addEventListener("mousemove", INPUT.onMouseMove);
  canvas.addEventListener("mouseout", INPUT.onMouseOut);
  window.addEventListener('keydown', INPUT.onKeyDown, false);
  window.addEventListener('keyup', INPUT.onKeyUp, false);
  window.addEventListener('keydown', INPUT.cancelSpacebarScroll, false);
  window.addEventListener("wheel", INPUT.handleMouseWheel, { passive:false });
};