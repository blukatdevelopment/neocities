/*##############################################################################
# Configures items. Add new item configs in a script in /configs 
##############################################################################*/
ITEMS.Types = {};
ITEMS.Types.Base = "Base";
ITEMS.Types.Food = "Food";
ITEMS.Types.Gear = "Gear";

ITEMS.ItemList = [];

ITEMS.getByName = function(name){
    for(let item of ITEMS.ItemList){
        if(item.name === name){
            return item;
        }
    }
    console.log("Item " + name  + " not found.");
    return null;
};


ITEMS.loadFromConfig = function(config){
    switch(config.type){
        case ITEMS.Types.Base:
            return ITEMS.loadBaseItem(config);
            break;
        case ITEMS.Types.Food:
            return ITEMS.loadFood(config);
            break; 
        case ITEMS.Types.Gear:
            return ITEMS.loadGear(config);
            break;
    }
    return null;
};

// Load configs into item list
ITEMS.init = function(){
    for(let config of ITEMS.getConfig()){
        ITEMS.ItemList.push(ITEMS.loadFromConfig(config));
    }
};

ITEMS.getConfig = function(){
    let config = [];
    config.push(...ITEMS.Config.starterPack());
    config.push(...ITEMS.Config.leatherPack());
    config.push(...ITEMS.Config.flintPack());
    return config;    
};