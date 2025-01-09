/*##############################################################################
# Scene: gameplay
##############################################################################*/

var GAME = {};
GAME.isSetup = false;
GAME.walker = null;
GAME.enemies = [];
GAME.id = 0;

GAME.update = function(){
  if(!GAME.isSetup){
    GAME.setup();
  }
  if(GAME.walker != null){
    GAME.walker.update();
  }
  for(let e in GAME.enemies){
    let enemy = GAME.enemies[e];
    enemy.update();
  }

  this.drawGAMEScreen();
}

GAME.setup = function(){
  GAME.walker = Actor.new(Agents.PLAYER_ONE);
  for(let i = 0; i<1; i++){
    let enemy = Actor.new(Agents.ENEMY);
    GAME.enemies.push(enemy);
  }
  GAME.isSetup = true;
}

GAME.drawGAMEScreen = function(){
  GRAPHICS.clearCanvas();
  if(GAME.walker != null){
    GAME.walker.draw();
  }
  for(let e in GAME.enemies){
    let enemy = GAME.enemies[e];
    enemy.draw();
  }
}

GAME.mouseDown = function(evt){}

GAME.mouseUp = function(evt){}

GAME.getNextId = function(){
  var next = GAME.id;
  GAME.id += 1;
  return next;
}