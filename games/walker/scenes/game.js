/*##############################################################################
# Scene: gameplay
##############################################################################*/

var GAME = {};
GAME.isSetup = false;
GAME.walker = null;
GAME.entities = [];
GAME.scenery = [];
GAME.physics = false;
GAME.debugText = "";

GAME.setup = function(){
  GAME.physics = PHYSICS.Controller.new();

  GAME.walker = ACTORFACTORY.playerOne();
  GAME.walker.teleport(VECTOR3.new(100, 0, 300));
  GAME.addEntity(GAME.walker);

  // Add in background
  let background = SPRITES.SpriteRenderer.new(SPRITES.static.village.village, VECTOR3.new(0,0,0));
  GAME.scenery.push(background);
  
  // Add in some random pieces of scenery
  for(let i = 0; i < 1; i++){
    let sc = ENTITYFACTORY.Scenery(SPRITES.static.items.One);
    sc.name += "" + i;
    //sc.setPosition(VECTOR3.new(UTILITY.randRange(16, 1008), 0, UTILITY.randRange(16, 1008)));
    sc.setPosition(VECTOR3.new(32*i, 0, 32*i));
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
    //entity.label = entity.getName() + entity.collider.absoluteRect().toString();
  }
  //GAME.debugMessage(GAME.walker.collider.absoluteRect().toString());
  //GAME.debugMessage(GAME.walker.label);
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

  GRAPHICS.drawText(GAME.debugText, 10, 10);
}

GAME.addEntity = function(entity){
  GAME.entities.push(entity);
  GAME.physics.registerCollider(entity.getCollider());
}

GAME.mouseDown = function(evt){}

GAME.mouseUp = function(evt){}

GAME.debugMessage = function(message){
  GAME.debugText = message;
};