ITEMS.Food = {};
ITEMS.Food.new = function(){
    let f = ITEMS.BaseItem.new();
    f.type = ITEMS.Types.Food;
    f.effects = [];
    f.use = function(actor){
        if(!actor.canEat(f)){
            return;
        }
        actor.eat(f);
        f.quantity--;
        if(f.quantity < 1){
            actor.destroyItem(f);
        }
    };
    f.clone = function(){
        let clone = ITEMS.Food.new();
        clone.name = f.name;
        clone.description = f.description;
        clone.sprite = f.sprite;
        clone.quantity = f.quantity;
        clone.stackSize = f.stackSize;
        clone.durability = f.durability;
        clone.durabilityMax = f.durabilityMax;
        clone.effects = f.effects;
        return clone;
    };
    return f;
};

ITEMS.loadFood = function(config){
    let item = ITEMS.Food.new();
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
    if(Object.hasOwn(config, "effects")){
        item.effects = config.effects;
    }
    return item;
};