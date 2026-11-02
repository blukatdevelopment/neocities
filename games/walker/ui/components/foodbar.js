/*##############################################################################
# Displays up to three foods the player has eaten
##############################################################################*/
UI.COMPONENTS.FoodBar.new = function(){
    let nbRect = SHAPES.RECT.new(
        VECTOR2.new(0, 336),
        VECTOR2.new(48, 64)
    );
    let sprite = SPRITES.static.foodbar.foodbar;    
    let fb = UI.COMPONENTS.BaseComponent.new(nbRect, sprite);
    fb.foods = [null, null, null];
    return fb;
};