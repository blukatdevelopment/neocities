/*##############################################################################
# Data Object to be serialized
##############################################################################*/
ENTITY.Data.new = function(entityName, position){
    let data = {
        entityName: entityName,
        position: position
    };
    return data;
};