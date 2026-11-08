/*##############################################################################
# Procedurally draws a panel to the desired dimensions
##############################################################################*/
UI.COMPONENTS.Panel = {}; 
UI.COMPONENTS.Panel.new = function(rect){
    let pn = {
        rect: rect, 
    };
    pn.update = function(){};
    pn.draw = function(){
        let pos = pn.rect.position;
        let size = pn.rect.size
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
    };
    return pn;
};