/*##############################################################################
# Base for other UI components
##############################################################################*/
UI.COMPONENTS.TextButton = {};
UI.COMPONENTS.TextButton.new = function(rect, text, onClick){
    let btn = {
        rect: rect,
        text: text,
        onClick: onClick
    };
    btn.update = function(){
        if(!INPUT.mouseClick(INPUT.LEFT_CLICK)){
            return;
        }
        let mPos = INPUT.getDownScaledMousePosition();
        if(btn.rect.contains(mPos) && btn.onClick != null){
            btn.onClick();
        }
    };
    btn.draw = function(){
        let pos = btn.rect.position;
        let size = btn.rect.size
        // Draw background
        GRAPHICS.fillBox(
            pos.x, pos.y,
            size.x, size.y,
            GRAPHICS.Colors.Beige
        );

        // Draw outer border
        let offset = 0;
        GRAPHICS.drawBox(
            pos.x+offset, pos.y+offset,
            size.x-offset, size.y-offset,
            GRAPHICS.Colors.DarkBrown
        );
        // Draw inner border
        offset = 1;
        GRAPHICS.drawBox(
            pos.x+offset, pos.y+offset,
            size.x-offset, size.y-offset,
            GRAPHICS.Colors.LightBrown
        );
        let textSize = SETTINGS.defaultFontSize;
        let xOff = 2; // Don't draw text over the left border
        let center = btn.rect.center();
        GRAPHICS.drawText(btn.text, pos.x+xOff, center.y, textSize, GRAPHICS.Colors.Black);
    };
    return btn;
};