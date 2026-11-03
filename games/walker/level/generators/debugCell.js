/*##############################################################################
# Cell to set up debugging scenarios
##############################################################################*/
LEVEL.Generate.Cell.Debug = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    let items = [
        ITEMS.Names.Rock
    ];
    //LEVEL.Generate.Cell.addRandomItems(cg, items, UTILITY.randRange(1, 10));
    
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

    let slime = ACTORFACTORY.slime();
    slime.position = VECTOR2.new(600, 100);
    cg.addEntity(slime);
    

    let item = null;
    for(let i = 0; i < 10; i++){
        item = ENTITYFACTORY.ItemStack(ITEMS.Names.RedBerry, 1, null);
        item.position = VECTOR2.new(100 + (32 * i), 300);
        cg.addEntity(item);

        item = ENTITYFACTORY.ItemStack(ITEMS.Names.GreenBerry, 1, null);
        item.position = VECTOR2.new(100 + (32 * i), 330);
        cg.addEntity(item);

        item = ENTITYFACTORY.ItemStack(ITEMS.Names.BlueBerry, 1, null);
        item.position = VECTOR2.new(100 + (32 * i), 360);
        cg.addEntity(item);
    }

    item = ENTITYFACTORY.ItemStack(ITEMS.Names.LeatherHelm, 1, null);
    item.position = VECTOR2.new(100, 500);
    cg.addEntity(item);

    item = ENTITYFACTORY.ItemStack(ITEMS.Names.LeatherTunic, 1, null);
    item.position = VECTOR2.new(130, 500);
    cg.addEntity(item);

    item = ENTITYFACTORY.ItemStack(ITEMS.Names.LeatherLeggings, 1, null);
    item.position = VECTOR2.new(160, 500);
    cg.addEntity(item);

    item = ENTITYFACTORY.ItemStack(ITEMS.Names.LeatherShoes, 1, null);
    item.position = VECTOR2.new(190, 500);
    cg.addEntity(item);

    item = ENTITYFACTORY.ItemStack(ITEMS.Names.LeatherCape, 1, null);
    item.position = VECTOR2.new(220, 500);
    cg.addEntity(item);
};