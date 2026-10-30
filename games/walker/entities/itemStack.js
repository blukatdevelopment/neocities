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

// Is picked up by actors
ENTITYFACTORY.ItemStack = function(itemName, quantity, durability){
    let item = ITEMS.create(itemName, quantity, durability);
    if(item){
        let pu = ENTITY.ItemStack.new(item);
        return pu;
    }
    UTILITY.log("ENTITYFACTORY.ItemStack", "Could not create ItemStack", { name: itemName, quantity: quantity, durability: durability });
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