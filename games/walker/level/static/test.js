
/*##############################################################################
# This is a test static level.
##############################################################################*/
LEVEL.Static.TestLevel = function(){
    let data = LEVEL.Data.new();
    data.playerPosition = VECTOR2.new(2375,8900);
    data.exterior = true;
    let sprites = [];
    sprites.push(SPRITES.static.emptyTile.emptyTile);
    sprites.push(SPRITES.static.stoneTile.stoneTile);
    let tiles = [
    0,0,0,0,0,0,0,0,0,
    0,0,1,1,1,1,1,1,0,
    0,0,1,0,0,0,0,1,0,
    0,0,1,0,0,0,0,1,0,
    0,0,1,1,1,1,1,0,0,
    0,0,0,0,1,0,0,0,0,
    0,0,1,1,1,0,0,0,0,
    0,0,1,0,0,0,0,0,0,
    0,0,1,0,0,0,0,0,0,
    ];
    data.tileMap = LEVEL.TileMap.new(sprites, tiles, 9);
    data.tileMap.noTraverseTiles.push(0);
    data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2339,8374)));
    data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2434,8374)));
    data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2539,8374)));
    data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2564,7779)));
    data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2504,7779)));
    data.entityData.push(ENTITY.Data.new("Slime", VECTOR2.new(2439,7779)));
    return data;
};