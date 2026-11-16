/*##############################################################################
# Dungeon design entities
##############################################################################*/

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
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
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
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
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
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
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
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    ent.entityName = ENTITY.ENTITIES.CaveWallWest;
    return ent;
};