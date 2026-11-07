/*##############################################################################
# Renders darkness, subtracting light
##############################################################################*/
GRAPHICS.LightingController = {};
GRAPHICS.LightingController.new = function(){
    let lm = {
        lights: []
    };
    lm.rect = SHAPES.RECT.new(
        VECTOR2.new(SETTINGS.viewportMin, SETTINGS.viewportMin),
        VECTOR2.new(SETTINGS.viewportMax, SETTINGS.viewportMax)
    );
    lm.canvas = GRAPHICS.Canvas.new();
    lm.draw = function(){
        lm.drawShadow();
        lm.drawLights();
        lm.lights = []
        lm.canvas.render();
        lm.canvas.clear();
    };
    lm.drawShadow = function(){
        let x = lm.rect.position.x;
        let y = lm.rect.position.y;
        let w = lm.rect.size.x;
        let h = lm.rect.size.y;
        let c = GRAPHICS.Colors.Black50;
        lm.canvas.fillBox(x, y, w, h, c);
    };
    lm.drawLights = function(){
        for(let light of lm.lights){
            let pos = light.rect.center();
            pos = GRAPHICS.relativeToCamera(pos);
            lm.canvas.clearCircle(pos.x, pos.y, light.radius);
            lm.canvas.drawCircle(pos.x, pos.y, light.radius, light.color);
        }
    };
    lm.emitLight = function(light){
        lm.lights.push(light);
    };
    return lm;
};