/*##############################################################################
# Rigid set pieces that cannot be interacted with
##############################################################################*/

ENTITY.Scenery = {};
ENTITY.Scenery.new = function(name, sprite, position){
    let sc = ENTITY.baseEntity.new();
    sc.name = name;
    sc.renderer.sprite = sprite;
    sc.position = position;
    sc.collider.rigid = true;
    return sc;
};