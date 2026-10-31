/*##############################################################################
# Cell to set up debugging scenarios
##############################################################################*/
LEVEL.Generate.Cell.Debug = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Rock
    ];
    //LEVEL.Generate.Cell.addRandomItems(cg, items, UTILITY.randRange(1, 10));
    let scenery = [
        ENTITYFACTORY.Bush,
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenery, 1);
};