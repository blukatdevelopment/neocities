/*##############################################################################
# Displays up to three foods the player has eaten
##############################################################################*/
UI.COMPONENTS.FoodBar.new = function(manager){
    let nbRect = SHAPES.RECT.new(
        VECTOR2.new(0, 336),
        VECTOR2.new(48, 64)
    );
    let sprite = SPRITES.static.foodbar.foodbar;    
    let fb = UI.COMPONENTS.BaseComponent.new(nbRect, sprite);
    fb.manager = manager;
    fb.foods = [null, null, null];
    fb.update = function(){
        if(SCENE.getPlayerOne() == null){
            return;
        }
        let activeFoods = SCENE.getPlayerOne().getActiveFoods();
        fb.foods = [null, null, null];
        if(activeFoods.length > 0){
            fb.foods[0] = activeFoods[0];
        }
        if(activeFoods.length > 1){
            fb.foods[1] = activeFoods[1];
        }
        if(activeFoods.length >= 2){
            fb.foods[2] = activeFoods[2];
        }
    };
    fb.formatRemainingTime = function(remainingMs){
        let remainingMin = Math.trunc(remainingMs / TIME.minute);
        if(remainingMin < 1){
            return "<1 min";
        }
        return remainingMin + " min";
    };
    fb.draw = function(){
        // Draw foodbar background
        let sprite = fb.sprite;
        let pos = fb.rect.position;
        SPRITES.renderSprite(pos.x, pos.y, sprite.index, sprite.sheet, DISPLAY_MODES.static);
        let text = "";
        if(fb.foods[0]){
            sprite = fb.foods[0].sprite;
            pos = VECTOR2.new(4, 340);
            SPRITES.renderSprite(pos.x, pos.y, sprite.index, sprite.sheet, DISPLAY_MODES.static);
            text = fb.formatRemainingTime(fb.foods[0].remainingTime);
            GRAPHICS.drawText(text, 25, 348, 12, GRAPHICS.Colors.Black);
        }
        if(fb.foods[1]){
            sprite = fb.foods[1].sprite;
            pos = VECTOR2.new(4, 359);
            SPRITES.renderSprite(pos.x, pos.y, sprite.index, sprite.sheet, DISPLAY_MODES.static);
            text = fb.formatRemainingTime(fb.foods[1].remainingTime);
            GRAPHICS.drawText(text, 25, 367, 12, GRAPHICS.Colors.Black);
        }
        if(fb.foods[2]){
            sprite = fb.foods[2].sprite;
            pos = VECTOR2.new(4, 378);
            SPRITES.renderSprite(pos.x, pos.y, sprite.index, sprite.sheet, DISPLAY_MODES.static);
            text = fb.formatRemainingTime(fb.foods[2].remainingTime);
            GRAPHICS.drawText(text, 25, 386, 12, GRAPHICS.Colors.Black);
        }
    };
    return fb;
};