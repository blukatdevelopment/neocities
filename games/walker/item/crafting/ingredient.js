/*##############################################################################
# Record representing a single ingredient in a recipe
##############################################################################*/

CRAFTING.Ingredient = {};
CRAFTING.Ingredient.new = function(itemName, quantity){
    let ing = {
        itemName: itemName,
        quantity: quantity
    };
    ing.getSprite = function(){
        return ITEMS.getSpriteByName(ing.itemName);
    };
    ing.toString = function(){
        return ing.itemName + "(" + ing.quantity + ")";
    };
    return ing;
};