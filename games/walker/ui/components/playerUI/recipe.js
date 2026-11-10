/*##############################################################################
# Renders one recipe, displaying up to three ingredients
##############################################################################*/
UI.COMPONENTS.Recipe = {};
UI.COMPONENTS.Recipe.new = function(recipe){
    let r = {
        recipe: recipe,
        size: VECTOR2.new(100,20)

    };
    r.craftButton = UI.COMPONENTS.TextButton.new(
        SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(20, 20)),
        "Craft",
        () => { r.craft(); }
    );
    r.update = function(){
        r.craftButton.update();
    }
    r.craft = function(){
        let player = SCENE.getPlayerOne();
        player.craft(r.recipe);
    };
    r.draw = function(position){
        if(r.recipe == null){
            return;
        }
        let ingredient = null;

        let yOffText = 18;
        let yOff = 2;
        let xOff = 0;
        let xOffCount = 15;
        let yOffCount = 0;
        let sprite = null;
        xOff = 0;
        ingredient = r.recipe.product;
        sprite = ingredient.getSprite();
        SPRITES.renderSprite(
            position.x + xOff, 
            position.y + yOff, 
            sprite.index,
            sprite.sheet,
            DISPLAY_MODES.static
        );
        GRAPHICS.drawText(
            ingredient.quantity,
            position.x + xOff + xOffCount,
            position.y + yOffText + yOffCount,
            10
        );
        xOff += 20;
        GRAPHICS.drawText("=", position.x + xOff, position.y + yOffText, 38, null);
        xOff += 15;


        if(r.recipe.ingredients.length > 0){
            ingredient = r.recipe.ingredients[0];
            sprite = ingredient.getSprite();
            SPRITES.renderSprite(
                position.x + xOff, 
                position.y + yOff, 
                sprite.index,
                sprite.sheet,
                DISPLAY_MODES.static
            );
            GRAPHICS.drawText(
                ingredient.quantity,
                position.x + xOff + xOffCount,
                position.y + yOffText + yOffCount,
                10
            );
            xOff += 20;
        }

        if(r.recipe.ingredients.length > 1){
            GRAPHICS.drawText("+", position.x + xOff, position.y + yOffText, 38, null);
            xOff += 15;
            ingredient = r.recipe.ingredients[1];
            sprite = ingredient.getSprite();
            SPRITES.renderSprite(
                position.x + xOff,
                position.y + yOff,
                sprite.index,
                sprite.sheet,
                DISPLAY_MODES.static
            );
            GRAPHICS.drawText(
                ingredient.quantity,
                position.x + xOff + xOffCount,
                position.y + yOffText + yOffCount,
                10
            );
            xOff += 20;
        }

        if(r.recipe.ingredients.length > 2){
            GRAPHICS.drawText("+", position.x + xOff, position.y + yOffText, 38, null);
            xOff += 15;

            ingredient = r.recipe.ingredients[2];
            sprite = ingredient.getSprite();
            SPRITES.renderSprite(
                position.x + xOff, 
                position.y + yOff, 
                sprite.index,
                sprite.sheet,
                DISPLAY_MODES.static
            );
            GRAPHICS.drawText(
                ingredient.quantity,
                position.x + xOff + xOffCount,
                position.y + yOffText + yOffCount,
                10
            );
            xOff += 20;
        }

        r.craftButton.rect.position = VECTOR2.new(position.x + xOff, position.y);
        r.craftButton.draw();
    };
    return r;
};