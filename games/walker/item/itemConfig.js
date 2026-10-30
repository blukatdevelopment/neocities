/*##############################################################################
# Configures items. Add new item configs in a script in /configs 
##############################################################################*/
ITEMS.ItemList = [];

ITEMS.getByName = function(name){
    for(let item of ITEMS.ItemList){
        if(item.name === name){
            return item;
        }
    }
    return null;
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

ITEMS.getConfig = function(){
    let config = [];
    config.push(...ITEMS.Config.StarterPack());
    return config;    
};