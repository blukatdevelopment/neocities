/*##############################################################################
# Rigid set pieces that cannot be interacted with
##############################################################################*/

ENTITY.Scenery = {};
ENTITY.Scenery.new = function(){
    let sc = ENTITY.baseEntity.new();
    sc.collider.rigid = true;
    return sc;
};

// Static object with collision box
ENTITYFACTORY.Scenery = function(_sprite, position){
    let sc = ENTITY.Scenery.new();
    sc.renderer.setSprite(_sprite);
    let size = VECTOR2.new(_sprite.sheet.cellResolutionX, _sprite.sheet.cellResolutionX);
    sc.collider.resize(size);
    sc.name = "scenery" + sc.getEntityId();
    sc.setPosition(position);
    return sc;
};