/*##############################################################################
# Base object for entities
##############################################################################*/

ENTITY.baseEntity = {};
ENTITY.baseEntity.new = function(){
    let be = {
        entityType: ENTITY.TYPES.Scenery,
        name: "", // Player-facing name
        entityName: "", // Refers to the constructor
        entityId: UTILITY.getNextEntityId(),
        position: VECTOR2.new(0, 0),
        collider: PHYSICS.BoxCollider.new(),
        renderer: SPRITES.SpriteRenderer.new(),
        label: "",
        renderLayer: GRAPHICS.RenderLayers.Default,
        tags: []

    };
    be.renderer.parent = be;
    be.collider.parent = be;
    be.getName = function(){ return be.name; };
    be.getEntityId = function(){
        return be.entityId;
    }
    be.update = function(){};
    be.draw = function(){
        if(!GRAPHICS.isOnScreen(be.getSpriteRect())){
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
        let data = ENTITY.Data.new(be.entityName, be.position);
        return data;
    };
    be.getSpriteRect = function(){
        return be.renderer.getRect();
    };
    be.getColRect = function(){
        return be.collider.absoluteRect();
    };
    be.recenter = function(position){
        let rect = be.getSpriteRect();
        rect.recenter(position);
        be.position = rect.position;
    };
    be.colliderRecenter = function(position){
        let rect = be.collider.rect;
        let entPos = position.clone();
        entPos.x -= rect.position.x;
        entPos.y -= rect.position.y;
        entPos.x -= (rect.size.x/2);
        entPos.y -= (rect.size.y/2);
        be.position = entPos;
    };
    be.getLabel = function(){ return ""; };
    be.hasTag = function(tag){
        return be.tags.includes(tag);
    };
    be.isPlayer = function(){ return false; };
    return be;
};