LEVEL.Generate.Cell.GrassClearing = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Rock
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, UTILITY.randRange(1, 10));
    let scenerySprites = [
        SPRITES.static.scenery64.bush,
        SPRITES.static.scenery64.berryBush
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenerySprites, UTILITY.randRange(3, 5));
};