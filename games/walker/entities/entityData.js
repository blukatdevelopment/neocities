/*##############################################################################
# Data Object to be serialized
##############################################################################*/
ENTITY.Data.new = function(entityType, position){
    let data = {
        entityType: entityType,
        position: position,
        item: null,
        sprite: null
    };
    return data;
};