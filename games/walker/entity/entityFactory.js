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
    let entity = null;
    
    if(data.entityType == ENTITY.TYPES.ItemStack){
        entity = ENTITYFACTORY.ItemStack(data.item, 1, 1);
        entity.setPosition(data.position);
    }
    let actorNames = Object.keys(ACTOR.Names);
    if(data.entityType == ENTITY.TYPES.NPC && actorNames.includes(data.name)){
        entity = ACTORFACTORY[data.name]();
        entity.setPosition(data.position);
    }
    if(data.entityType == ENTITY.TYPES.Scenery){
        entity = ENTITYFACTORY.Scenery(data.sprite, data.position, data.rect);
    }
    if(data.entityType == ENTITY.TYPES.Harvestable){
        entity = ENTITYFACTORY.Harvestable(data.items, data.emptySprite, data.fullSprite, data.rect, data.rigid);
        entity.setPosition(data.position);
    }
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
    let stackName = itemName + "Stack";
    ENTITY.ENTITIES[stackName] = stackName;
    ENTITYFACTORY[stackName] = function(){
        return ENTITYFACTORY.ItemStack(itemName, 1, 0);
    };
};