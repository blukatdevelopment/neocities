/*##############################################################################
# Scene: gameplay
##############################################################################*/
SCENE.SCENES.Game = function(){
  let gm = SCENE.SCENES.BaseScene();
  gm.name = SCENES.game;
  gm.isSetup = false;
  gm.gameState = GAMESTATES.play;
  gm.levelRenderer = null;

  gm.setup = function(){
    gm.levelRenderer = LEVEL.Renderer.new();
    gm.levelRenderer.init();
    // Toggle debug level
    gm.levelRenderer.loadData(LEVEL.Static.TestLevel());
    gm.levelRenderer.loadData(LEVEL.Generate.DebugLevel());
    gm.isSetup = true;
  };

  gm.update = function(){
    if(!gm.isSetup){
      gm.setup();
    }
    GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
    gm.levelRenderer.update();
  };
  gm.createEntity = function(entity){
    gm.levelRenderer.addEntity(entity);
  };
  gm.destroyEntity = function(entity){
    gm.levelRenderer.destroyEntity(entity);
  };
  gm.notification = function(message){
    gm.levelRenderer.notification(message);
  }
  gm.getPlayerOne = function(){
    return gm.levelRenderer.player;
  };
  gm.emitLight = function(light){
    gm.levelRenderer.emitLight(light);
  };
  gm.boundsCheck = function(rect){
    return gm.levelRenderer.boundsCheck(rect);
  };
  return gm;
};