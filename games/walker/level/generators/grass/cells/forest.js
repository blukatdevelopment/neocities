LEVEL.Generate.Cell.GrassForest = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Apple,
        ITEMS.Names.Stick,
        ITEMS.Names.Rock
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, 5);
    
    let scenery = [
        ENTITYFACTORY.BirchTree,
        ENTITYFACTORY.Bush,
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenery, 50);
};