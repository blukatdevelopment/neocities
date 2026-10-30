/*##############################################################################
# Base Item object
##############################################################################*/
ITEMS.Item = {};
ITEMS.Item.new = function(){
    let item = {
        name: "",
        description: "",
        sprite: null,
        quantity: 0,
        stackSize: 0, // Leave 0 to disable stacking
        durability: 0,
        durabilityMax: 0 // Leave 0 for infinite durability
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
        item.quantity += quantity;
        let overflow = item.quantity - item.stackSize;
        if(overflow > 0){
            item.quantity = item.stackSize;
        }
        if(overflow < 0){
            return 0;
        }
        return overflow;
    };
    item.clone = function(){
        let clone = ITEMS.Item.new();
        clone.name = item.name;
        clone.description = item.description;
        clone.sprite = item.sprite;
        clone.quantity = item.quantity;
        clone.stackSize = item.stackSize;
        clone.durability = item.durability;
        clone.durabilityMax = item.durabilityMax;
        return clone;
    };
    return item;
};