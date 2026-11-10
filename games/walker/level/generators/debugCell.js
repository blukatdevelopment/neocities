/*##############################################################################
# Cell to set up debugging scenarios
##############################################################################*/
LEVEL.Generate.Cell.Debug = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);

    let bush = ENTITYFACTORY.Bush();
    bush.position = VECTOR2.new(200, 100);
    cg.addEntity(bush);

    let berryBush = ENTITYFACTORY.BerryBush();
    berryBush.position = VECTOR2.new(300, 100);
    cg.addEntity(berryBush);

    let tree = ENTITYFACTORY.BirchTree();
    tree.position = VECTOR2.new(400, 100);
    cg.addEntity(tree);

    let slimePit = ENTITYFACTORY.SlimePit();
    slimePit.position = VECTOR2.new(500, 100);
    cg.addEntity(slimePit);

    let slime = ACTORFACTORY.Slime();
    slime.position = VECTOR2.new(600, 100);
    cg.addEntity(slime);

    let deer = ACTORFACTORY.Deer();
    deer.position = VECTOR2.new(100, 100);
    cg.addEntity(deer);


};