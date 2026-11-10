/*##############################################################################
# Has an item that can be harvested by interacting
##############################################################################*/
ENTITY.Harvestable = {};
ENTITY.Harvestable.new = function(name, items, emptySprite, fullSprite, rect, isRigid){
    let h = ENTITY.baseEntity.new();
    h.name = name;
    h.items = [];
    h.harvested = false;
    h.emptySprite = emptySprite;
    h.fullSprite = fullSprite;
    h.collider.rect = rect;
    h.collider.isRigid = isRigid;
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
            let message = "Harvested " + item.name;
            if(item.quantity > 1){
                message += "(" + item.quantity + ")";
            }
            UTILITY.notification(message);    
        }
        
        h.harvested = true;
    };
    return h;
};