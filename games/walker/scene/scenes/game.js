/*##############################################################################
# Scene: gameplay
##############################################################################*/
SCENE.SCENES.Game = function(){
  let gm = SCENE.SCENES.BaseScene();
  gm.name = "Game";
  gm.isSetup = false;
  gm.gameState = GAMESTATES.play;
  gm.levelRenderer = null;

  gm.setup = function(){
    gm.levelRenderer = LEVEL.Renderer.new();
    gm.levelRenderer.init();
    // TODO: Change this when done debugging
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

  gm.destroyEntity = function(entity){
    gm.levelRenderer.destroyEntity(entity);
  };
  return gm;
};