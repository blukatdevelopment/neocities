LEVEL.TileMap = {};
LEVEL.TileMap.new = function(sprites, tiles, size){
    let tm = {
        tileSprites: sprites,
        tiles: tiles,
        size: size, // Assumed to be square
        rectCache: null
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
    tm.getSpriteIndexByCoords = function(coords){
        let index = coords.y * tm.size + coords.x;
        console.log("getSpriteBycoords " + coords.toString() + ", index " + index);
        return tm.tiles[index];
    };
    return tm;
};