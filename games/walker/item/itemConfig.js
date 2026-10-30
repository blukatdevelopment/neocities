/*##############################################################################
# Put item definitions here
##############################################################################*/
ITEMS.Names.Apple = "Apple";
ITEMS.Names.Seeds = "Seeds";
ITEMS.Names.Talon = "Talon";
ITEMS.Names.Stick = "Stick";
ITEMS.Names.Rope = "Rope";
ITEMS.Names.Rock = "Rock";
ITEMS.Names.RedBerry = "RedBerry";
ITEMS.Names.GreenBerry = "GreenBerry";
ITEMS.Names.BlueBerry = "BlueBerry";


ITEMS.ItemList = [];

ITEMS.getByName = function(name){
    for(let item of ITEMS.ItemList){
        if(item.name === name){
            return item;
        }
    }
    return null;
};


ITEMS.loadFromConfig = function(config){
    let item = ITEMS.Item.new();
    item.name = config.name;
    item.description = config.description;
    item.sprite = config.sprite;
    if(Object.hasOwn(config, "stackSize") && config.stackSize > 0){
        item.quantity = 1;
        item.stackSize = config.stackSize;
    }
    if(Object.hasOwn(config, "durabilityMax") && config.durability > 0){
        item.durability = config.durabilityMax;
        item.durability = config.durabilityMax;
    }
    return item;
};

// Load configs into item list
ITEMS.init = function(){
    for(let config of ITEMS.getConfig()){
        ITEMS.ItemList.push(ITEMS.loadFromConfig(config));
    }
};

ITEMS.getConfig = function(){
    return [
        {
            name: ITEMS.Names.Apple,
            description: "One a day keeps the doctor away",
            sprite: SPRITES.static.items.Apple,
            stackSize: 8
        },
        {
            name: ITEMS.Names.Seeds,
            description: "Should I eat these, or plant them?",
            sprite: SPRITES.static.items.Seeds,
            stackSize: 8
        },
        {
            name: ITEMS.Names.Talon,
            description: "Seems sharp",
            sprite: SPRITES.static.items.Talon,
            stackSize: 8
        },
        {
            name: ITEMS.Names.Stick,
            description: "Was once part of a tree",
            sprite: SPRITES.static.items.Stick,
            stackSize: 8
        },
        {
            name: ITEMS.Names.Rope,
            description: "Seems sturdy",
            sprite: SPRITES.static.items.Rope,
            stackSize: 8
        },
        {
            name: ITEMS.Names.Rock,
            description: "Has some heft to it",
            sprite: SPRITES.static.items.Rock,
            stackSize: 8
        },
        {
            name: ITEMS.Names.RedBerry,
            description: "Sweet and mildly tart.",
            sprite: SPRITES.static.items.RedBerry,
            stackSize: 8
        },
        {
            name: ITEMS.Names.GreenBerry,
            description: "What plant does this come from?",
            sprite: SPRITES.static.items.GreenBerry,
            stackSize: 8
        },
        {
            name: ITEMS.Names.BlueBerry,
            description: "It's actually purple, not blue.",
            sprite: SPRITES.static.items.BlueBerry,
            stackSize: 8
        },
    ];
};