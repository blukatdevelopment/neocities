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
# Sprites
##############################################################################*/
var spriteManager = {};


spriteManager.NewSpriteManager = function(sheet, width, height, columns, rows, frameRate, animations){
  var mgr = {
    sheet: sheet,
    width: width,
    height: height,
    columns: columns,
    rows: rows,
    index: 1,
    frameRate: frameRate,
    animations: animations,
    animation: null
  };
  
  mgr.draw = function(posX, posY){
    var ctx = getContext();
    var cvs = getCanvas();
    
    var column = parseInt(mgr.index % mgr.rows);
    var row = parseInt(mgr.index / mgr.columns);
    //console.log("column "+ column + " row " + row);
    var offX = column * mgr.width;
    var offY = row * mgr.height;
    //console.log("offX: " + offX + " offY" + offY);
    ctx.drawImage(
      sheet, // Image
      offX, // X offset into image
      offY, // Y offset into image
      mgr.width, // sprite width
      mgr.height, // sprite height
      posX, // X offset drawing to canvas
      posY, // Y offset drawing to canvas
      mgr.width, // size drawing to canvas
      mgr.height // size drawing to canvas
      );
    mgr.step();
    return;
  }
  
  mgr.setAnimation = function(key){
    if(mgr.animations && mgr.animations[key]){
      mgr.animation = mgr.animations[key];
    }
    else{
      console.log("Could not find animation: " + key);
    }
  }
  
  mgr.step = function(){
    if(mgr.animation){
      mgr.index++;
      if(mgr.index > mgr.animation[1]){
        mgr.index = mgr.animation[0];
      }
    }
  }
  return mgr;
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

walker.animations = {
  "SOUTH_STAND": [0, 7]
};

walker.NewWalker = function(){
  var wkr = {
    id: game.getNextId(),
    x: 100,
    y: 100,
    size: 50,
    speed: 5
  };
  var spriteSheet = loadImage("https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/player.png");
  wkr.spriteManager = spriteManager.NewSpriteManager(spriteSheet, 16, 32, 10, 10, 6, walker.animations);
  console.log("dasd" + wkr.spriteManager.animations);
  wkr.spriteManager.setAnimation("SOUTH_STAND");
  wkr.update = function(){
    wkr.move();
  }
  
  wkr.move = function(){
    var x_movement = 0;
    var y_movement = 0;
    if(key(K_W)){
      y_movement -= wkr.speed;
    }
    if(key(K_S)){
      y_movement += wkr.speed;
    }
    if(key(K_A)){
      x_movement -= wkr.speed;
    }
    if(key(K_D)){
      x_movement += wkr.speed;
    }
    wkr.x += x_movement;
    wkr.y += y_movement;
  }
  
  wkr.draw = function(){
    //drawBox(walker.x, walker.y, walker.size, walker.size);
    //drawImage(image, walker.x, walker.y, walker.size, walker.size);
    wkr.spriteManager.draw(wkr.x, wkr.y);
  }
  return wkr;
}


/*##############################################################################
# colliders
# Manages collection of BoxColliders with X, Y, and size
##############################################################################*/

var collision = {};

collision.NewBoxCollider = function(){
  
}