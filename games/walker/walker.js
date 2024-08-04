/*##############################################################################
#
#                  Section: Libraries
#
#
##############################################################################*/

/*##############################################################################
# Canvas
##############################################################################*/
var GRAPHICS = {};

GRAPHICS.init = function(){
  GRAPHICS._canvas = document.getElementById("mainCanvas");
  GRAPHICS._context = GRAPHICS._canvas.getContext("2d");
}

GRAPHICS.getCanvas = function(){
  return GRAPHICS._canvas;
}

GRAPHICS.getContext = function(){
  return GRAPHICS._context;
}

GRAPHICS.drawCircle = function(x, y, radius){
  let context = GRAPHICS.getContext();
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

GRAPHICS.drawLine = function(x1, y1, x2, y2){
  let context = GRAPHICS.getContext();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}

GRAPHICS.clearCanvas = function(){
  let context = GRAPHICS.getContext();
  let canvas = GRAPHICS.getCanvas();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
}

// XY is for top left corner.
GRAPHICS.drawBox = function(x, y, width, height){
  // Top
  GRAPHICS.drawLine(x, y, x+width, y);
  // Left
  GRAPHICS.drawLine(x, y, x, y+height); 
  // Bottom
  GRAPHICS.drawLine(x, y+height, x+width, y+height);
  // Right
  GRAPHICS.drawLine(x+width, y, x+width, y+height);
}

GRAPHICS.drawImage = function(image, x, y, width, height){
  let context = GRAPHICS.getContext();
  context.drawImage(image, x, y, width, height)
}

GRAPHICS.drawText = function(text, x, y){
  let context = GRAPHICS.getContext()
  context.font = "30px Arial";
  context.fillText(text, x, y);
}

GRAPHICS.loadImage = function(url){
  let element = new Image();
  element.src = url;
  return element;
}

/*##############################################################################
# Sprites
##############################################################################*/
var SPRITES = {};
SPRITES.Manager = {};

// TODO: use real classes if that makes sense
SPRITES.Manager.new = function(sheet, width, height, columns, rows, frameRate, animations){
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
    var ctx = GRAPHICS.getContext();
    var cvs = GRAPHICS.getCanvas();
    
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

/*##############################################################################
# Util
##############################################################################*/
var UTILITY = {}
UTILITY.randRange = function(min, max){
  return Math.random() * (max - min) + min;
}

UTILITY.isInsideBox = function(topLeft, bottomRight, point){
  var inX = point.x < bottomRight.x && point.x > topLeft.x;
  var inY = point.y < bottomRight.y && point.y > topLeft.y;
  return inX && inY;  
}


/*##############################################################################
# Main
##############################################################################*/
var MAIN = {};
MAIN.SCREEN_MIN = 0;
MAIN.SCREEN_MAX = 400;

MAIN.FPS = 60;
MAIN.START_TIME = Date.now();
MAIN.FRAME_DURATION = 1000 / MAIN.FPS
MAIN.LAG = 0;

MAIN.gameLoop = function(){
  requestAnimationFrame(MAIN.gameLoop, GRAPHICS.getCanvas());
  
  var current_time = Date.now();
  var elapsed = current_time - MAIN.START_TIME;
  MAIN.START_TIME = current_time;
  MAIN.LAG += elapsed;
  while(MAIN.LAG >= MAIN.FRAME_DURATION){
    SCENE.update();
    MAIN.LAG -= MAIN.FRAME_DURATION;
  }
}

MAIN.init = function(){
  GRAPHICS.init();
  INPUT.initInput();
}

MAIN.main = function(){
  this.init();
  this.gameLoop();
}

MAIN.main();

/*##############################################################################
#
#                       Section: Game code
#
##############################################################################*/

/*##############################################################################
# SFX
# TODO: Add an init which loads all sounds at startup
##############################################################################*/
var SOUND = {}

SOUND.EFFECTS = {
  PEW: "https://github.com/blukatdevelopment/neocities/raw/main/assets/pew.mp3",
  IMPACT: "https://github.com/blukatdevelopment/neocities/raw/main/assets/impact.mp3",
  EXPLOSION: "https://github.com/blukatdevelopment/neocities/raw/main/assets/explosion.mp3"
};

SOUND.playSound = function(file){
  var audio = new Audio(file);
  audio.play();
}

/*##############################################################################
# Scene management
##############################################################################*/
var SCENE = {};

// Config
SCENE.SCENES = {
  START: "start",
  GAME: "game",
  END: "lose",
  NEXT: "next"
};

SCENE._activeScene = SCENE.SCENES.START;

SCENE.mouseDown = function(evt){
  var activeScene = this.getActiveScene();
  if(activeScene != null){
    activeScene.mouseDown(evt);
  }
}

SCENE.mouseUp = function(evt){
  var activeScene = this.getActiveScene();
  if(activeScene != null){
    activeScene.mouseUp(evt);
  }
}

SCENE.mouseDown = function(evt){
  var activeScene = this.getActiveScene();
  if(activeScene != null){
    activeScene.mouseDown(evt);
  }
}

SCENE.update = function(){
  var activeScene = SCENE.getActiveScene();
  if(activeScene != null){
    activeScene.update();
  }
}

SCENE.getActiveScene = function(){
  switch(SCENE._activeScene){
    case SCENE.SCENES.GAME:
      return game;
    case SCENE.SCENES.START:
      return start;
  }
      return null;
}

SCENE.setActiveScene = function(scene){
  SCENE._activeScene = scene;
}

/*##############################################################################
# Scene: Start Menu
##############################################################################*/
var start = {};

start.mouseUp = function(){}

start.drawStartButton = function(){
    GRAPHICS.drawBox(100, 100, 100, 100);
    GRAPHICS.drawText("Start", 100, 150);
    if(this.isStartButtonSelected()){
        GRAPHICS.drawLine(0, 0, 100, 100);
        GRAPHICS.drawLine(0, 400, 100, 200);
        GRAPHICS.drawLine(400, 0, 200, 100);
        GRAPHICS.drawLine(400, 400, 200, 200);
    }
}

start.update = function(){
    GRAPHICS.clearCanvas();
    this.drawStartButton();
}

start.isStartButtonSelected = function(){
    var boxTopLeft = { x: 100, y: 100 };
    var boxBottomRight = { x: 200, y: 200};
    var point = INPUT.getMousePosition();
    if(!point){
      return false;
    }
    if(typeof point === "undefined"){
        return false;
    }
    return UTILITY.isInsideBox(boxTopLeft, boxBottomRight, point);
}

start.mouseDown = function(){
    if(this.isStartButtonSelected()){
        SCENE.setActiveScene(SCENE.SCENES.GAME);
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
  GRAPHICS.clearCanvas();
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
  var spriteSheet = GRAPHICS.loadImage("https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/player.png");
  wkr.spriteManager = SPRITES.Manager.new(spriteSheet, 16, 32, 10, 10, 6, walker.animations);
  //console.log("dasd" + wkr.spriteManager.animations);
  wkr.spriteManager.setAnimation("SOUTH_STAND");
  wkr.update = function(){
    wkr.move();
  }
  
  wkr.move = function(){
    var x_movement = 0;
    var y_movement = 0;
    if(INPUT.key(INPUT.KEYS.K_W)){
      y_movement -= wkr.speed;
    }
    if(INPUT.key(INPUT.KEYS.K_S)){
      y_movement += wkr.speed;
    }
    if(INPUT.key(INPUT.KEYS.K_A)){
      x_movement -= wkr.speed;
    }
    if(INPUT.key(INPUT.KEYS.K_D)){
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

var COLLISION = {};

// TODO: use real classes if that makes sense
COLLISION.BoxCollider = {};
COLLISION.BoxCollider.new = function(){
  
}