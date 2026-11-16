/*##############################################################################
# First batch of items.
##############################################################################*/
ITEMS.Config.starterPack = function(){
    let config = [];

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

    ITEMS.Names.Resin = "Resin";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Resin,
            description: "Sticky and flammable",
            sprite: SPRITES.static.items.Resin,
            stackSize: 8,
    });
    ITEMS.Names.Torch = "Torch";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.Torch,
            description: "One a day keeps the doctor away",
            sprite: SPRITES.static.items.Torch,
            stackSize: 8,
            effects: [
                STATS.Effect.Torch(50, null, ITEMS.Types.Gear + "" + ITEMS.Names.Torch)
            ],
            slots: [
                GEAR.slots.hand,
                GEAR.slots.offHand
            ]
    });

    return config;
};