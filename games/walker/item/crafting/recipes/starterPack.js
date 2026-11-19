CRAFTING.Config.starterPack = function(){
    let recipes = [];

    CRAFTING.RecipeNames.Torch = "Torch";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.Torch,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.Resin, 1),
            CRAFTING.Ingredient.new(ITEMS.Names.Stick, 1)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.Torch, 1)
    ));

    CRAFTING.RecipeNames.FlintAxe = "FlintAxe";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.FlintAxe,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.Flint, 1),
            CRAFTING.Ingredient.new(ITEMS.Names.Stick, 1)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.FlintAxe, 1)
    ));

    CRAFTING.RecipeNames.LeatherTunic = "LeatherTunic";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.LeatherTunic,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.Leather, 3)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.LeatherTunic, 1)
    ));

    CRAFTING.RecipeNames.LeatherLeggings = "LeatherLeggings";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.LeatherLeggings,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.Leather, 3)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.LeatherLeggings, 1)
    ));


    return recipes;

    let ingredients = [
        CRAFTING.Ingredient.new(ITEMS.Names.Apple, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.GreenBerry, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.BlueBerry, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.RedBerry, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.Seeds, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.Talon, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.Stick, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.Rock, 1),
        CRAFTING.Ingredient.new(ITEMS.Names.Rope, 1),
    ];
    for(let i = 0; i < 20; i++){
        recipes.push(CRAFTING.Recipe.new(
            CRAFTING.RecipeNames.Test3,
            [
                RANDOM.choice(ingredients),
                RANDOM.choice(ingredients)
            ],
            RANDOM.choice(ingredients)
        ));        
    }    
    
    return recipes;
};