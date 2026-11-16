
/*##############################################################################
# This is a test static level, a dungeon
##############################################################################*/
LEVEL.Static.TestLevel = function(){
    let data = LEVEL.Data.new();
    data.exterior = false;
    data.darkness = 50;
    	data.playerPosition = VECTOR2.new(2375, 8900);
	data.entityData.push(ENTITY.Data.new("CaveFloor", VECTOR2.new(2256,8800)));
	data.entityData.push(ENTITY.Data.new("CaveWallNorth", VECTOR2.new(2256,8800)));
	data.entityData.push(ENTITY.Data.new("CaveWallSouth", VECTOR2.new(2256,8800)));
	data.entityData.push(ENTITY.Data.new("CaveWallEast", VECTOR2.new(2256,8800)));
	data.entityData.push(ENTITY.Data.new("CaveWallWest", VECTOR2.new(2256,8800)));
    return data;
};