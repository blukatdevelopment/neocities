/*##############################################################################
# View a world map
##############################################################################*/
SCENE.SCENES.WorldMap = function(){
    let wm = SCENE.SCENES.BaseScene();
    wm.name = "worldmap";
    wm.worldGrid = SCENE.SCENES.BaseScene
    wm.setup = function(){
        wm.isSetup = true;
        GRAPHICS.setDisplayMode(DISPLAY_MODES.static);
        wm.worldGrid = WORLD.Generate.DetailedWorld();
        wm.map = UI.COMPONENTS.Map.new(wm.worldGrid);
        console.log("wm Scene Loaded");
    };

    wm.update = function(){
        if(!wm.isSetup){
            wm.setup();
        }
        if(INPUT.keyPress(INPUT.KEYS.K_M)){
            SCENE.setActiveScene(SCENE.SCENES.Game());
        }
        wm.map.draw();
    };

    return wm;
};
