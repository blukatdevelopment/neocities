/*##############################################################################
# Food items
##############################################################################*/
ITEMS.Config.foodPack = function(){
	let config = [];

    ITEMS.Names.Apple = "Apple";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.Apple,
            description: "One a day keeps the doctor away",
            sprite: SPRITES.static.items.Apple,
            stackSize: 8,
            effects: STATS.Effect.foodEffects(10 * TIME.minute, ITEMS.Names.Apple, 1, 3, 0)
    });

    ITEMS.Names.RedBerry = "RedBerry";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.RedBerry,
            description: "Sweet and mildly tart.",
            sprite: SPRITES.static.items.RedBerry,
            stackSize: 8,
            effects: STATS.Effect.foodEffects(10 * TIME.minute, ITEMS.Names.RedBerry, 1, 3, 0)
    });    	

    ITEMS.Names.GreenBerry = "GreenBerry";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.GreenBerry,
            description: "What plant does this come from?",
            sprite: SPRITES.static.items.GreenBerry,
            stackSize: 8,
            effects: STATS.Effect.foodEffects(10 * TIME.minute, ITEMS.Names.GreenBerry, 1, 3, 0)
    });

    ITEMS.Names.BlueBerry = "BlueBerry";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.BlueBerry,
            description: "It's actually purple, not blue.",
            sprite: SPRITES.static.items.BlueBerry,
            stackSize: 8,
            effects: STATS.Effect.foodEffects(10 * TIME.minute, ITEMS.Names.BlueBerry, 0, 3, 3)
    });

    ITEMS.Names.Venison = "Venison";
    config.push({
            type: ITEMS.Types.Food,
            name: ITEMS.Names.Venison,
            description: "Very savory, lean meat",
            sprite: SPRITES.static.items.MeatSteak,
            stackSize: 8,
            effects: STATS.Effect.foodEffects(10 * TIME.minute, ITEMS.Names.Venison, 3, 0, 0)
    });

	return config;
};