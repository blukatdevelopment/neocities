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
    le.levelRenderer.loadData(LEVEL.Static.TestLevel());
    le.levelRenderer.ui = UI.COMPONENTS.LevelEditorUIManager.new(le);
    le.ui = le.levelRenderer.ui;
    le.levelRenderer.updateCursor = function(){
      SCENE.updateCursor(SPRITES.static.cursors.roundBlack);
    };
    le.physics = le.levelRenderer.physics;
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
  le.export = function(){
    console.log("Export started");
    
    console.log("Preparing data");
    let dataObj = le.levelRenderer.getData();
    console.log("Level dataobj:" + JSON.stringify(dataObj));
    let data = dataObj.toJs();
    
    console.log("Downloading data");
    let fileName = "helloWorld_" + UTILITY.timeStamp() + ".txt";
    UTILITY.download(data, fileName);
  };
  return le;
};