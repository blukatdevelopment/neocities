/*##############################################################################
#
#                  Section: Libraries
#
#
##############################################################################*/

/*##############################################################################
# Canvas
##############################################################################*/

var _canvas;
var _context;

function initContext(){
  _canvas = document.getElementById("mainCanvas");
  _context = _canvas.getContext("2d");
}

function getCanvas(){
  return _canvas;
}

function getContext(){
  return _context;
}

function drawCircle(x, y, radius){
  let context = getContext();
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

function drawLine(x1, y1, x2, y2){
  let context = getContext();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

function clearCanvas(){
  let context = getContext();
  let canvas = getCanvas();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
}

// XY is for top left corner.
function drawBox(x, y, width, height){
  // Top
  drawLine(x, y, x+width, y);
  // Left
  drawLine(x, y, x, y+height); 
  // Bottom
  drawLine(x, y+height, x+width, y+height);
  // Right
  drawLine(x+width, y, x+width, y+height);
}

function drawImage(image, x, y, width, height){
  let context = getContext();
  context.drawImage(image, x, y, width, height)
}

function drawText(text, x, y){
  let context = getContext()
  context.font = "30px Arial";
  context.fillText(text, x, y);
}

function loadImage(url){
  let element = new Image();
  element.src = url;
  return element;
}

/*##############################################################################
# Input
##############################################################################*/
var _mousePos;
function getMousePosition(){
  return _mousePos;
}

var K_W = 87,
K_A = 65,
K_S = 83,
K_D = 68,
K_SPACE = 32;
var KEYS_USED = [K_W, K_A, K_S, K_D, K_SPACE];
var input = {
  keys: {}
};

function key(which){
  if(!(which in input.keys)){
    return false;
  }
  return input.keys[which];
}

function onMouseDown(evt){
  scene.mouseDown(evt);
}
function onMouseUp(evt){
  scene.mouseUp(evt);
}
function onMouseMove(evt)
{
  var rect = getCanvas().getBoundingClientRect();
  _mousePos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function onMouseOut(evt){}
function onKeyDown(evt){
  if(evt.which in input.keys){
    input.keys[evt.which] = true;
  }
}
function onKeyUp(evt){
  if(evt.which in input.keys){
    input.keys[evt.which] = false;
  }
}

function initInput(){
  for(let i in KEYS_USED){
    let key = KEYS_USED[i];
    input.keys[key] = false;
  }
  var canvas = document.getElementById("mainCanvas");
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseout", onMouseOut);
  window.addEventListener('keydown', this.onKeyDown, false);
  window.addEventListener('keyup', this.onKeyUp, false);
}

/*##############################################################################
# Util
##############################################################################*/

function randRange(min, max){
  return Math.random() * (max - min) + min;
}

function isInsideBox(topLeft, bottomRight, point){
  var inX = point.x < bottomRight.x && point.x > topLeft.x;
  var inY = point.y < bottomRight.y && point.y > topLeft.y;
  return inX && inY;  
}


/*##############################################################################
# Main
##############################################################################*/
var main = {};
main.SCREEN_MIN = 0;
main.SCREEN_MAX = 400;

main.fps = 60;
main.startTime = Date.now();
main.frameDuration = 1000 / main.fps
main.lag = 0;
console.log("Frame duration " + main.frameDuration);

main.gameLoop = function(){
  requestAnimationFrame(main.gameLoop, getCanvas());
  
  var current_time = Date.now();
  var elapsed = current_time - main.startTime;
  main.startTime = current_time;
  main.lag += elapsed;
  while(main.lag >= main.frameDuration){
    scene.update();
    main.lag -= main.frameDuration;
  }
}

main.init = function(){
  initContext();
  initInput();
}

main.main = function(){
  this.init();
  this.gameLoop();
}

main.main();

/*##############################################################################
#
#                       Section: Game code
#
##############################################################################*/

/*##############################################################################
# SFX
##############################################################################*/
const SFX_PEW = "https://github.com/blukatdevelopment/neocities/raw/main/assets/pew.mp3",
SFX_IMPACT = "https://github.com/blukatdevelopment/neocities/raw/main/assets/impact.mp3",
SFX_EXPLOSION = "https://github.com/blukatdevelopment/neocities/raw/main/assets/explosion.mp3";

function playSound(file){
  var audio = new Audio(file);
  audio.play();
}

/*##############################################################################
# Scene management
##############################################################################*/
var scene = {};
scene.START_SCENE = "start",
scene.GAME_SCENE = "game",
scene.END_SCENE = "lose",
scene.NEXT_SCENE = "next";
scene.activeScene = scene.START_SCENE;

scene.mouseDown = function(evt){
  var scene = this.getActiveScene();
  if(scene != null){
    scene.mouseDown(evt);
  }
}

scene.mouseUp = function(evt){
  var scene = this.getActiveScene();
  if(scene != null){
    scene.mouseUp(evt);
  }
}

scene.mouseDown = function(evt){
  var scene = this.getActiveScene();
  if(scene != null){
    scene.mouseDown(evt);
  }
}

scene.update = function(){
  var scene = this.getActiveScene();
  if(scene != null){
    scene.update();
  }
}

scene.getActiveScene = function(){
  switch(this.activeScene){
    case this.GAME_SCENE:
      return game;
    case this.START_SCENE:
      return start;
  }
      return null;
}

/*##############################################################################
# Scene: Start Menu
##############################################################################*/
var start = {};

start.mouseUp = function(){}

start.update = function(){
    clearCanvas();
    this.drawStartButton();
}

start.drawStartButton = function(){
    drawBox(100, 100, 100, 100);
    drawText("Start", 100, 150);
    if(this.isStartButtonSelected()){
        drawLine(0, 0, 100, 100);
        drawLine(0, 400, 100, 200);
        drawLine(400, 0, 200, 100);
        drawLine(400, 400, 200, 200);
    }
}

start.update = function(){
    clearCanvas();
    this.drawStartButton();
}

start.isStartButtonSelected = function(){
    var boxTopLeft = { x: 100, y: 100 };
    var boxBottomRight = { x: 200, y: 200};
    var point = getMousePosition();
    if(typeof point === "undefined"){
        return false;
    }
    return isInsideBox(boxTopLeft, boxBottomRight, point);
}

start.mouseDown = function(){
    if(this.isStartButtonSelected()){
        scene.activeScene = scene.GAME_SCENE;
    }
}


/*##############################################################################
# Scene: Walker demo
##############################################################################*/


var game = {};
game.isSetup = false;
game.walker = null;

game.update = function(){
  if(!game.isSetup){
    game.setup();
  }
  if(game.walker != null){
    game.walker.update();
  }
  this.drawGameScreen();
}

game.setup = function(){
  game.walker = walker.NewWalker();
  game.isSetup = true;
}

game.drawGameScreen = function(){
  clearCanvas();
  if(game.walker != null){
    game.walker.draw();
  }
}

game.mouseDown = function(evt){}

game.mouseUp = function(evt){}

game.id = 0;

game.getNextId = function(){
  var next = game.id;
  game.id += 1;
  return next;
}


/*##############################################################################
# Walker class
##############################################################################*/
var walker = {};

walker.NewWalker = function(){
  var walker = {
    id: game.getNextId(),
    x: 100,
    y: 100,
    size: 50,
    speed: 5,
    image: loadImage("https://raw.githubusercontent.com/blukatdevelopment/neocities/main/assets/fire_dress.png")
  };
  
  walker.update = function(){
    walker.move();
  }
  
  walker.move = function(){
    var x_movement = 0;
    var y_movement = 0;
    if(key(K_W)){
      y_movement -= walker.speed;
    }
    if(key(K_S)){
      y_movement += walker.speed;
    }
    if(key(K_A)){
      x_movement -= walker.speed;
    }
    if(key(K_D)){
      x_movement += walker.speed;
    }
    walker.x += x_movement;
    walker.y += y_movement;
  }
  
  walker.draw = function(){
    //drawBox(walker.x, walker.y, walker.size, walker.size);
    drawImage(walker.image, walker.x, walker.y, walker.size, walker.size);
  }
  return walker;
}