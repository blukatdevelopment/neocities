/*##############################################################################
# First batch of items.
##############################################################################*/
ITEMS.Config.StarterPack = function(){
    let config = [];
    
    ITEMS.Names.Apple = "Apple";
    config.push({
            name: ITEMS.Names.Apple,
            description: "One a day keeps the doctor away",
            sprite: SPRITES.static.items.Apple,
            stackSize: 8
    });

    ITEMS.Names.Seeds = "Seeds";
    config.push({
            name: ITEMS.Names.Seeds,
            description: "Should I eat these, or plant them?",
            sprite: SPRITES.static.items.Seeds,
            stackSize: 8
    });

    ITEMS.Names.Talon = "Talon";
    config.push({
            name: ITEMS.Names.Talon,
            description: "Seems sharp",
            sprite: SPRITES.static.items.Talon,
            stackSize: 8
    });

    ITEMS.Names.Stick = "Stick";
    config.push({
            name: ITEMS.Names.Stick,
            description: "Was once part of a tree",
            sprite: SPRITES.static.items.Stick,
            stackSize: 8
    });

    ITEMS.Names.Rope = "Rope";
    config.push({
            name: ITEMS.Names.Rope,
            description: "Seems sturdy",
            sprite: SPRITES.static.items.Rope,
            stackSize: 8
    });

    ITEMS.Names.Rock = "Rock";
    config.push({
            name: ITEMS.Names.Rock,
            description: "Has some heft to it",
            sprite: SPRITES.static.items.Rock,
            stackSize: 8
    });

    ITEMS.Names.RedBerry = "RedBerry";
    config.push({
            name: ITEMS.Names.RedBerry,
            description: "Sweet and mildly tart.",
            sprite: SPRITES.static.items.RedBerry,
            stackSize: 8
    });

    ITEMS.Names.GreenBerry = "GreenBerry";
    config.push({
            name: ITEMS.Names.GreenBerry,
            description: "What plant does this come from?",
            sprite: SPRITES.static.items.GreenBerry,
            stackSize: 8
    });

    ITEMS.Names.BlueBerry = "BlueBerry";
    config.push({
            name: ITEMS.Names.BlueBerry,
            description: "It's actually purple, not blue.",
            sprite: SPRITES.static.items.BlueBerry,
            stackSize: 8
    });

    return config;
};