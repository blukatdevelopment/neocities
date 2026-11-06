/*##############################################################################
# Base Item object
##############################################################################*/
ITEMS.BaseItem = {};
ITEMS.BaseItem.new = function(){
    let item = {
        type: ITEMS.Types.Base,
        name: "",
        description: "",
        sprite: null,
        quantity: 0,
        stackSize: 0, // Leave 0 to disable stacking
        durability: 0,
        durabilityMax: 0, // Leave 0 for infinite durability
        inventory: null // The inventory this item is inside
    };
    // quantity left in this stack
    item.stackSpace = function(){
        if(item.stackSize == 0 || item.quantity == item.stackSize){
            return 0;
        }
        else{
            return item.stackSize - item.quantity;
        }
    };
    item.stack = function(quantity){
        let space = item.stackSize - item.quantity;
        let quantityStored = space;
        if(space > quantity){
            quantityStored = quantity;
        }
        let overflow = quantity - quantityStored;

        item.quantity += quantityStored;
        return overflow;
    };
    item.use = function(){};
    item.clone = function(){
        let clone = ITEMS.BaseItem.new();
        clone.name = item.name;
        clone.sprite = item.sprite;
        clone.quantity = item.quantity;
        clone.stackSize = item.stackSize;
        clone.durability = item.durability;
        clone.description = item.description;
        clone.durabilityMax = item.durabilityMax;
        return clone;
    };
    item.toString = function(){
        return item.name + "(" + item.quantity + ")";
    };
    return item;
};

ITEMS.loadBaseItem = function(config){
    let item = ITEMS.BaseItem.new();
    item.name = config.name;
    item.description = config.description;
    item.sprite = config.sprite;
    if(Object.hasOwn(config, "stackSize") && config.stackSize > 0){
        item.quantity = 1;
        item.stackSize = config.stackSize;
    }
    if(Object.hasOwn(config, "durabilityMax") && config.durability > 0){
        item.durability = config.durabilityMax;
        item.durability = config.durabilityMax;
    }
    return item;
};