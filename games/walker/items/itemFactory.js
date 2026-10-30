/*##############################################################################
# Factory for Items
##############################################################################*/
ITEMS.create = function(name, quantity, durability){
    let item = ITEMS.getByName(name);
    if(item == null){
        UTILITY.log("ITEMS.create", "Could not find item: " + name, { name: name, quantity: quantity });
    }
    item = item.clone();
    if(quantity && quantity > 0 && item.stackSize > 0){
        item.quantity = quantity;
    }
    if(durability && durability > 0 && item.durabilityMax > 0){
        item.durability = durability;
    }
    return item;
};
