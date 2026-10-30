LEVEL.RandomPosition = function(){
    let size = SETTINGS.DefaultLevelTileSize * SETTINGS.DefaultLevelSize;
    return VECTOR2.new(UTILITY.randRange(0, size), UTILITY.randRange(0, size));
};

LEVEL.Generate.UniformTileMap = function(sprite, size){
    let sprites = [];
    sprites.push(sprite);
    let tiles = [];
    for(let i = 0; i < size*size; i++){
        tiles.push(0);
    }
    return LEVEL.TileMap.new(sprites, tiles, size);
};