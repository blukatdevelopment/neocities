/*##############################################################################
# Scene: LevelEditor
##############################################################################*/
SCENE.SCENES.LevelEditor = function(){
  let le = SCENE.SCENES.BaseScene();
  le.name = "LevelEditor";
  le.isSetup = false;
  le.gameState = GAMESTATES.pause;
  le.levelRenderer = null;
  le.input = LEVEL.Editor.EditorInputController.new(le);
  le.physics = null;
  le.selected = null;
  le.tooltip = null;

  le.setup = function(){
    le.levelRenderer = LEVEL.Renderer.new();
    le.levelRenderer.init();
    // Toggle debug level
    le.levelRenderer.loadData(LEVEL.Generate.DebugLevel());
    le.levelRenderer.ui = UI.COMPONENTS.LevelEditorUIManager.new(le);
    le.levelRenderer.updateCursor = function(){
      SCENE.updateCursor(SPRITES.static.cursors.roundBlack);
    };
    le.physics = le.levelRenderer.physics;
    //le.levelRenderer.loadData(LEVEL.Generate.Grass());
    le.isSetup = true;
  };

  le.update = function(){
    if(!le.isSetup){
      le.setup();
    }
    GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
    le.levelRenderer.update();
    le.input.update();
    if(le.tooltip){
      GRAPHICS.drawTooltip(le.tooltip);
    }
  };
  le.createEntity = function(entity){
    le.levelRenderer.addEntity(entity);
  };
  le.destroyEntity = function(entity){
    le.levelRenderer.destroyEntity(entity);
  };
  le.notification = function(message){
    le.levelRenderer.notification(message);
  }
  le.getPlayerOne = function(){
    return le.levelRenderer.player;
  };
  le.emitLight = function(light){
    le.levelRenderer.emitLight(light);
  };
  return le;
};