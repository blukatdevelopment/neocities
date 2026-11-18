
/*##############################################################################
# Babby's first dungeon
##############################################################################*/
LEVEL.Static.Cave = function(){
    let data = LEVEL.Data.new();
    data.name = "A cave!"
    data.exterior = false;
    data.darkness = 50;
	data.playerPosition = VECTOR2.new(2352, 8928);
	data.entityData.push(ENTITY.Data.new("CaveFloor", VECTOR2.new(2240,8512)));
	data.entityData.push(ENTITY.Data.new("CaveFloor", VECTOR2.new(2240,8768)));
	data.entityData.push(ENTITY.Data.new("CaveFloor", VECTOR2.new(2496,8512)));
	data.entityData.push(ENTITY.Data.new("CaveFloor", VECTOR2.new(2752,8512)));
	data.entityData.push(ENTITY.Data.new("CaveFloor", VECTOR2.new(2752,8256)));
	data.entityData.push(ENTITY.Data.new("CaveFloor", VECTOR2.new(2752,8000)));
	data.entityData.push(ENTITY.Data.new("CaveWallNorth", VECTOR2.new(2240,8512)));
	data.entityData.push(ENTITY.Data.new("CaveWallNorth", VECTOR2.new(2496,8512)));
	data.entityData.push(ENTITY.Data.new("CaveWallNorth", VECTOR2.new(2752,8000)));
	data.entityData.push(ENTITY.Data.new("CaveWallWest", VECTOR2.new(2752,8272)));
	data.entityData.push(ENTITY.Data.new("CaveWallWest", VECTOR2.new(2752,8016)));
	data.entityData.push(ENTITY.Data.new("CaveWallWest", VECTOR2.new(2240,8528)));
	data.entityData.push(ENTITY.Data.new("CaveWallWest", VECTOR2.new(2240,8768)));
	data.entityData.push(ENTITY.Data.new("CaveWallSouth", VECTOR2.new(2240,8768)));
	data.entityData.push(ENTITY.Data.new("CaveWallSouth", VECTOR2.new(2496,8512)));
	data.entityData.push(ENTITY.Data.new("CaveWallSouth", VECTOR2.new(2752,8512)));
	data.entityData.push(ENTITY.Data.new("CaveWallEast", VECTOR2.new(2240,8752)));
	data.entityData.push(ENTITY.Data.new("CaveWallEast", VECTOR2.new(2752,8496)));
	data.entityData.push(ENTITY.Data.new("CaveWallEast", VECTOR2.new(2752,8240)));
	data.entityData.push(ENTITY.Data.new("CaveWallEast", VECTOR2.new(2752,8000)));
	data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2352,8768)));
	data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2368,8592)));
	data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2624,8608)));
	data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2864,8608)));
	data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2848,8352)));
	data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2864,8096)));
	data.entityData.push(ENTITY.Data.new("AppleStack", VECTOR2.new(2272,8960)));
	data.entityData.push(ENTITY.Data.new("RedBerryStack", VECTOR2.new(2272,8928)));
	data.entityData.push(ENTITY.Data.new("GreenBerryStack", VECTOR2.new(2272,8896)));
	data.entityData.push(ENTITY.Data.new("BlueBerryStack", VECTOR2.new(2272,8864)));
	data.entityData.push(ENTITY.Data.new("VenisonStack", VECTOR2.new(2272,8992)));
    return data;
};