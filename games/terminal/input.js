/*##############################################################################
# Input
# TODO: Add another layer of abstraction to hide actual keys behind actions
# in order to allow dynamic keybinding through an input menu.
##############################################################################*/
var INPUT = {};
INPUT._mousePos = null;

INPUT.KEY_EVENTS = {
  KEY_DOWN: 0,
  KEY_UP: 1
};

INPUT.EVENTS = [];
INPUT.clearEvents = function(){
  INPUT.EVENTS = [];
}

INPUT.INPUT_EVENT = function(key, event){
  return {
    TYPE: "INPUT_EVENT",
    KEY: key,
    EVENT: event
  };
}


// Define all possible keys
INPUT.KEYS = {
  KEY_0: 48, KEY_1: 49, KEY_2: 50, KEY_3: 51, KEY_4: 52, KEY_5: 53, KEY_6: 54, KEY_7: 55, KEY_8: 56, KEY_9: 57, KEY_A: 65, KEY_B: 66, KEY_C: 67, KEY_D: 68, KEY_E: 69, KEY_F: 70, KEY_G: 71, KEY_H: 72, KEY_I: 73, KEY_J: 74, KEY_K: 75, KEY_L: 76, KEY_M: 77, KEY_N: 78, KEY_O: 79, KEY_P: 80, KEY_Q: 81, KEY_R: 82, KEY_S: 83, KEY_T: 84, KEY_U: 85, KEY_V: 86, KEY_W: 87, KEY_X: 88, KEY_Y: 89, KEY_Z: 90,
  K_SPACE: 32,
  K_BACKSPACE: 8,
  K_ENTER: 13,
  K_SHIFT: 16
};

INPUT.getKeyByCode = function(code){
  for(const key in INPUT.KEYS){
    if(code == INPUT.KEYS[key]){
      return key;
    }
  }
  return null;
}

// Configure which keys will be used. ALL OF THEM! :3
INPUT.KEYS_USED = INPUT.KEYS;

// Key state
INPUT.activeKeys = {};


INPUT.getMousePosition = function(){
  return INPUT._mousePos;
}

INPUT.key = function(which){
  if(!(which in INPUT.activeKeys)){
    return false;
  }
  return INPUT.activeKeys[which];
}

INPUT.onMouseDown = function(evt){
  SCENE.mouseDown(evt);
}
INPUT.onMouseUp = function(evt){
  SCENE.mouseUp(evt);
}
INPUT.onMouseMove = function(evt)
{
  var rect = GRAPHICS.getCanvas().getBoundingClientRect();
  INPUT._mousePos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
INPUT.onMouseOut = function(evt){}
INPUT.onKeyDown = function(evt){
  const key = INPUT.getKeyByCode(evt.which);
  if(evt.which in INPUT.activeKeys){
    INPUT.activeKeys[evt.which] = true;
  }
  if(key in INPUT.KEYS_USED){
    INPUT.EVENTS.push(INPUT.INPUT_EVENT(key, INPUT.KEY_EVENTS.KEY_DOWN));
  }  
}

INPUT.onKeyUp = function(evt){
  const key = INPUT.getKeyByCode(evt.which);
  if(evt.which in INPUT.activeKeys){
    INPUT.activeKeys[evt.which] = false;
  }
  if(key in INPUT.KEYS_USED){
    INPUT.EVENTS.push(INPUT.INPUT_EVENT(INPUT.getKeyByCode(evt.which), INPUT.KEY_EVENTS.KEY_UP));
  }  
}

INPUT.initInput = function(){
  for(let i in INPUT.KEYS_USED){
    let key = INPUT.KEYS_USED[i];
    INPUT.activeKeys[key] = false;
  }
  var canvas = GRAPHICS.getCanvas();
  canvas.addEventListener("mousedown", INPUT.onMouseDown);
  canvas.addEventListener("mouseup", INPUT.onMouseUp);
  canvas.addEventListener("mousemove", INPUT.onMouseMove);
  canvas.addEventListener("mouseout", INPUT.onMouseOut);
  window.addEventListener('keydown', INPUT.onKeyDown, false);
  window.addEventListener('keyup', INPUT.onKeyUp, false);
}