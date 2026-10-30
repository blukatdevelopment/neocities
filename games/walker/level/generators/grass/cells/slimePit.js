LEVEL.Generate.Cell.GrassSlimePit = function(data, rect){
    let cg = LEVEL.Generate.Cell.new(data, rect);
    
    let center = rect.center();
    let slimePit = ENTITYFACTORY.Scenery(SPRITES.static.scenery64.slimepit, center);
    cg.addEntity(slimePit);

    let slimePositions = [
        center.add(VECTOR2.new(-50, -50)),
        center.add(VECTOR2.new(100, -50)),
        center.add(VECTOR2.new(50, 50))
    ];
    for(let slimePos of slimePositions){
        let slime = ACTORFACTORY.slime();
        slime.teleport(slimePos);
        cg.addEntity(slime);
    }

    let items = [
        ITEMS.Names.Apple,
        ITEMS.Names.Seeds,
        ITEMS.Names.Talon,
        ITEMS.Names.Stick,
        ITEMS.Names.Rock,
        ITEMS.Names.RedBerry,
        ITEMS.Names.GreenBerry,
        ITEMS.Names.BlueBerry
    ];
    LEVEL.Generate.Cell.addRandomItems(cg, items, 10);

    let scenerySprites = [
        SPRITES.static.scenery64.tree,
        SPRITES.static.scenery64.bush
    ];
    LEVEL.Generate.Cell.addRandomScenery(cg, scenerySprites, UTILITY.randRange(1, 10));
};