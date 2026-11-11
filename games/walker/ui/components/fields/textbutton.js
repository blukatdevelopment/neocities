/*##############################################################################
# button which shows text
##############################################################################*/
UI.COMPONENTS.TextButton = {};
UI.COMPONENTS.TextButton.new = function(rect, text, onClick){
    let btn = {
        rect: rect,
        text: text,
        onClick: onClick
    };
    btn.update = function(){
        if(!INPUT.mouseClick(INPUT.LEFT_MOUSE)){
            return;
        }
        let mPos = INPUT.getDownScaledMousePosition();
        if(btn.rect.contains(mPos) && btn.onClick != null){
            btn.onClick();
        }
    };
    btn.isHovered = function(){
        let mPos = INPUT.getDownScaledMousePosition();
        if(mPos == null){
            return false;
        }
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
        let xOff = 3;
        let center = btn.rect.center();
        let textSize = 10;
        GRAPHICS.drawBox(
            pos.x+offset, pos.y+offset,
            size.x-offset, size.y-offset,
            color
        );
        GRAPHICS.drawText(btn.text, pos.x+xOff, center.y, textSize, GRAPHICS.Colors.Black);
    };
    return btn;
};