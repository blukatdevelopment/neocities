/*##############################################################################
# Should reflect the spritesheets found in /assets
##############################################################################*/
SETTINGS.staticSheetList = [];
SETTINGS.staticSheetList.push({
    name: "village",
    sheet: "village.png",
    resolutionX: 1024,
    resolutionY: 1024,
    cells: 1,
    sprites: ["village"]
});

SETTINGS.staticSheetList.push({
    name: "items",
    sheet: "items.png",
    resolutionX: 16,
    resolutionY: 16,
    cells: 22,
    sprites: [
        "Apple", "Seeds", "Talon", "Stick",
        "Rope", "Rock", "RockGrass", "Root",
        "RedBerry", "GreenBerry", "BlueBerry", "Flint",
        "FlintKnife", "FlintAxe", "FlintSpear", "FlintSword",
        "LeatherHelm","LeatherTunic","LeatherLeggings","LeatherShoes",
        "LeatherCape", "Leather"
    ]
});

SETTINGS.staticSheetList.push({
    name: "cursors",
    sheet: "cursors.png",
    resolutionX: 8,
    resolutionY: 8,
    cells: 6,
    sprites: [
        "roundBlack", "roundRed", "roundGreen",
        "arrowBlack", "arrowRed", "arrowGreen"
    ]
});
SETTINGS.staticSheetList.push({
    name: "hotbar",
    sheet: "hotbar.png",
    resolutionX: 154,
    resolutionY: 18,
    cells: 1,
    sprites: ["hotbar"]
});
SETTINGS.staticSheetList.push({
    name: "scenery64",
    sheet: "scenery64.png",
    resolutionX: 64,
    resolutionY: 64,
    cells: 7,
    sprites: [
        "tree", "bush", "berryBush",
        "boulder", "slimepit", "hovel", "campfire"
    ]
});
SETTINGS.staticSheetList.push({
    name: "inventory",
    sheet: "inventory.png",
    resolutionX: 154,
    resolutionY: 52,
    cells: 1,
    sprites: ["inventory"]
});

SETTINGS.staticSheetList.push({
    name: "statusbar",
    sheet: "statusbar.png",
    resolutionX: 80,
    resolutionY: 89,
    cells: 1,
    sprites: ["statusbar"]
});

SETTINGS.staticSheetList.push({
    name: "foodbar",
    sheet: "foodbar.png",
    resolutionX: 48,
    resolutionY: 64,
    cells: 1,
    sprites: ["foodbar"]
});

SETTINGS.staticSheetList.push({
    name: "paperdoll",
    sheet: "paperdoll.png",
    resolutionX: 89,
    resolutionY: 80,
    cells: 1,
    sprites: ["paperdoll"]
});