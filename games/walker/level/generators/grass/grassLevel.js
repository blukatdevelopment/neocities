LEVEL.Generate.Grass = function(){
    let data = LEVEL.Data.new();
    data.tileMap = LEVEL.Generate.UniformTileMap(SPRITES.static.village.village, SETTINGS.DefaultLevelSize);
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(SETTINGS.DefaultLevelTileSize, SETTINGS.DefaultLevelTileSize));
    let cellGenerators = [
        LEVEL.Generate.Cell.GrassClearing,
        LEVEL.Generate.Cell.GrassThickWoods,
        LEVEL.Generate.Cell.GrassForest,
        LEVEL.Generate.Cell.GrassSlimePit
    ];
    for(let y = 0; y < SETTINGS.DefaultLevelSize; y++){
        for(let x = 0; x < SETTINGS.DefaultLevelSize; x++){
            rect.position.x = x * SETTINGS.DefaultLevelTileSize;
            rect.position.y = y * SETTINGS.DefaultLevelTileSize;
            let cellGenerator = UTILITY.choice(cellGenerators);
            cellGenerator(data, rect);
        }
    }
    return data;
};