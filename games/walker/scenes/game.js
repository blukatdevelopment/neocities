/*##############################################################################
# Scene: gameplay
##############################################################################*/

var GAME = {};
GAME.isSetup = false;
GAME.walker = null;
GAME.entities = [];
GAME.scenery = [];
GAME.physics = false;

GAME.setup = function(){
  GAME.physics = PHYSICS.Controller.new();

  GAME.walker = ACTORFACTORY.playerOne();
  GAME.walker.teleport(VECTOR3.new(100, 0, 100));
  GAME.addEntity(GAME.walker);

  // Add in background
  let background = SPRITES.SpriteRenderer.new(SPRITES.static.village.village, VECTOR3.new(0,0,0));
  GAME.scenery.push(background);
  
  // Add in some random pieces of scenery
  for(let i = 0; i<10; i++){
    let sc = ENTITYFACTORY.Scenery(SPRITES.static.items.One);
    sc.setPosition(VECTOR3.new(UTILITY.randRange(16, 1008), 0, UTILITY.randRange(16, 1008)));
    GAME.addEntity(sc);
  }

  GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
  GAME.isSetup = true;
}

GAME.update = function(){
  if(!GAME.isSetup){
    GAME.setup();
  }
  for(let e in GAME.entities){
    let entity = GAME.entities[e];
    entity.update();
  }

  this.drawGAMEScreen();
}

GAME.drawGAMEScreen = function(){
  GRAPHICS.clearCanvas();
  for(let renderer of GAME.scenery){
    renderer.draw();
  }
  for(let e in GAME.entities){
    let entity = GAME.entities[e];
    entity.draw();
  }
}

GAME.addEntity = function(entity){
  GAME.entities.push(entity);
  GAME.physics.registerCollider(entity.getCollider);
}

GAME.mouseDown = function(evt){}

GAME.mouseUp = function(evt){}