/*##############################################################################
# Has an item that can be harvested by interacting
##############################################################################*/
ENTITY.Harvestable = {};
ENTITY.Harvestable.new = function(){
    let h = ENTITY.baseEntity.new();
    h.items = [];
    h.harvested = false;
    h.emptySprite = null;
    h.fullSprite = null;
    h.getSprite = function(){
        if(h.harvested){
            return h.emptySprite;
        }
        return h.fullSprite;
    };
    h.draw = function(){
        if(!GRAPHICS.isOnScreen(h.getSpriteRect())){
            // Don't render if the entity is offscreen.
            return;
        }
        let sprite = h.getSprite();
        if(sprite == null || h.renderer == null){
            return;
        }
        console.log("Sprite: " + sprite.name);
        h.renderer.setSprite(sprite);
        h.renderer.draw();
        
        if(h.getLabel() != ""){
            GRAPHICS.drawTextRelative(h.getLabel(), h.position.x, h.position.y);
        }
    };
    h.canHarvest = function(actor){
        for(let item of h.items){
            if(!actor.canStoreItem(item)){
                return false;
            }
        }
        return true;
    };
    h.onInteract = function(interaction){
        console.log("Interaction initiated");
        if(interaction.initiator == null){
            return;
        }
        if(h.harvested || h.items.length == 0){
            return;
        }
        if(!h.canHarvest(interaction.initiator)){
            UTILITY.notification("You have no space for this item.");
            return;
        }
        for(let item of h.items){
            interaction.initiator.pickUp(item.clone());
            let message = "Picked up " + item.name;
            if(item.quantity > 1){
                message += "(" + item.quantity + ")";
            }
            UTILITY.notification(message);    
        }
        
        h.harvested = true;
    };
    h.getData = function(){
        return ENTITY.Data.Harvestable(h.position, h.items, h.emptySprite, h.fullSprite, h.collider.rect, h.collider.rigid);
    };
    return h;
};


ENTITYFACTORY.Harvestable = function(items, empty, full, rect, rigid){
    console.log("Sprites" + empty.name + ", " + full.name);
    let h = ENTITY.Harvestable.new();
    h.items = items;
    h.emptySprite = empty;
    h.fullSprite = full;
    h.collider.rect = rect;
    h.collider.rigid = rigid;
    return h;
};


ENTITY.Data.Harvestable = function(position, items, empty, full, rect, rigid){
    let data = ENTITY.Data.new(ENTITY.TYPES.Harvestable, position);
    data.items = items;
    data.emptySprite = empty;
    data.fullSprite = full;
    data.rect = rect;
    data.rigid = rigid;

    return data;
};