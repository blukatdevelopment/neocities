/*##############################################################################
# First batch of items.
##############################################################################*/
ITEMS.Config.starterPack = function(){
    let config = [];
    
    ITEMS.Names.Apple = "Apple";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.Apple,
            description: "One a day keeps the doctor away",
            sprite: SPRITES.static.items.Apple,
            stackSize: 8,
            effects: [
                STATS.Effect.FoodHealth(10, 5 * TIME.minute, ITEMS.Names.Apple),
                STATS.Effect.FoodEnergy(10, 5 * TIME.minute, ITEMS.Names.Apple),
                STATS.Effect.FoodMagic(10, 5 * TIME.minute, ITEMS.Names.Apple)
            ]
    });

    ITEMS.Names.Seeds = "Seeds";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Seeds,
            description: "Should I eat these, or plant them?",
            sprite: SPRITES.static.items.Seeds,
            stackSize: 8
    });

    ITEMS.Names.Talon = "Talon";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Talon,
            description: "Seems sharp",
            sprite: SPRITES.static.items.Talon,
            stackSize: 8
    });

    ITEMS.Names.Stick = "Stick";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Stick,
            description: "Was once part of a tree",
            sprite: SPRITES.static.items.Stick,
            stackSize: 8
    });

    ITEMS.Names.Rope = "Rope";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Rope,
            description: "Seems sturdy",
            sprite: SPRITES.static.items.Rope,
            stackSize: 8
    });

    ITEMS.Names.Rock = "Rock";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Rock,
            description: "Has some heft to it",
            sprite: SPRITES.static.items.Rock,
            stackSize: 8
    });

    ITEMS.Names.RedBerry = "RedBerry";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.RedBerry,
            description: "Sweet and mildly tart.",
            sprite: SPRITES.static.items.RedBerry,
            stackSize: 8,
            effects: [
                STATS.Effect.FoodHealth(10, 5 * TIME.minute, ITEMS.Names.RedBerry),
                STATS.Effect.FoodEnergy(10, 5 * TIME.minute, ITEMS.Names.RedBerry),
                STATS.Effect.FoodMagic(10, 5 * TIME.minute, ITEMS.Names.RedBerry)
            ]
    });

    ITEMS.Names.GreenBerry = "GreenBerry";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.GreenBerry,
            description: "What plant does this come from?",
            sprite: SPRITES.static.items.GreenBerry,
            stackSize: 8,
            effects: [
                STATS.Effect.FoodHealth(10, 5 * TIME.minute, ITEMS.Names.GreenBerry),
                STATS.Effect.FoodEnergy(10, 5 * TIME.minute, ITEMS.Names.GreenBerry),
                STATS.Effect.FoodMagic(10, 5 * TIME.minute, ITEMS.Names.GreenBerry)
            ]
    });

    ITEMS.Names.BlueBerry = "BlueBerry";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.BlueBerry,
            description: "It's actually purple, not blue.",
            sprite: SPRITES.static.items.BlueBerry,
            stackSize: 8,
            effects: [
                STATS.Effect.FoodHealth(10, 5 * TIME.minute, ITEMS.Names.BlueBerry),
                STATS.Effect.FoodEnergy(10, 5 * TIME.minute, ITEMS.Names.BlueBerry),
                STATS.Effect.FoodMagic(10, 5 * TIME.minute, ITEMS.Names.BlueBerry)
            ]
    });

    return config;
};