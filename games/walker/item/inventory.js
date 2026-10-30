/*##############################################################################
# An inventory with slots, each containing stacks of items
##############################################################################*/
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
    inv.pickUp = function(_item){
        let item = _item.clone();
        if(item.stackSize > 0){
            item.quantity = inv.stackItem(item);
        }
        if(item.quantity > 0){
            let slot = inv.findEmptySlot();
            if(slot > -1){
                inv.slots[slot] = item.clone();
                return 0;
            }
        }
        return item.quantity;
    };
    // Returns quantity overflow after adding item stacks to existing stacks
    inv.stackItem = function(_item){
        let item = _item.clone();
        let stackingSlot = inv.findStackingSlot(item);
        while(stackingSlot > -1 && item.quantity > 0){
            item.quantity = inv.slots[stackingSlot].stack(item.quantity);
            stackingSlot = inv.findStackingSlot(item);
        }
        return item.quantity;
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