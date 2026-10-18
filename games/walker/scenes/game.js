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
GAME.gameState = GAMESTATES.play;
GAME.ui = null;

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

  for(let i = 0; i< 1; i++){
    let se = ACTORFACTORY.simpleEnemy();
    se.setPosition(VECTOR2.new(i * 100, 400));
    GAME.addEntity(se);
  }

  GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
  GAME.ui = UI.COMPONENTS.ComponentManager.new();
  GAME.isSetup = true;
};

GAME.update = function(){
  if(!GAME.isSetup){
    GAME.setup();
  }

  if(GAME.gameState === GAMESTATES.play){
    GAME.updateWorld();
  }
  GAME.ui.update();
  GAME.drawGAMEScreen();
  
};

GAME.updateWorld = function(){
  for(let e in GAME.entities){
    let entity = GAME.entities[e];
    if(entity){
      entity.update();
    }
  }
};

GAME.updateInventory = function(){
  GAME.inventory.update();
  GAME.drawGAMEScreen();
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
  GAME.ui.draw();
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

GAME.mouseUp = function(evt){};

GAME.debugMessage = function(message){
  GAME.debugText = message;
};

GAME.destroyEntity = function(entity){
  if(entity == GAME.walker){
    console.log("Game over!");
  }
  // Removes entity after update loop completes.
  UTILITY.delayExecute(0, () => { GAME.removeEntity(entity); });
};

GAME.setGameState = function(gameState){
  GAME.gameState = gameState;
};

GAME.getGameState = function(){
  return GAME.gameState;
}