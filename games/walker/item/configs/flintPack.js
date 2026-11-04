/*##############################################################################
# Flint item set
##############################################################################*/
ITEMS.Config.flintPack = function(){
    let config = [];
    
    ITEMS.Names.Flint = "Flint";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Flint,
            description: "An upgrade from bone and wood",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1
    });

    ITEMS.Names.FlintKnife = "FlintKnife";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.FlintKnife,
            description: "Good for cutting cordage.",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [],
            slots: [
                GEAR.slots.hand,
                GEAR.slots.offHand
            ]
    });

    ITEMS.Names.FlintAxe = "FlintAxe";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.FlintAxe,
            description: "Good for felling trees.",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [],
            slots: [
                GEAR.slots.hand,
                GEAR.slots.offHand
            ]
    });

    ITEMS.Names.FlintSpear = "FlintSpear";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.FlintKnife,
            description: "A hunter's weapon",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [],
            slots: [
                GEAR.slots.hand,
                GEAR.slots.offHand
            ]
    });

    ITEMS.Names.FlintSword = "Flintsword";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.FlintSword,
            description: "A tool of war",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [],
            slots: [
                GEAR.slots.hand,
                GEAR.slots.offHand
            ]
    });

    ITEMS.Names.FlintKnife = "FlintKnife";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.FlintKnife,
            description: "Good for cutting cordage.",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [],
            slots: [
                GEAR.slots.hand,
                GEAR.slots.offHand
            ]
    });

    ITEMS.Names.FlintKnife = "FlintKnife";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.FlintKnife,
            description: "Good for cutting cordage.",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [],
            slots: [
                GEAR.slots.hand,
                GEAR.slots.offHand
            ]
    });

    return config;
};