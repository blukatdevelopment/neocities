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
  GAME.walker.teleport(VECTOR2.new(100, 300));
  GAME.addEntity(GAME.walker);

  // Add in background
  let background = SPRITES.SpriteRenderer.new(SPRITES.static.village.village, VECTOR2.new(0,0));
  GAME.scenery.push(background);
  
  // Add in some random pieces of scenery
  for(let i = 0; i < 1; i++){
    let sc = ENTITYFACTORY.Scenery(SPRITES.static.items.One);
    sc.setPosition(VECTOR2.new(32*i, 32*i));
    GAME.addEntity(sc);
  }

  for(let i = 0; i < 10; i++){
    let pu = ENTITYFACTORY.Pickup(SPRITES.static.items.Two);
    pu.setPosition(VECTOR2.new(i * 32, 100));
    GAME.addEntity(pu);
  }

  GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
  GAME.isSetup = true;
};

GAME.update = function(){
  if(!GAME.isSetup){
    GAME.setup();
  }
  for(let e in GAME.entities){
    let entity = GAME.entities[e];
    if(entity){
      entity.update();
    }
    //entity.label = entity.getName() + entity.collider.absoluteRect().toString();
  }
  this.drawGAMEScreen();
};

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
  GAME.updateCursor();
  SCENE.drawCursor();
};

GAME.updateCursor = function(){
  if(GAME.cursorInRange()){
    SCENE.updateCursor(SPRITES.static.cursors.roundBlack);
  }
  else{
    SCENE.updateCursor(SPRITES.static.cursors.roundRed);
  }
};

GAME.cursorInRange = function(){
  let pos = GRAPHICS.getWorldCursor();
  let walkerPos = GAME.walker.centeredPosition();
  let distance = pos.distance(walkerPos);
  return distance < SETTINGS.interactionRange;
};

GAME.addEntity = function(entity){
  GAME.entities.push(entity);
  GAME.physics.registerCollider(entity.getCollider());
};

GAME.removeEntity = function(entity){
  GAME.entities = GAME.entities.filter((ent) => ent !== entity);
  GAME.physics.unregisterCollider(entity.getCollider());
};

GAME.mouseDown = function(evt){
  let point = INPUT.getMousePosition();
  if(evt.button == INPUT.RIGHT_CLICK){
    // Convert to viewport coords
    point.x = GRAPHICS.downScale(point.x);
    point.y = GRAPHICS.downScale(point.y);
    // Convert to point in world space
    point = GRAPHICS.getWorldPoint(point);
    if(GAME.cursorInRange()){
      GAME.walker.interactAtPoint(point);
    }
  }
  SCENE.updateCursor(SPRITES.static.cursors.roundGreen);
};

GAME.mouseUp = function(evt){};

GAME.debugMessage = function(message){
  GAME.debugText = message;
};

GAME.destroyEntity = function(entity){
  GAME.removeEntity(entity);
};