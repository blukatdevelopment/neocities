/*##############################################################################
# Dungeon design entities
##############################################################################*/

ENTITY.ENTITIES.CaveFloor = "CaveFloor";
ENTITYFACTORY.CaveFloor = function(){
    let sprite = SPRITES.static.cave.Floor;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Bush, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 256)
    );
    ent.entityName = ENTITY.ENTITIES.CaveFloor;
    ent.renderLayer = GRAPHICS.RenderLayers.Bottom;
    return ent;
};

ENTITY.ENTITIES.CaveWallNorth = "CaveWallNorth";
ENTITYFACTORY.CaveWallNorth = function(){
    let sprite = SPRITES.static.cave.NWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Bush, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 256)
    );
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    ent.entityName = ENTITY.ENTITIES.CaveWallNorth;
    return ent;
};

ENTITY.ENTITIES.CaveWallSouth = "CaveWallSouth";
ENTITYFACTORY.CaveWallSouth = function(){
    let sprite = SPRITES.static.cave.SWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Bush, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 256)
    );
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    ent.entityName = ENTITY.ENTITIES.CaveWallSouth;
    return ent;
};

ENTITY.ENTITIES.CaveWallEast = "CaveWallEast";
ENTITYFACTORY.CaveWallEast = function(){
    let sprite = SPRITES.static.cave.EWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Bush, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 256)
    );
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    ent.entityName = ENTITY.ENTITIES.CaveWallEast;
    return ent;
};

ENTITY.ENTITIES.CaveWallWest = "CaveWallWest";
ENTITYFACTORY.CaveWallWest = function(){
    let sprite = SPRITES.static.cave.WWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Bush, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 256)
    );
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    ent.entityName = ENTITY.ENTITIES.CaveWallWest;
    return ent;
};

ENTITY.ENTITIES.CaveWallWest = "CaveWallWest";
ENTITYFACTORY.CaveWallWest = function(){
    let sprite = SPRITES.static.cave.WWall;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Bush, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(256, 256)
    );
    ent.entityName = ENTITY.ENTITIES.CaveWallWest;
    ent.renderLayer = GRAPHICS.RenderLayers.Top;
    return ent;
};