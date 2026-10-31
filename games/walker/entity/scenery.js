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
ENTITYFACTORY.Scenery = function(_sprite, position, rect){
    let sc = ENTITY.Scenery.new();
    if(rect){
        console.log("Setting rect " + rect.toString());
        sc.collider.rect = rect;
    };
    sc.renderer.setSprite(_sprite);
    sc.name = "scenery" + sc.getEntityId();
    sc.setPosition(position);
    return sc;
};