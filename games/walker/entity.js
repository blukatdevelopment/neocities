/*##############################################################################
# Non-actor entities
##############################################################################*/

let ENTITYFACTORY = {};
// Static object with collision box
ENTITYFACTORY.Scenery = function(_sprite){
    let sc = ENTITY.Scenery.new();
    sc.renderer.setSprite(_sprite);
    sc.collider.resize(VECTOR2.new(16, 16));
    sc.name = "scenery" + sc.getEntityId();
    return sc;
};

// Is picked up by actors
ENTITYFACTORY.Pickup = function(_sprite){
    let pu = ENTITY.PickUp.new();
    pu.renderer.setSprite(_sprite);
    pu.collider.rect.size = VECTOR2.new(16, 16);
    pu.name = "Pickup" + pu.getEntityId();
    return pu;
};

let ENTITY = {};

// Implements iEntity
ENTITY.baseEntity = {};
ENTITY.baseEntity.new = function(){
    let be = {
        name: "",
        entityId: UTILITY.getNextEntityId(),
        position: VECTOR2.new(0, 0),
        collider: PHYSICS.BoxCollider.new(),
        renderer: SPRITES.SpriteRenderer.new(),
        label: ""
    };
    be.renderer.parent = be;
    be.collider.parent = be;
    be.getName = function(){ return be.name; };
    be.getEntityId = function(){
        return be.entityId;
    }
    be.update = function(){};
    be.draw = function(){
        if(be.renderer){
            be.renderer.draw();
        }
        if(be.label != ""){
            GRAPHICS.drawTextRelative(be.label, be.position.x, be.position.y);
        }
    };
    be.getPosition = function(){ return be.position; };
    be.setPosition = function(newPosition){
        be.position = newPosition;
    };
    be.getCollider = function(){ return be.collider; };
    be.setCollider = function(newCollider){
        be.collider = newCollider;
        be.collider.parent = be;
    };
    be.toString = function(){
        let ret = "[";
        ret += be.name + " ID: " + be.entityId;
        ret += ", pos: " + be.position.toString();
        return ret;
    };
    be.centeredPosition = function(){
        return be.collider.absoluteRect().center();
    };
    be.onCollide = function(collision){};
    be.onInteract = function(interaction){};
    be.onAttacked = function(attackData){};
    be.onKnockback = function(direction, magnitude){
        if(be.collider){
            let dest = be.position.move(direction, magnitude);
            be.collider.moveAndCollideShort(dest);
        }
    };
    be.die = function(){
        SCENE.destroyEntity(be);
    };

    return be;
};

ENTITY.Scenery = {};
ENTITY.Scenery.new = function(){
    let sc = ENTITY.baseEntity.new();
    sc.collider.rigid = true;
    return sc;
};

// An item intended to be picked up by the player
ENTITY.PickUp = {};
ENTITY.PickUp.new = function(){
    let pue = ENTITY.baseEntity.new();
    pue.setCollider(PHYSICS.BoxCollider.new());
    pue.collider.rigid = false;
    pue.onCollide = function(collision){
        //SCENE.destroyEntity(pue);
    };
    pue.onInteract = function(interaction){
        SCENE.destroyEntity(pue);
    };
    pue.onAttacked = function(attack){
        SCENE.destroyEntity(pue);
    };
    return pue;
};