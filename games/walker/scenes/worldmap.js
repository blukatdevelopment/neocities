/*##############################################################################
# View a WORLDMAP WORLDMAP
##############################################################################*/

let WORLDMAP = {};
WORLDMAP.worldGrid = null;

WORLDMAP.isSetup = false;

WORLDMAP.setup = function(){
    WORLDMAP.isSetup = true;
    GRAPHICS.setDisplayMode(DISPLAY_MODES.static);
    WORLDMAP.worldGrid = WORLD.Generate.DetailedWorld();
    WORLDMAP.map = UI.COMPONENTS.Map.new(WORLDMAP.worldGrid);
    console.log("WORLDMAP Scene Loaded");
};

WORLDMAP.update = function(){
    if(!WORLDMAP.isSetup){
        WORLDMAP.setup();
    }
    if(INPUT.keyPress(INPUT.KEYS.K_M)){
    	SCENE.setActiveScene(SCENE.SCENES.GAME);
    }
    WORLDMAP.map.draw();
};


WORLDMAP.debugMessage = function(message){

};

WORLDMAP.destroyEntity = function(entity){};

WORLDMAP.setGameState = function(gameState){};
WORLDMAP.getGameState = function(){ return null; };