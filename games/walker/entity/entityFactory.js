/*##############################################################################
# Factory for creating entities.
# Individual factory functins can be found alongside each entity definition
##############################################################################*/

ENTITY.TYPES = {};
ENTITY.TYPES.Scenery = "Scenery";
ENTITY.TYPES.ItemStack = "ItemStack";
ENTITY.TYPES.NPC = "NPC";
ENTITY.TYPES.Player = "Player";
ENTITY.TYPES.Harvestable = "Harvestable";

ENTITYFACTORY.Load = function(data){
    let entity = ENTITYFACTORY.Create(data.entityName);
    if(entity == null){
        console.log("Could not load entity data: " + JSON.stringify(data));
        return;
    }
    if(data.position){
        entity.position = data.position;
    }
    //console.log("Loaded entity " + JSON.stringify(data));
    return entity;
};

ENTITYFACTORY.Create = function(entityName){
    if(ENTITY.ENTITIES[entityName] && ENTITYFACTORY[entityName]){
        let constructor = ENTITYFACTORY[entityName];
        return constructor();
    }
    return null;
};

ENTITYFACTORY.getEntityNames = function(){
    return Object.keys(ENTITY.ENTITIES);
};


ENTITYFACTORY.registerItem = function(itemName){
    // Add an item stack for this item
    let stackName = itemName + "Stack";
    ENTITY.ENTITIES[stackName] = stackName;
    ENTITYFACTORY[stackName] = function(){
        let item = ITEMS.create(itemName, 1, 0);
        let ret = ENTITY.ItemStack.new(item);
        ret.name = stackName;
        return ret;
    };
};