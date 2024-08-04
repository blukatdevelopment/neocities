/*##############################################################################
# Input
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
  if(evt.which in INPUT.activeKeys){
    INPUT.activeKeys[evt.which] = true;
  }
}
INPUT.onKeyUp = function(evt){
  if(evt.which in INPUT.activeKeys){
    INPUT.activeKeys[evt.which] = false;
  }
}

INPUT.initInput = function(){
  for(let i in KEYS_USED){
    let key = KEYS_USED[i];
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