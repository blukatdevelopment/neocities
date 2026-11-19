/*##############################################################################
# Dungeon design entities
##############################################################################*/
ENTITY.ENTITIES.CaveExit = "CaveExit";
ENTITYFACTORY.CaveExit = function(){
    let sprite = SPRITES.static.cave64.caveExit;
    let ent = ENTITY.Door.new("Overworld", false, DIRECTIONS.north);
    ent.entityName = ENTITY.ENTITIES.CaveExit;
    ent.renderer.sprite = sprite;
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 48),
        VECTOR2.new(64, 16)
    );
    ent.entityName = ENTITY.ENTITIES.CaveExit;
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    ent.collider.rigid = true;
    return ent;
};

ENTITY.ENTITIES.CaveEntrance = "CaveEntrance";
ENTITYFACTORY.CaveEntrance = function(){
    let sprite = SPRITES.static.scenery64.caveEntrance;
    let ent = ENTITY.Door.new("Cave", true, DIRECTIONS.south);
    ent.entityName = ENTITY.ENTITIES.CaveEntrance;
    ent.renderer.sprite = sprite;
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 48),
        VECTOR2.new(64, 16)
    );
    ent.entityName = ENTITY.ENTITIES.CaveEntrance;
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    ent.collider.rigid = true;
    return ent;
};


ENTITY.ENTITIES.CaveFloor = "CaveFloor";
ENTITYFACTORY.CaveFloor = function(){
    let sprite = SPRITES.static.cave.Floor;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.CaveFloor, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 256)
    );
    ent.entityName = ENTITY.ENTITIES.CaveFloor;
    ent.renderLayer = GRAPHICS.RenderLayers.Bottom;
    ent.collider.rigid = false;
    return ent;
};

ENTITY.ENTITIES.CaveWallNorth = "CaveWallNorth";
ENTITYFACTORY.CaveWallNorth = function(){
    let sprite = SPRITES.static.cave.NWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.CaveWallNorth, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 16)
    );
    ent.entityName = ENTITY.ENTITIES.CaveWallNorth;
    return ent;
};

ENTITY.ENTITIES.CaveWallSouth = "CaveWallSouth";
ENTITYFACTORY.CaveWallSouth = function(){
    let sprite = SPRITES.static.cave.SWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.CaveWallSouth, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 240),
        VECTOR2.new(256, 16)
    );
    ent.entityName = ENTITY.ENTITIES.CaveWallSouth;
    return ent;
};

ENTITY.ENTITIES.CaveWallEast = "CaveWallEast";
ENTITYFACTORY.CaveWallEast = function(){
    let sprite = SPRITES.static.cave.EWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.CaveWallEast, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(240, 0),
        VECTOR2.new(16, 256)
    );
    ent.entityName = ENTITY.ENTITIES.CaveWallEast;
    return ent;
};

ENTITY.ENTITIES.CaveWallWest = "CaveWallWest";
ENTITYFACTORY.CaveWallWest = function(){
    let sprite = SPRITES.static.cave.WWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.CaveWallWest, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(16, 256)
    );
    ent.entityName = ENTITY.ENTITIES.CaveWallWest;
    return ent;
};


ENTITY.ENTITIES.RockPile = "RockPile";
ENTITYFACTORY.RockPile = function(){
    let sprite = SPRITES.static.cave64.rockPile;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.RockPile, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(64, 64)
    );
    ent.entityName = ENTITY.ENTITIES.RockPile;
    return ent;
};

ENTITY.ENTITIES.SpiderWeb = "SpiderWeb";
ENTITYFACTORY.SpiderWeb = function(){
    let sprite = SPRITES.static.cave64.spiderWeb;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.SpiderWeb, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(64, 64)
    );
    ent.entityName = ENTITY.ENTITIES.SpiderWeb;
    return ent;
};

ENTITY.ENTITIES.Crystals = "Crystals";
ENTITYFACTORY.Crystals = function(){
    let sprite = SPRITES.static.cave64.crystals;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Crystals, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(64, 64)
    );
    let color = GRAPHICS.Colors.Purple15;
    ent.light = GRAPHICS.LightSource.new(ent.getColRect(), 32, color);
    ent.update = function(){
        SCENE.emitLight(ent.light);
    };
    ent.entityName = ENTITY.ENTITIES.Crystals;
    return ent;
};

ENTITY.ENTITIES.Stalactites = "Stalactites";
ENTITYFACTORY.Stalactites = function(){
    let sprite = SPRITES.static.cave64.stalactites;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Stalactites, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(64, 64)
    );
    ent.entityName = ENTITY.ENTITIES.Stalactites;
    return ent;
};

ENTITY.ENTITIES.CaveBoulder = "CaveBoulder";
ENTITYFACTORY.CaveBoulder = function(){
    let sprite = SPRITES.static.cave64.boulder;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.CaveBoulder, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(64, 64)
    );
    ent.entityName = ENTITY.ENTITIES.CaveBoulder;
    return ent;
};