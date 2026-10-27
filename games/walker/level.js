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
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(SETTINGS.DefaultLevelTileSize, SETTINGS.DefaultLevelTileSize));
    let cellGenerators = [
        LEVEL.Generate.Cell.GrassClearing,
        LEVEL.Generate.Cell.GrassThickWoods,
        LEVEL.Generate.Cell.GrassForest,
        LEVEL.Generate.Cell.GrassSlimePit
    ];
    for(let y = 0; y < SETTINGS.DefaultLevelSize; y++){
        for(let x = 0; x < SETTINGS.DefaultLevelSize; x++){
            rect.position.x = x * SETTINGS.DefaultLevelTileSize;
            rect.position.y = y * SETTINGS.DefaultLevelTileSize;
            let cellGenerator = UTILITY.choice(cellGenerators);
            cellGenerator(data, rect);
        }
    }
    return data;
};

LEVEL.Generate.Cell = {};
LEVEL.Generate.Cell.new = function(data, rect){
    let cg = {
        data: data,
        rect: rect,
        entities: []
    };
    cg.generate = function(){
        cg.generateEntities();
    };
    cg.getRandomPosition = function(){
        let minX = cg.rect.position.x;
        let minY = cg.rect.position.y;
        let maxX = minX + cg.rect.size.x;
        let maxY = minY + cg.rect.size.y;
        return VECTOR2.new(
            UTILITY.randRange(minX, maxX),
            UTILITY.randRange(minY, maxY)
        );
    };
    cg.placeEntityRandomly = function(entity){
        let iterations = 0;

        while(iterations < 5000){
            iterations++;
            entity.position = cg.getRandomPosition();
            if(cg.canPlace(entity)){
                iterations = 5000;
            }
        }

        cg.addEntity(entity);
    };
    cg.canPlace = function(_entity){
        for(let entity of cg.entities){
            if(_entity.collider.overlaps(entity.collider)){
                return false;
            }
        }
        return true;
    };
    cg.addEntity = function(entity){
        cg.data.entityData.push(entity.getData());
        cg.entities.push(entity);
    };
    cg.generateEntities = function(){};
    return cg;
};

LEVEL.Generate.Cell.addScenery = function(cg, sprite){
    let scenery = ENTITYFACTORY.Scenery(sprite, VECTOR2.new(0,0));
    cg.placeEntityRandomly(scenery);
};
LEVEL.Generate.Cell.addRandomScenery = function(cg, scenerySprites, numberToAdd){
    for(let i = 0; i < numberToAdd; i++){
        let scenery = ENTITYFACTORY.Scenery(UTILITY.choice(scenerySprites), VECTOR2.new(0,0));
        cg.placeEntityRandomly(scenery);
    }
};

LEVEL.Generate.Cell.addItem = function(cg, itemName){
    let item = ENTITYFACTORY.ItemStack(itemName, 1, 1);
    cg.placeEntityRandomly(item);
};

LEVEL.Generate.Cell.addRandomItems = function(cg, items, numberToAdd){
    for(let i = 0; i < numberToAdd; i++){
        let item = ENTITYFACTORY.ItemStack(UTILITY.choice(items), 1, 1);
        cg.placeEntityRandomly(item);
    }
};



LEVEL.Generate.Cell.GrassClearing = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Rock
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, UTILITY.randRange(1, 10));
    let scenerySprites = [
        SPRITES.static.scenery64.bush,
        SPRITES.static.scenery64.berryBush
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenerySprites, UTILITY.randRange(3, 5));
};

LEVEL.Generate.Cell.GrassThickWoods = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Apple,
        ITEMS.Names.Stick,
        ITEMS.Names.Rock
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, 3);
    
    let scenerySprites = [
        SPRITES.static.scenery64.tree,
        SPRITES.static.scenery64.bush,
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenerySprites, 20);
};

LEVEL.Generate.Cell.GrassForest = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Apple,
        ITEMS.Names.Stick,
        ITEMS.Names.Rock
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, 5);
    
    let scenerySprites = [
        SPRITES.static.scenery64.tree,
        SPRITES.static.scenery64.bush,
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenerySprites, 50);
};

LEVEL.Generate.Cell.GrassSlimePit = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    
    let center = rect.center();
    let slimePit = ENTITYFACTORY.Scenery(SPRITES.static.scenery64.slimepit, center);
    cg.addEntity(slimePit);

    let slimePositions = [
        center.add(VECTOR2.new(-50, -50)),
        center.add(VECTOR2.new(100, -50)),
        center.add(VECTOR2.new(50, 50))
    ];
    for(let slimePos of slimePositions){
        let slime = ACTORFACTORY.slime();
        slime.teleport(slimePos);
        cg.addEntity(slime);
    }

    let items = [
        ITEMS.Names.Apple,
        ITEMS.Names.Seeds,
        ITEMS.Names.Talon,
        ITEMS.Names.Stick,
        ITEMS.Names.Rock,
        ITEMS.Names.RedBerry,
        ITEMS.Names.GreenBerry,
        ITEMS.Names.BlueBerry
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, 10);

    let scenerySprites = [
        SPRITES.static.scenery64.tree,
        SPRITES.static.scenery64.bush
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenerySprites, UTILITY.randRange(1, 10));
};


