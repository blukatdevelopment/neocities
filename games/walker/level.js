/*##############################################################################
# Manages Rendering, generating, and serializing/deserializing levels
##############################################################################*/

let LEVEL = {};

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
        if(data.backgroundSprite){
            let background = SPRITES.SpriteRenderer.new(data.backgroundSprite, VECTOR2.new(0, 0));
            lr.scenery.push(background);
        }
        for(let entityData of data.entityData){
            lr.addEntity(ENTITYFACTORY.Load(entityData));
        }
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
        if(entity == null){
            return;
        }
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

LEVEL.Data = {};
LEVEL.Data.new = function(){
    let ld = {
        backgroundSprite: null,
        entityData: []
    };
    return ld;
};

LEVEL.RandomPosition = function(){
    return VECTOR2.new(UTILITY.randRange(0, 5000), UTILITY.randRange(0, 5000));
};


// Creates level data
LEVEL.Generate = {};
LEVEL.Generate.Grass = function(){
    let data = LEVEL.Data.new();
    data.backgroundSprite = SPRITES.static.village.village;
    for(let i = 0; i < 1; i++){
        data.entityData.push(ENTITY.Data.new(ENTITY.ENTITIES.YellowBlob, LEVEL.RandomPosition()));
    }
    for(let i = 0; i < 1; i++){
        randPos = VECTOR2.new(UTILITY.randRange(0, 5000),UTILITY.randRange(0, 5000));
        data.entityData.push(ENTITY.Data.new(ENTITY.ENTITIES.Enemy, LEVEL.RandomPosition()));
    }
    return data;
};