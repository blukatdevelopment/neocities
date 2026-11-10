/*##############################################################################
# Displays text, can be given an onClick
##############################################################################*/
UI.COMPONENTS.TextLabel = {}; 
UI.COMPONENTS.TextLabel.new = function(rect, text, tooltip, onClick){
    let tl = {
        rect: rect,
        text: text,
        textSize: SETTINGS.defaultFontSize,
        color: SETTINGS.defaultColor,
        tooltip: tooltip,
        onClick: onClick
    };
    tl.update = function(){
        if(!tl.isHovered()){
            return;
        }
        if(tl.tooltip != null){
            GRAPHICS.drawTooltip(tl.toolTip);
        }
        if(!INPUT.mouseClick(INPUT.LEFT_MOUSE)){
            return;
        }
        if(tl.onClick != null){
            tl.onClick();
        }
    };
    tl.isHovered = function(){
        let mPos = INPUT.getDownScaledMousePosition();
        return tl.rect.contains(mPos);
    };
    tl.draw = function(){
        let pos = tl.rect.position;
        let yOff = 5;
        GRAPHICS.drawText(tl.text, pos.x, pos.y + yOff, tl.textSize, tl.color);
    };
    return tl;
};