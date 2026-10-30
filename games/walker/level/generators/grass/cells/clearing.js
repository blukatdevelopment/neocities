LEVEL.Generate.Cell.GrassClearing = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Rock
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, UTILITY.randRange(1, 10));
    let scenery = [
        ENTITYFACTORY.Bush,
        ENTITYFACTORY.BerryBush
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenery, UTILITY.randRange(3, 5));
};