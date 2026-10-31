/*##############################################################################
# Base object for entities
##############################################################################*/

ENTITY.baseEntity = {};
ENTITY.baseEntity.new = function(){
    let be = {
        entityType: ENTITY.TYPES.Scenery,
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
        if(!GRAPHICS.isOnScreen(be.collider.rect)){
            // Don't render if the entity is offscreen.
            return;
        }
        if(be.renderer){
            be.renderer.draw();
        }
        if(be.getLabel() != ""){
            GRAPHICS.drawTextRelative(be.getLabel(), be.position.x, be.position.y);
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
            be.collider.moveAndCollideShort(dest, true);
        }
    };
    be.die = function(){
        SCENE.destroyEntity(be);
    };
    be.pickUp = function(item){ return item.quantity; };
    be.getData = function(){
        let data = ENTITY.Data.new(be.entityType, be.position);
        data.sprite = be.renderer.sprite;
        data.rect = be.collider.rect;
        return data;
    };
    be.getLabel = function(){ return ""; };
    return be;
};