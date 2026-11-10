/*##############################################################################
# An entity containing one stack of items, which can be picked up
##############################################################################*/
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
            let delta = prevQuant - pue.item.quantity;
            let message = "Picked up " + pue.item.name;
            if(delta > 1){
                message += "(" + delta + ")";
            }
            UTILITY.notification(message);
            if(pue.item.quantity == 0){
                SCENE.destroyEntity(pue);
            }
        }
    };
    pue.onAttacked = function(attack){};
    return pue;
};