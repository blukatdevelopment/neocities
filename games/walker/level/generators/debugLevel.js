/*##############################################################################
# Used to render a single cell for debugging
##############################################################################*/

LEVEL.Generate.DebugLevel = function(){
    SETTINGS.DefaultLevelSize = 1; // Change level to a single cell wide
    let data = LEVEL.Data.new();
    data.tileMap = LEVEL.Generate.UniformTileMap(SPRITES.static.village.village, 1);
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(SETTINGS.DefaultLevelTileSize, SETTINGS.DefaultLevelTileSize));
    rect.position.x = 0;
    rect.position.y = 0;
    LEVEL.Generate.Cell.Debug(data, rect);
    return data;
};