/*##############################################################################
# Items
# Code that deals with item config and behavior
##############################################################################*/

let ITEMS = {};
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
        let stackSpace = item.stackSpace;
        if(quantity <= stackSpace){
            item.quantity += quantity;
            return 0;
        }
        else{
            let overflow = stackSpace - quantity;
            item.quantity = item.stackSize;
            return overflow;
        }
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
ITEMS.Names = {};
ITEMS.Names.YellowBlob = "YellowBlob";

ITEMS.ItemList = [];

ITEMS.getByName = function(name){
    for(let item of ITEMS.ItemList){
        if(item.name === name){
            return item;
        }
    }
    return null;
};

ITEMS.getConfig = function(){
    return [
        {
            name: ITEMS.Names.YellowBlob,
            description: "Just a Yellow blob!",
            sprite: SPRITES.static.items.Two,
            stackSize: 16
        },
    ];
};

ITEMS.loadFromConfig = function(config){
    let item = ITEMS.Item.new();
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


// Load configs into item list
ITEMS.init = function(){
    for(let config of ITEMS.getConfig()){
        ITEMS.ItemList.push(ITEMS.loadFromConfig(config));
    }
};


ITEMS.Inventory = {};
ITEMS.Inventory.new = function(size){
    let inv = {
        slots: [],
        size: size
    };
    for(let i = 0; i < size; i++){
        inv.slots.push(null);
    };
    inv.getItem = function(slot){
        if(slot > -1 && slot < inv.size){
            return inv.slots[slot];
        }
        return null;
    };
    inv.setItem = function(slot, item){
        if(slot > -1 && slot < inv.size){
            inv.slots[slot] = item;
        }
    };
    // Returns overflow quantity
    inv.pickUp = function(item){
        if(item.stackSize > 0){
            item.quantity = inv.stackItem(item);
        }
        if(item.quantity > 0){
            let slot = inv.findEmptySlot();
            if(slot > -1){
                inv.slots[slot] = item;
                return 0;
            }
        }
        return item.quantity;
    };
    // Returns quantity overflow after adding item stacks to existing stacks
    inv.stackItem = function(item){
        let stackingSlot = inv.findStackingSlot(item);
        while(stackingSlot > 0 && item.quantity > 0){
            item.quantity = inv.slots[stackingslot].stack(item.quantity);
            stackingSlot = inv.findStackingSlot(item);
        }
        if(item.quantity > 0){
            let
        }
    };
    inv.findStackingSlot = function(item){
        for(let i = 0; i< inv.slots.length; i++){
            if(inv.slots[i] && inv.slots[i].name === item.name && inv.slots[i].stackSpace() > 0){
                return i;
            }
        }
        return -1;
    };
    inv.findEmptySlot = function(){
        for(let i = 0; i< inv.slots.length; i++){
            if(inv.slots[i] == null){
                return i;
            }
        }
        return -1;
    }
    return inv;
};