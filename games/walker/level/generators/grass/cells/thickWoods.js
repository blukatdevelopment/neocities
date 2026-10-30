LEVEL.Generate.Cell.GrassThickWoods = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Apple,
        ITEMS.Names.Stick,
        ITEMS.Names.Rock
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, 3);
    
    let scenerySprites = [
        SPRITES.static.scenery64.tree,
        SPRITES.static.scenery64.bush,
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenerySprites, 20);
};