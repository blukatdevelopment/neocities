/*##############################################################################
# Scenery to be used in the grass biome
##############################################################################*/

// Make the function and entity names match
ENTITY.ENTITIES.Bush = "Bush";
ENTITYFACTORY.Bush = function(){
    let sprite = SPRITES.static.scenery64.bush;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Bush, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0, 56),
        VECTOR2.new(64, 8)
    );
    ent.entityName = ENTITY.ENTITIES.Bush;
    return ent;
};

ENTITY.ENTITIES.BerryBush = "BerryBush";
ENTITYFACTORY.BerryBush = function(){
    let items = [
        ITEMS.create(ITEMS.Names.RedBerry, 1, null)
    ];
    let emptySprite = SPRITES.static.scenery64.bush;
    let fullSprite = SPRITES.static.scenery64.berryBush;
    let rigid = true;
    let rect = SHAPES.RECT.new(
        VECTOR2.new(0, 56),
        VECTOR2.new(64, 8)
    );
    let ent = ENTITY.Harvestable.new(ENTITY.ENTITIES.BerryBush, items, emptySprite, fullSprite, rect, rigid);
    ent.entityName = ENTITY.ENTITIES.BerryBush;
    return ent;
};

ENTITY.ENTITIES.BirchTree = "BirchTree";
ENTITYFACTORY.BirchTree = function(){
    let sprite = SPRITES.static.scenery64.tree;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.BirchTree, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(24,56),
        VECTOR2.new(8,8)
    );
    ent.entityName = ENTITY.ENTITIES.BirchTree;
    return ent;
};

ENTITY.ENTITIES.SlimePit = "SlimePit";
ENTITYFACTORY.SlimePit = function(){
    let sprite = SPRITES.static.scenery64.slimepit;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.SlimePit, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(24,24),
        VECTOR2.new(8,8)
    );
    ent.entityName = ENTITY.ENTITIES.SlimePit;
    return ent;
};

ENTITY.ENTITIES.Boulder = "Boulder";
ENTITYFACTORY.Boulder = function(){
    let sprite = SPRITES.static.scenery64.boulder;
    let ent = ENTITY.Scenery.new(ENTITY.ENTITIES.Boulder, sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0,0),
        VECTOR2.new(64,64)
    );
    ent.entityName = ENTITY.ENTITIES.Boulder;
    return ent;
};