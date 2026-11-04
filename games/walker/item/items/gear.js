ITEMS.Gear = {};
ITEMS.Gear.new = function(){
    let g = ITEMS.BaseItem.new();
    g.type = ITEMS.Types.Gear;
    g.effects = [];
    g.slots = [];
    g.attacks = [];
    g.clone = function(){
        let clone = ITEMS.Gear.new();
        clone.name = g.name;
        clone.description = g.description;
        clone.sprite = g.sprite;
        clone.quantity = g.quantity;
        clone.stackSize = g.stackSize;
        clone.durability = g.durability;
        clone.durabilityMax = g.durabilityMax;
        clone.effects = g.effects;
        clone.slots = g.slots;
        clone.attacks = g.attacks;
        return clone;
    };
    return g;
};

ITEMS.loadGear = function(config){
    let item = ITEMS.Gear.new();
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
    else{
        console.log("Misconfigured gear; " + item.name + " lacks effects");
    }
    if(Object.hasOwn(config, "slots")){
        item.slots = config.slots;
    }
    else{
        console.log("Misconfigured gear; " + item.name + " lacks slots");
    }
    return item;
};