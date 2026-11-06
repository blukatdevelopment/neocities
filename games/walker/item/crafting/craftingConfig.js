CRAFTING.Config.init = function(){
    CRAFTING.Recipes = CRAFTING.Config.getRecipesConfig();
};

CRAFTING.Config.getRecipesConfig = function(){
    let config = [];
    config.push(...CRAFTING.Config.starterPack());
    return config;
};