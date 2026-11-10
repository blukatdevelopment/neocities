/*##############################################################################
# Base for other UI components
##############################################################################*/
UI.COMPONENTS.SpriteButton = {};
UI.COMPONENTS.SpriteButton.new = function(rect, sprite, onClick, toolTip){
    let btn = {
        rect: rect,
        sprite: sprite,
        onClick: onClick,
        toolTip: toolTip
    };
    btn.update = function(){
        if(!INPUT.mouseClick(INPUT.LEFT_MOUSE)){
            return;
        }
        
        if(btn.isHovered() && btn.onClick != null){
            btn.onClick();
        }
    };
    btn.isHovered = function(){
        let mPos = INPUT.getDownScaledMousePosition();
        return btn.rect.contains(mPos);
    };
    btn.draw = function(){
        let pos = btn.rect.position;
        let size = btn.rect.size
        let color = GRAPHICS.Colors.Beige
        if(btn.isHovered()){
            color = GRAPHICS.Colors.LightBrown;
        }
        // Draw background
        GRAPHICS.fillBox(
            pos.x, pos.y,
            size.x, size.y,
            color
        );

        // Draw outer border
        let offset = 0;
        color = GRAPHICS.Colors.DarkBrown;
        GRAPHICS.drawBox(
            pos.x+offset, pos.y+offset,
            size.x-offset, size.y-offset,
            color
        );
        // Draw inner border
        offset = 1;
        color = GRAPHICS.Colors.LightBrown;
        GRAPHICS.drawBox(
            pos.x+offset, pos.y+offset,
            size.x-offset, size.y-offset,
            color
        );
        if(btn.isHovered() && btn.toolTip != null){
            GRAPHICS.drawTooltip(btn.toolTip);
        }
        if(btn.sprite == null){
            return;
        }
        SPRITES.renderSprite(pos.x, pos.y, btn.sprite.index, btn.sprite.sheet, DISPLAY_MODES.static);
    };
    return btn;
};