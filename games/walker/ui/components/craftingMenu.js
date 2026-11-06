/*##############################################################################
# Base for other UI components
##############################################################################*/
UI.COMPONENTS.CraftingMenu = {}; 
UI.COMPONENTS.CraftingMenu.new = function(manager){
    let cm = {};
    cm.rect = SHAPES.RECT.new(
        VECTOR2.new(123,128),
        VECTOR2.new(155,200)
    );
    cm.pageSize = 5;
    cm.page = UTILITY.PagedArray.new(UI.COMPONENTS.CraftingMenu.getRecipeComponents(), cm.pageSize);
    cm.panel = UI.COMPONENTS.Panel.new(cm.rect);
    cm.update = function(){
        for(let recipe of cm.page.getPageElements()){
            recipe.update();
        }
    };
    cm.draw = function(){
        cm.panel.draw();
        let recipeHeight = 20;

        let recipes = cm.page.getPageElements();
        for(let i = 0; i < cm.pageSize; i++){
            if(i < recipes.length){
                let recipePos = cm.rect.position.clone();
                recipePos.y += i* recipeHeight;
                recipes[i].draw(recipePos);
            }
        }
    };
    return cm;
};

UI.COMPONENTS.CraftingMenu.getRecipeComponents = function(){
    let components = [];
    for(let recipe of CRAFTING.Recipes){
        components.push(UI.COMPONENTS.Recipe.new(recipe));
    }
    return components;
};