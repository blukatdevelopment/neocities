LEVEL.TileMap = {};
LEVEL.TileMap.new = function(sprites, tiles, size){
    let tm = {
        tileSprites: sprites,
        tiles: tiles,
        size: size, // Assumed to be square
    };
    tm.getRect = function(){
        let pos = VECTOR2.new(0,0);
        let tileSize = SETTINGS.DefaultLevelTileSize;
        let levelSize = tileSize * tm.size; 
        return SHAPES.RECT.new(pos, VECTOR2.new(levelSize, levelSize));
    };
    tm.getPositionByIndex = function(index){
        let coords = VECTOR2.new(index % tm.size, Math.trunc(index / tm.size));
        coords.x *= SETTINGS.DefaultLevelTileSize;
        coords.y *= SETTINGS.DefaultLevelTileSize;
        return coords;
    };
    tm.getSpriteByIndex = function(index){
        return tm.tileSprites[tm.tiles[index]];
    };
    return tm;
};