/*##############################################################################
# Non-actor entities
##############################################################################*/

let ENTITY = {};


// Implements iEntity
ENTITY.baseEntity = {};
ENTITY.baseEntity.new = function(){
    let be = {
        name: "",
        entityId: UTILITY.getNextEntityId(),
        position: VECTOR3.new(0, 0, 0),
        collider: PHYSICS.BoxCollider.new()
    };
    be.collider.entity = be;
    be.getName = function(){ return be.name; };
    be.getEntityId = function(){
        return be.entityId;
    }
    be.update = function(){};
    be.draw = function(){};
    be.getPosition = function(){ return be.position; };
    be.setPosition = function(newPosition){
        be.position = newPosition;
    };
    be.getCollider = function(){ return be.collider; };
    be.setCollider = function(newCollider){
        be.collider = newCollider;
    };

    return be;
};