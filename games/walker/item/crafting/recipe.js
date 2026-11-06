CRAFTING.Recipe = {};
CRAFTING.Recipe.new = function(name, ingredients, product){
    let r = {
        name: name,
        ingredients: ingredients,
        product: product
    };
    r.toString = function(){
        let text = "Recipe:";
        for(let i = 0; i< r.ingredients.length; i++){
            text += r.ingredients[i].toString();
            if(i != r.ingredients.length-1){
                text += "+";
            }
        }
        text += "=" + product.toString();
        return text;
    };
    return r;
};