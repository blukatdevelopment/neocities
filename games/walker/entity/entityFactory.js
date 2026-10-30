/*##############################################################################
# Factory for creating entities.
# Individual factory functins can be found alongside each entity definition
##############################################################################*/

ENTITY.TYPES = {};
ENTITY.TYPES.Scenery = "Scenery";
ENTITY.TYPES.ItemStack = "ItemStack";
ENTITY.TYPES.Enemy = "Enemy";
ENTITY.TYPES.Player = "Player";

ENTITYFACTORY.Load = function(data){
    let entity = null;
    
    if(data.entityType == ENTITY.TYPES.ItemStack){
        entity = ENTITYFACTORY.ItemStack(data.item, 1, 1);
        entity.setPosition(data.position);
    }
    if(data.entityType == ENTITY.TYPES.Enemy){
        entity = ACTORFACTORY.slime();
        entity.setPosition(data.position);
    }
    if(data.entityType == ENTITY.TYPES.Scenery){
        entity = ENTITYFACTORY.Scenery(data.sprite, data.position);
    }
    return entity;
};