CRAFTING.Config.starterPack = function(){
    let recipes = [];

    CRAFTING.RecipeNames.Test = "Test";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.Test,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.RedBerry, 1),
            CRAFTING.Ingredient.new(ITEMS.Names.GreenBerry, 1),
            CRAFTING.Ingredient.new(ITEMS.Names.BlueBerry, 1)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.Rock, 5)
    ));

    CRAFTING.RecipeNames.Test2 = "Test2";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.Test2,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.RedBerry, 1)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.BlueBerry, 5)
    ));

    CRAFTING.RecipeNames.Test3 = "Test3";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.Test3,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.RedBerry, 1)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.RedBerry, 5)
    ));

    CRAFTING.RecipeNames.Test4 = "Test4";
    recipes.push(CRAFTING.Recipe.new(
        CRAFTING.RecipeNames.Test3,
        [
            CRAFTING.Ingredient.new(ITEMS.Names.RedBerry, 1)
        ],
        CRAFTING.Ingredient.new(ITEMS.Names.Apple, 1)
    ));

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