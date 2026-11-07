/*##############################################################################
# Leather item set
##############################################################################*/
ITEMS.Config.leatherPack = function(){
    let config = [];
    
    ITEMS.Names.Leather = "Leather";
    config.push({
            type: ITEMS.Types.Base,
            name: ITEMS.Names.Leather,
            description: "A durable sheet of tanned hide",
            sprite: SPRITES.static.items.Leather,
            stackSize: 8
    });

    ITEMS.Names.LeatherHelm = "LeatherHelm";
    config.push({
            type: ITEMS.Types.Gear,
            name: ITEMS.Names.LeatherHelm,
            description: "Protects your noggin",
            sprite: SPRITES.static.items.LeatherHelm,
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
            sprite: SPRITES.static.items.LeatherTunic,
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
            sprite: SPRITES.static.items.LeatherLeggings,
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
            sprite: SPRITES.static.items.LeatherShoes,
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
            sprite: SPRITES.static.items.LeatherCape,
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