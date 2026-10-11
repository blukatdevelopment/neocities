/*##############################################################################
# Non-actor entities
##############################################################################*/

let ENTITYFACTORY = {};
// Static object with collision box
ENTITYFACTORY.Scenery = function(_sprite){
    let sc = ENTITY.baseEntity.new();
    sc.renderer = SPRITES.SpriteRenderer.new(_sprite);
    sc.renderer.parent = sc;
    sc.setCollider(PHYSICS.BoxCollider.new());
    sc.getCollider().rect.size = VECTOR2.new(16, 16);
    return sc;
};

let ENTITY = {};


// Implements iEntity
ENTITY.baseEntity = {};
ENTITY.baseEntity.new = function(){
    let be = {
        name: "",
        entityId: UTILITY.getNextEntityId(),
        position: VECTOR3.new(0, 0, 0),
        collider: PHYSICS.BoxCollider.new(),
        renderer: null
    };
    be.collider.entity = be;
    be.getName = function(){ return be.name; };
    be.getEntityId = function(){
        return be.entityId;
    }
    be.update = function(){};
    be.draw = function(){
        if(be.renderer){
            be.renderer.draw();
        }
    };
    be.getPosition = function(){ return be.position; };
    be.setPosition = function(newPosition){
        be.position = newPosition;
    };
    be.getCollider = function(){ return be.collider; };
    be.setCollider = function(newCollider){
        be.collider = newCollider;
        be.collider.entity = be;
    };
    be.toString = function(){
        let ret = "[";
        ret += be.name + " ID: " + be.entityId;
        ret += ", pos: " + be.position.toString();
        return ret;
    }

    return be;
};