/*##############################################################################
# Renders darkness, subtracting light
##############################################################################*/
GRAPHICS.LightingController = {};
GRAPHICS.LightingController.new = function(){
    let lm = {
        lights: [],
        darkness: 0
    };
    lm.rect = SHAPES.RECT.new(
        VECTOR2.new(SETTINGS.viewportMin, SETTINGS.viewportMin),
        VECTOR2.new(SETTINGS.viewportMax, SETTINGS.viewportMax)
    );
    lm.canvas = GRAPHICS.Canvas.new();
    lm.canvas2 = GRAPHICS.Canvas.new();
    lm.draw = function(){
        if(lm.darkness != 0){
            lm.drawShadow();
            lm.drawLights();
        }
        lm.lights = []
        lm.canvas.render();        
        lm.canvas.clear();
        lm.canvas2.render();
        lm.canvas2.clear();
    };
    lm.drawShadow = function(){
        let x = lm.rect.position.x;
        let y = lm.rect.position.y;
        let w = lm.rect.size.x;
        let h = lm.rect.size.y;
        let effectiveDarkness = Math.trunc(lm.darkness/1.25);
        let c = "rgb(0 0 0 / " + effectiveDarkness + "%)";
        lm.canvas.fillBox(x, y, w, h, c);
        lm.canvas2.fillBox(x, y, w, h, c);
    };
    lm.drawLights = function(){
        for(let light of lm.lights){
            let pos = light.rect.center();
            pos = GRAPHICS.relativeToCamera(pos);
            lm.canvas.clearCircle(pos.x, pos.y, light.radius);
            lm.canvas.drawCircle(pos.x, pos.y, light.radius, light.color);
            let rect = light.rect;
            lm.canvas2.clearCircle(pos.x, pos.y, light.radius * 2);
        }
    };
    lm.emitLight = function(light){
        lm.lights.push(light);
    };
    return lm;
};