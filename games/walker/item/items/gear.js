ITEMS.Gear = {};

ITEMS.Gear.Types = {};
ITEMS.Gear.Types.Armor = "Armor";
ITEMS.Gear.Types.Weapon = "Weapon";


ITEMS.Gear.Properties = ["effects", "slots", "attacks", "primaryUse", "secondaryUse",
        "healthCost", "energyCost", "magicCost", "durabilityMax", "stackSize",
        "gearType", "sprite", "type", "gearType", "name", "description", "quantity", "durability", "inventory"];

ITEMS.Gear.new = function(){
    let g = ITEMS.BaseItem.new();
    g.type = ITEMS.Types.Gear;
    g.gearType = null;
    g.effects = [];
    g.slots = [];
    g.attacks = [];
    g.healthCost = 0;
    g.energyCost = 0;
    g.magicCost = 0;
    g.primaryUse = function(gear, actor){};
    g.secondaryUse = function(gear, actor){};
    g.clone = function(){
        let clone = ITEMS.Gear.new();
        for(let property of ITEMS.Gear.Properties){
            UTILITY.copyProperty(g, clone, property);
        }
        return clone;
    };
    return g;
};

ITEMS.Gear.Uses = {};
ITEMS.Gear.Uses.PrimaryAttack = function(gear, actor){
    if(gear.attacks && gear.attacks.length > 0){
        actor.attack(gear.attacks[0]);
    }
};

ITEMS.Gear.Uses.SecondaryAttack = function(gear, actor){
    if(gear.attacks && gear.attacks.length > 1){
        actor.attack(gear.attacks[1]);
    }
};

ITEMS.loadGear = function(config){
    let item = ITEMS.Gear.new();
    item.name = config.name;
    item.description = config.description;
    item.sprite = config.sprite;
    item.quantity = 1;
    for(let property of ITEMS.Gear.Properties){
        UTILITY.copyProperty(config, item, property);
    }

    if(Object.hasOwn(config, "gearType") && config.gearType != null){
        if(config.gearType == ITEMS.Gear.Types.Weapon){
            ITEMS.Gear.loadWeapon(config, item);
        }
    }
    return item;
};



ITEMS.Gear.loadWeapon = function(config, item){
    if(item.attacks.length > 0){
        // Default to primary attack
        item.primaryUse = ITEMS.Gear.Uses.PrimaryAttack;
    }

    if(item.attacks.length > 1){
        // Default to a secondary attack
        item.secondaryUse = ITEMS.Gear.Uses.SecondaryAttack;
    }

};