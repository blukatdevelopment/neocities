/*##############################################################################
# Generates loot by RNG
##############################################################################*/

ITEMS.LootTable = {};
ITEMS.LootTable.new = function(){
    let lp = {
        items: [],
        chances: [],
        maximums: []
    };
    lp.addItem = function(item, chance, max){
        lp.items.push(item);
        lp.chances.push(chance);
        lp.maximums.push(max);
    };
    lp.getLoot = function(){
        let loot = [];
        for(let i = 0; i< lp.items.length; i++){
            let lootPool = lp.generateItemLoot(lp.items[i], lp.chances[i], lp.maximums[i]);
            loot.push(...lootPool);
        }
        return loot;
    };
    lp.generateItemLoot = function(item, chance, max){
        let loot = [];
        if(!RANDOM.chance(chance)){
            // You get nothing! You lose! Good day, sir!
            return loot;
        }

        let quantity = RANDOM.roll(max);

        // Add the quantity to the stack
        if(item.stackSize <= quantity){
            let _item = item.clone();
            _item.quantity = quantity;
            loot.push(_item);
            return loot;
        }

        // It won't stack, so just spam the items out.
        if(item.stackSize == 0){
            for(let j = 0; j < quantity; j++){
                loot.push(item.clone());    
            }
            return loot;
        }

        // Break it up into multiple stacks
        let itemsToDrop = Math.ceil(quantity/item.stackSize);
        let remainder = quantity % item.stackSize;
        for(let i = 0; i < itemsToDrop; i++){
            let _item = item.clone();
            _item.quantity = item.stackSize;
            // If it doesn't divide evenly, assign remainder
            // To last item stack
            if(i+1 == itemsToDrop && remainder != 0){
                _item.quantity = remainder;
            }
            loot.push(_item);
        }
        return loot;
    };
    return lp;
};