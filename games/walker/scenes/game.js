/*##############################################################################
# Scene: gameplay
##############################################################################*/

var GAME = {};
GAME.isSetup = false;
GAME.walker = null;
GAME.id = 0;

GAME.update = function(){
  if(!GAME.isSetup){
    GAME.setup();
  }
  if(GAME.walker != null){
    GAME.walker.update();
  }
  this.drawGAMEScreen();
}

GAME.setup = function(){
  GAME.walker = Actor.new();
  GAME.isSetup = true;
}

GAME.drawGAMEScreen = function(){
  GRAPHICS.clearCanvas();
  if(GAME.walker != null){
    GAME.walker.draw();
  }
}

GAME.mouseDown = function(evt){}

GAME.mouseUp = function(evt){}

GAME.getNextId = function(){
  var next = GAME.id;
  GAME.id += 1;
  return next;
}