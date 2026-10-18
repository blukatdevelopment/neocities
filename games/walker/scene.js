/*##############################################################################
# Scene management
##############################################################################*/
var SCENE = {};

// Configured for the current project
SCENE.SCENES = {
  START: "start",
  GAME: "GAME",
  END: "lose",
  NEXT: "next"
};

SCENE._activeScene = SCENE.SCENES.START;
SCENE._cursorSprite = null;

SCENE.update = function(){
  var activeScene = SCENE.getActiveScene();
  activeScene.update();
};

// Returns iScene
// TODO: make scenes configurable
SCENE.getActiveScene = function(){
  switch(SCENE._activeScene){
    case SCENE.SCENES.GAME:
      return GAME;
    case SCENE.SCENES.START:
      return START;
  }
      return null;
};

// accepts iScene
SCENE.setActiveScene = function(scene){
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