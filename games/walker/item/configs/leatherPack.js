/*##############################################################################
# Leather item set
##############################################################################*/
ITEMS.Config.leatherPack = function(){
    let config = [];
    
    ITEMS.Names.LeatherHelm = "LeatherHelm";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.LeatherHelm,
            description: "Protects your noggin",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [
                STATS.Effect.Armor(1, null, ITEMS.Names.LeatherHelm)
            ],
            slots: [
                GEAR.slots.head
            ]
    });

    ITEMS.Names.LeatherTunic = "LeatherTunic";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.LeatherTunic,
            description: "Keeps your torso warm",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [
                STATS.Effect.Armor(1, null, ITEMS.Names.LeatherTunic)
            ],
            slots: [
                GEAR.slots.torso
            ]
    });

    ITEMS.Names.LeatherLeggings = "LeatherLeggings";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.LeatherLeggings,
            description: "Keeps your legs warm",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [
                STATS.Effect.Armor(1, null, ITEMS.Names.LeatherLeggings)
            ],
            slots: [
                GEAR.slots.legs
            ]
    });

    ITEMS.Names.LeatherShoes = "LeatherShoes";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.LeatherShoes,
            description: "Keeps your feet warm",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [
                STATS.Effect.Armor(1, null, ITEMS.Names.LeatherShoes)
            ],
            slots: [
                GEAR.slots.feet
            ]
    });

    ITEMS.Names.LeatherCape = "LeatherCape";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.LeatherCape,
            description: "Flutters behind you",
            sprite: SPRITES.static.items.Apple,
            stackSize: 1,
            effects: [
                STATS.Effect.Armor(1, null, ITEMS.Names.LeatherCape)
            ],
            slots: [
                GEAR.slots.special1
            ]
    });

    return config;
};