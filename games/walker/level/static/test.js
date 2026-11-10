
/*##############################################################################
# This is a test static level.
##############################################################################*/
LEVEL.Static.TestLevel = function(){
    let data = LEVEL.Data.new();
    let sprites = [];
    sprites.push(SPRITES.static.village.village);
    let tiles = [
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,
    ];
    data.tileMap = LEVEL.TileMap.new(sprites, tiles, 9);

    data.entityData.push(ENTITY.Data.new("PlayerOne", VECTOR2.new(0,0)))
    data.entityData.push(ENTITY.Data.new("PlayerOne", VECTOR2.new(0,0)))
    data.entityData.push(ENTITY.Data.new("PlayerOne", VECTOR2.new(0,0)))
    data.entityData.push(ENTITY.Data.new("Bush", VECTOR2.new(200,100)))
    data.entityData.push(ENTITY.Data.new("BerryBush", VECTOR2.new(164.85714285714286,208.0952410016741)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(400,100)))
    data.entityData.push(ENTITY.Data.new("SlimePit", VECTOR2.new(500,100)))
    data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(600,100)))
    data.entityData.push(ENTITY.Data.new("Deer", VECTOR2.new(100,100)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(445,505)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(340,610)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(225,725)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(295,925)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(535,800)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(655,680)))
    data.entityData.push(ENTITY.Data.new("BirchTree", VECTOR2.new(785,550)))
    return data;
};