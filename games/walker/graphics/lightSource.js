/*##############################################################################
# A point of light
##############################################################################*/
GRAPHICS.LightSource = {};
GRAPHICS.LightSource.new = function(rect, radius, color){
    let ls = {
        rect: rect,
        radius: radius,
        color: color
    };
    return ls;
};