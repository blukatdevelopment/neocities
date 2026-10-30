/*##############################################################################
# Scenery to be used in the grass biome
##############################################################################*/

// Make the function and entity names match
ENTITY.ENTITIES.Bush = "Bush";
ENTITYFACTORY.Bush = function(){
    let sprite = SPRITES.static.scenery64.bush;
    let ent = ENTITYFACTORY.Scenery(sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0,56),
        VECTOR2.new(0,0)
        //VECTOR2.new(8,64)
    );
    return ent;
};

ENTITY.ENTITIES.BerryBush = "BerryBush";
ENTITYFACTORY.BerryBush = function(){
    let sprite = SPRITES.static.scenery64.berryBush;
    let ent = ENTITYFACTORY.Scenery(sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(0,56),
        VECTOR2.new(8,64)
    );
    return ent;
};

ENTITY.ENTITIES.BirchTree = "BirchTree";
ENTITYFACTORY.BirchTree = function(){
    let sprite = SPRITES.static.scenery64.tree;
    let ent = ENTITYFACTORY.Scenery(sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(24,56),
        VECTOR2.new(8,8)
    );
    return ent;
};

ENTITY.ENTITIES.SlimePit = "SlimePit";
ENTITYFACTORY.SlimePit = function(){
    let sprite = SPRITES.static.scenery64.slimepit;
    let ent = ENTITYFACTORY.Scenery(sprite, VECTOR2.new(0,0));
    ent.collider.rect = SHAPES.RECT.new(
        VECTOR2.new(24,24),
        VECTOR2.new(8,8)
    );
    return ent;
};