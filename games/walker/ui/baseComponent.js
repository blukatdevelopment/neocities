/*##############################################################################
# Base for other UI components
##############################################################################*/
UI.COMPONENTS.BaseComponent = {}; 
UI.COMPONENTS.BaseComponent.new = function(rect, sprite){
    let bc = {
        rect: rect, 
        sprite: sprite
    };
    bc.update = function(){};
    bc.draw = function(){
        let pos = bc.rect.position;
        SPRITES.renderSprite(pos.x, pos.y, bc.sprite.index, bc.sprite.sheet, DISPLAY_MODES.static);
    };
    return bc;
};