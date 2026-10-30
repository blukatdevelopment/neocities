/*##############################################################################
# Scene management
##############################################################################*/

// Place an instance of each scene here
SCENE._instances = {};

SCENE._cursorSprite = null;
SCENE._levelRect = null;
SCENE._activeScene = null;

SCENE.getDefaultScene = function(){
  return SCENE.SCENES.Start();
};

SCENE.update = function(){
  var activeScene = SCENE.getActiveScene();
  if(activeScene){
    activeScene.update();
    SCENE.drawCursor();  
  }
  else{
    console.log("Scene is null")
  }
};

// TODO: make scenes configurable
SCENE.getActiveScene = function(){
  if(SCENE._activeScene == null){
    SCENE.setActiveScene(SCENE.getDefaultScene());
  }
  if(SCENE._instances[SCENE._activeScene]){
    return SCENE._instances[SCENE._activeScene];
  }
  return null;
};

// accepts iScene
SCENE.setActiveScene = function(scene){
  UTILITY.log("SCENE.setActiveScene", "Setting scene " + scene.name, {});
  SCENE._activeScene = scene.name;
  if(SCENE._instances[scene.name]){
    
  }
  else{
    SCENE._instances[scene.name] = scene;
  }
  
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

SCENE.setLevelRect = function(rect){
  SCENE._levelRect = rect;
};

SCENE.getLevelRect = function(){
  return SCENE._levelRect;
};