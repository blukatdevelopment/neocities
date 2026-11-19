/*##############################################################################
# Used to render a single cell for debugging
##############################################################################*/

LEVEL.Generate.DebugLevel = function(){
    let data = LEVEL.Data.new();
    data.name = "Debug Exterior Level";
    data.tileMap = LEVEL.Generate.UniformTileMap(SPRITES.static.village.village, 1);
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(SETTINGS.DefaultLevelTileSize, SETTINGS.DefaultLevelTileSize));
    rect.position.x = 0;
    rect.position.y = 0;
    data.playerPosition = VECTOR2.new(500, 500);
    data.levelRect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(1024, 1024));
    LEVEL.Generate.Cell.Debug(data, rect);
    return data;
};