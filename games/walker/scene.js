/*##############################################################################
# Scene management
##############################################################################*/
var SCENE = {};

// Configured for the current project
SCENE.SCENES = {};
SCENE.SCENES.START = "start";
SCENE.SCENES.GAME = "game";
SCENE.SCENES.WORLDMAP = "worldmap";

SCENE.DEFAULT_SCENE = SCENE.SCENES.START;

SCENE._activeScene = SCENE.DEFAULT_SCENE;
SCENE._cursorSprite = null;

SCENE.update = function(){
  var activeScene = SCENE.getActiveScene();
  if(activeScene){
    activeScene.update();
    SCENE.drawCursor();  
  }
};

// Returns iScene
// TODO: make scenes configurable
SCENE.getActiveScene = function(){
  switch(SCENE._activeScene){
    case SCENE.SCENES.GAME:
      return GAME;
    case SCENE.SCENES.START:
      return START;
    case SCENE.SCENES.WORLDMAP:
      return WORLDMAP;
  }
      return null;
};

// accepts iScene
SCENE.setActiveScene = function(scene){
  UTILITY.log("SCENE.setActiveScene", "Setting scene " + scene, {});
  SCENE._activeScene = scene;
};

SCENE.debugMessage = function(message){
  var activeScene = SCENE.getActiveScene();
  activeScene.debugMessage(message);
};

SCENE.destroyEntity = function(entity){
  var activeScene = SCENE.getActiveScene();
  activeScene.destroyEntity(entity);
};

SCENE.drawCursor = function(){
  let pos = GRAPHICS.getWorldCursor();

  if(pos && SCENE._cursorSprite){
    let sprite = SCENE._cursorSprite;
    SPRITES.renderSprite(pos.x, pos.y, sprite.index, sprite.sheet);
  }
};

SCENE.updateCursor = function(sprite){
  SCENE._cursorSprite = sprite;
};

SCENE.init = function(){
  SCENE.updateCursor(SPRITES.static.cursors.roundBlack);
};

SCENE.setGameState = function(gameState){
  var activeScene = SCENE.getActiveScene();
  activeScene.setGameState(gameState);
};

SCENE.getGameState = function(){
  var activeScene = SCENE.getActiveScene();
  return activeScene.getGameState();
};