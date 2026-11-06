/*##############################################################################
# An inventory with slots, each containing stacks of items
##############################################################################*/
ITEMS.Inventory = {};
ITEMS.Inventory.new = function(size){
    let inv = {
        slots: [],
        size: size,
        activeSlot: 0,
    };
    for(let i = 0; i < size; i++){
        inv.slots.push(null);
    };
    inv.removeItem = function(item){
        for(let i = 0; i < inv.slots.length; i++){
            let slotItem = inv.slots[i];
            if(item == slotItem){
                inv.slots[i] = null;
            }
        }
    };
    inv.getActiveItem = function(){
        if(inv.activeSlot == -1){
            return null;
        }
        return inv.slots[inv.activeSlot];
    };
    inv.getItem = function(slot){
        if(slot > -1 && slot < inv.size){
            let item = inv.slots[slot];
            if(item){
                return item.clone();
            }
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
        let quantityLeft = _item.quantity;
        let item = _item.clone();
        if(item.stackSize > 0){
            quantityLeft = inv.stackItem(item);
        }
        if(quantityLeft == 0){
            return 0;
        }

        item = _item.clone();
        item.quantity = quantityLeft;

        for(let i = 0; i < inv.slots.length; i++){
            if(inv.slots[i] == null){
                inv.slots[i] = item;
                return 0
            }
        }
        
        return quantityLeft;
    };
    // Returns quantity overflow after adding item stacks to existing stacks
    inv.stackItem = function(_item){
        let quantityLeft = _item.quantity;
        for(let i = 0; i< inv.slots.length; i++){
            if(inv.slots[i] && _item.name == inv.slots[i].name){
                quantityLeft = inv.slots[i].stack(quantityLeft);
            }
            if(quantityLeft == 0){
                return 0;
            }
        }
        return quantityLeft;
    };
    inv.findEmptySlot = function(){
        for(let i = 0; i< inv.slots.length; i++){
            if(inv.slots[i] == null){
                return i;
            }
        }
        return -1;
    };
    inv.canSetItem = function(slot, item){
        return true;
    };
    inv.getAvailableSpaceForItem = function(item){
        if(inv.findEmptySlot() > -1){
            return item.stackSize;
        }
        let stacks = [];
        for(let i = 0; i< inv.slots.length; i++){
            if(inv.slots[i] && inv.slots[i].name === item.name && inv.slots[i].stackSpace() > 0){
                stacks.push(inv.slots[i]);
            }
        }
        if(stacks.length == 0){
            return 0;
        }
        let space = 0;
        for(let _item of stacks){
            space += _item.stackSize - _item.quantity;
        }
        return space;
    };
    inv.queryItemQuantity = function(itemName){
        let quantity = 0;
        for(let item of inv.slots){
            if(item && item.name === itemName){
                quantity += item.quantity;
            }
        }
        return quantity;
    };
    inv.removeItemQuantity = function(itemName, quantity){
        if(quantity == null){
            return 0;
        }
        let quantityLeft = quantity + 0;
        for(let i = 0; i < inv.slots.length; i++){
            if(quantityLeft < 1){
                return quantityLeft;
            }
            let item = inv.slots[i];
            if(item != null && itemName == item.name){
                if(quantityLeft < item.quantity){
                    item.quantity -= quantityLeft;   
                    return 0;
                }
                quantityLeft -= item.quantity;
                inv.slots[i] = null;
            }
        }
        return quantityLeft;
    };
    return inv;
};