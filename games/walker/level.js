/*##############################################################################
# Level Renderer
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
        scenery: [], // excluded from collisions
        ui: null
    };
    lr.init = function(){
        GRAPHICS.setDisplayMode(DISPLAY_MODES.camera);
        lr.physics = PHYSICS.Controller.new();
        lr.player = ACTORFACTORY.playerOne();
        lr.addEntity(lr.player);
        lr.ui = UI.COMPONENTS.ComponentManager.new();
        lr.ui.linkActor(lr.player);
    };
    lr.loadData = function(data){
        let levelSize = SETTINGS.DefaultLevelTileSize * SETTINGS.DefaultLevelSize;
        let levelRect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(levelSize, levelSize));
        SCENE.setLevelRect(levelRect);

        if(data.tileMap){
            let tileMap = data.tileMap;
            for(let i = 0; i < tileMap.tiles.length; i++){
                let sprite = tileMap.getSpriteByIndex(i);
                let pos = tileMap.getPositionByIndex(i);
                let tile = ENTITYFACTORY.Scenery(sprite, pos);
                lr.scenery.push(tile);
            }
        }
        for(let entityData of data.entityData){
            lr.addEntity(ENTITYFACTORY.Load(entityData));
        }
        if(data.playerPosition && lr.player){
            lr.player.setPosition(data.playerPosition);
        }
    };
    lr.update = function(){
        lr.physics.update();
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

/*##############################################################################
# Level Generator
##############################################################################*/

LEVEL.TileMap = {};
LEVEL.TileMap.new = function(sprites, tiles, size){
    let tm = {
        tileSprites: sprites,
        tiles: tiles,
        size: size, // Assumed to be square
    };
    tm.getRect = function(){
        let pos = VECTOR2.new(0,0);
        let tileSize = SETTINGS.DefaultLevelTileSize;
        let levelSize = tileSize * tm.size; 
        return SHAPES.RECT.new(pos, VECTOR2.new(levelSize, levelSize));
    };
    tm.getPositionByIndex = function(index){
        let coords = VECTOR2.new(index % tm.size, Math.trunc(index / tm.size));
        coords.x *= SETTINGS.DefaultLevelTileSize;
        coords.y *= SETTINGS.DefaultLevelTileSize;
        return coords;
    };
    tm.getSpriteByIndex = function(index){
        return tm.tileSprites[tm.tiles[index]];
    };
    return tm;
};


LEVEL.Data = {};
LEVEL.Data.new = function(){
    let ld = {
        tileMap: null,
        entityData: [],
        playerPosition: null
    };
    return ld;
};

LEVEL.RandomPosition = function(){
    let size = SETTINGS.DefaultLevelTileSize * SETTINGS.DefaultLevelSize;
    return VECTOR2.new(UTILITY.randRange(0, size), UTILITY.randRange(0, size));
};

// Creates level data
LEVEL.Generate = {};

LEVEL.Generate.UniformTileMap = function(sprite, size){
    let sprites = [];
    sprites.push(sprite);
    let tiles = [];
    for(let i = 0; i < size*size; i++){
        tiles.push(0);
    }
    return LEVEL.TileMap.new(sprites, tiles, size);
};

LEVEL.Generate.Grass = function(){
    let data = LEVEL.Data.new();
    data.tileMap = LEVEL.Generate.UniformTileMap(SPRITES.static.village.village, SETTINGS.DefaultLevelSize);

    let center = (SETTINGS.DefaultLevelTileSize * SETTINGS.DefaultLevelSize)/2;
    data.playerPosition = VECTOR2.new(center, center);
    
    let spawns = [
        ITEMS.Names.Stick,
        ITEMS.Names.Rock
    ];
    for(let i = 0; i < 200; i++){
        data.entityData.push(ENTITY.Data.ItemStack(UTILITY.randChoice(spawns), LEVEL.RandomPosition()));
    }

    for(let i = 0; i < 100; i++){
        randPos = VECTOR2.new(UTILITY.randRange(0, 5000),UTILITY.randRange(0, 5000));
        data.entityData.push(ENTITY.Data.new(ENTITY.ENTITIES.Enemy, LEVEL.RandomPosition()));
    }
    return data;
};

LEVEL.Generate.Grass.Cells = {};
LEVEL.Generate.Grass.Cells.Clearing = function(data, rect){
};
LEVEL.Generate.Grass.Cells.LightForest = function(data, rect){
};
LEVEL.Generate.Grass.Cells.ThickForest = function(data, rect){
};
LEVEL.Generate.Grass.Cells.Shrubs = function(data, rect){
};