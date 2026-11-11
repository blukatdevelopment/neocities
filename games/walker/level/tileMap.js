LEVEL.TileMap = {};
LEVEL.TileMap.new = function(sprites, tiles, size){
    let tm = {
        tileSprites: sprites,
        tiles: tiles,
        size: size, // Assumed to be square
        noTraverseTiles: [], //
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
    tm.getNoTraverseRects = function(){
        if(tm.noTraverseTiles == null || tm.noTraverseTiles.length == 0){
            return [];
        }
        if(tm.rectCache){
            return tm.rectCache;
        }
        let size = SETTINGS.DefaultLevelTileSize;
        let rects = [];
        for(let i = 0; i < tm.tiles.length; i++){
            if(tm.noTraverseTiles.includes(tm.tiles[i])){
                rects.push(SHAPES.RECT.new(
                    tm.getPositionByIndex(i),
                    VECTOR2.new(size, size)
                ));
            }
        }
        tm.rectCache = rects;
        return rects;
    };
    return tm;
};