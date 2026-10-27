/*##############################################################################
# Non-actor entities
##############################################################################*/

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

// Is picked up by actors
ENTITYFACTORY.ItemStack = function(itemName, quantity, durability){
    let item = ITEMS.create(itemName, quantity, durability);
    if(item){
        let pu = ENTITY.ItemStack.new(item);
        return pu;
    }
    UTILITY.log("ENTITYFACTORY.ItemStack", "Could not create ItemStack", { name: itemName, quantity: quantity, durability: durability });
};

ENTITYFACTORY.Load = function(data){
    let entity = null;
    
    if(data.entityType == ENTITY.TYPES.ItemStack){
        entity = ENTITYFACTORY.ItemStack(data.item, 1, 1);
        entity.setPosition(data.position);
    }
    if(data.entityType == ENTITY.TYPES.Enemy){
        entity = ACTORFACTORY.slime();
        entity.setPosition(data.position);
    }
    if(data.entityType == ENTITY.TYPES.Scenery){
        entity = ENTITYFACTORY.Scenery(data.sprite, data.position);
    }
    return entity;
};

ENTITY.TYPES = {};
ENTITY.TYPES.Scenery = "Scenery";
ENTITY.TYPES.ItemStack = "ItemStack";
ENTITY.TYPES.Enemy = "Enemy";
ENTITY.TYPES.Player = "Player";

ENTITY.Data = {};
ENTITY.Data.new = function(entityType, position){
    let data = {
        entityType: entityType,
        position: position,
        item: null,
        sprite: null
    };
    return data;
};

ENTITY.Data.ItemStack = function(itemName, position, quantity){
    let data = ENTITY.Data.new(ENTITY.TYPES.ItemStack, position);
    data.item = itemName;
    data.quantity = 1;
    if(quantity){
        data.quantity = quantity;
    }
    return data;
};


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
    be.getData = function(){
        let data = ENTITY.Data.new(be.entityType, be.position);
        data.sprite = be.renderer.sprite;
        return data;
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
ENTITY.ItemStack = {};
ENTITY.ItemStack.new = function(item){
    let pue = ENTITY.baseEntity.new();
    pue.entityType = ENTITY.TYPES.ItemStack;
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
            if(pue.item.quantity == 0){
                SCENE.destroyEntity(pue);
            }
        }
    };
    pue.onAttacked = function(attack){};
    pue.getData = function(){
        let data = ENTITY.Data.new(pue.entityType, pue.position);
        data.item = pue.item.name;
        return data;
    };
    return pue;
};