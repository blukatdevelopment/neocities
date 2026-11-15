
/*##############################################################################
# This is a test static level, a dungeon
##############################################################################*/
LEVEL.Static.TestLevel = function(){
    let data = LEVEL.Data.new();
    data.playerPosition = VECTOR2.new(2375,8900);
    data.exterior = false;
    data.darkness = 50;
    //data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2339,8374)));
    return data;
};