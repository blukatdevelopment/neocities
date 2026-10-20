/*##############################################################################
# Non-actor entities
##############################################################################*/

let ENTITYFACTORY = {};
// Static object with collision box
ENTITYFACTORY.Scenery = function(_sprite, position){
    let sc = ENTITY.Scenery.new();
    sc.renderer.setSprite(_sprite);
    sc.collider.resize(VECTOR2.new(16, 16));
    sc.name = "scenery" + sc.getEntityId();
    sc.setPosition(position);
    return sc;
};

// Is picked up by actors
ENTITYFACTORY.Pickup = function(itemName, quantity, durability){
    let item = ITEMS.create(itemName, quantity, durability);
    if(item){
        let pu = ENTITY.PickUp.new(item);
        return pu;
    }
    UTILITY.log("ENTITYFACTORY.Pickup", "Could not create pickup", { name: itemName, quantity: quantity, durability: durability });
};

ENTITYFACTORY.Load = function(data){
    let entity = null;
    
    if(data.entityId == ENTITY.ENTITIES.YellowBlob){
        entity = ENTITYFACTORY.Pickup(ITEMS.Names.YellowBlob, 1, 1);
        entity.setPosition(data.position);
    }
    if(data.entityId == ENTITY.ENTITIES.Enemy){
        entity = ACTORFACTORY.simpleEnemy();
        entity.setPosition(data.position);
    }
    return entity;
};

let ENTITY = {};

ENTITY.ENTITIES = {};
ENTITY.ENTITIES.YellowBlob = "YellowBlob";
ENTITY.ENTITIES.Enemy = "Enemy";

ENTITY.Data = {};
ENTITY.Data.new = function(entityId, position){
    let data = {
        entityId: entityId,
        position: position
    };
    return data;
};


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
        if(!GRAPHICS.isOnScreen(be.collider.rect)){
            // Don't render if the entity is offscreen.
            return;
        }
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
            be.collider.moveAndCollideShort(dest, true);
        }
    };
    be.die = function(){
        SCENE.destroyEntity(be);
    };
    be.pickUp = function(item){ return item.quantity; };

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
ENTITY.PickUp.new = function(item){
    let pue = ENTITY.baseEntity.new();
    pue.setCollider(PHYSICS.BoxCollider.new());
    pue.collider.rigid = false;
    pue.item = item;
    pue.name = item.name;
    pue.sprite = item.sprite;
    pue.renderer.setSprite(item.sprite);
    let size = VECTOR2.new(0, 0);
    size.x = item.sprite.sheet.cellResolutionX;
    size.y = item.sprite.sheet.cellResolutionY;
    pue.collider.rect.size = size;
    pue.onCollide = function(collision){};
    pue.onInteract = function(interaction){
        if(interaction.initiator){
            let prevQuant = pue.item.quantity;
            pue.item.quantity = interaction.initiator.pickUp(pue.item);
            console.log("Item went from " + prevQuant  + " to " + pue.item.quantity);
            if(pue.item.quantity == 0){
                SCENE.destroyEntity(pue);
            }
        }
    };
    pue.onAttacked = function(attack){};
    return pue;
};