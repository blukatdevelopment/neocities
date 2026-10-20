/*##############################################################################
# Manages Rendering, generating, and serializing/deserializing levels
##############################################################################*/

let LEVEL = {};
LEVEL.Data = {};
LEVEL.Data.new = function(){
    let ld = {};
    return ld;
};

LEVEL.Renderer = {};
LEVEL.Renderer.Layers = {};
LEVEL.Renderer.Layers.Background = "background";
LEVEL.Renderer.Layers.Ground = "ground";

LEVEL.Renderer.new = function(){
    let lr = {
        player: null,
        entities: [],
        scenery: [], // rendered first,
        ui: null
    };
    lr.init = function(){
        GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
        lr.physics = PHYSICS.Controller.new();
        lr.player = ACTORFACTORY.playerOne();
        lr.addEntity(lr.player);
        lr.ui = UI.COMPONENTS.ComponentManager.new();
        lr.ui.linkInventories(lr.player);
    };
    lr.loadData = function(data){

    };
    lr.update = function(){
        if(SCENE.getGameState() === GAMESTATES.play){
            for(let entity of lr.entities){
                if(entity){
                  entity.update();
                }
            }
        }
        lr.ui.update();
        lr.updateCursor();
        lr.drawLevel();
    };
    lr.cursorInRange = function(){
        let pos = GRAPHICS.getWorldCursor();
        let walkerPos = lr.player.centeredPosition();
        let distance = pos.distance(walkerPos);
        return distance < SETTINGS.interactionRange;
    };
    lr.updateCursor = function(){
        if(lr.cursorInRange()){
            SCENE.updateCursor(SPRITES.static.cursors.roundBlack);
          }
          else{
            SCENE.updateCursor(SPRITES.static.cursors.roundRed);
          }
    };
    lr.drawLevel = function(){
          GRAPHICS.clearCanvas();
      for(let renderer of lr.scenery){
        renderer.draw();
      }
      for(let e in lr.entities){
        let entity = lr.entities[e];
        entity.draw();
      }
      lr.ui.draw();
    }
    lr.addEntity = function(entity){
        lr.entities.push(entity);
        lr.physics.registerCollider(entity.getCollider());
    };
    lr.destroyEntity = function(entity){
      if(entity == lr.player){
        console.log("Game over!");
      }
      // Removes entity after update loop completes.
      UTILITY.delayExecute(0, () => { lr.removeEntity(entity); });
    };
    lr.removeEntity = function(entity){
      lr.entities = lr.entities.filter((ent) => ent !== entity);
      lr.physics.unregisterCollider(entity.getCollider());
    };
    return lr;
};