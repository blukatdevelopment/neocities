/*##############################################################################
# Wrapper for the OffScreenCanvas element to draw to the screen
# Takes viewport units and draws canvas at screen resolution
##############################################################################*/
GRAPHICS.Canvas = {};
GRAPHICS.Canvas.new = function(){
    let c = {};
    c.canvas = new OffscreenCanvas(SETTINGS.canvasMax, SETTINGS.canvasMax);
    c.context = c.canvas.getContext("2d");

    c.fillBox = function(x, y, width, height, color){
        let ctx = c.context;
        if(color){
            ctx.fillStyle = color;
        }
        x = GRAPHICS.scale(x);
        y = GRAPHICS.scale(y);
        width = GRAPHICS.scale(width);
        height = GRAPHICS.scale(height);
        ctx.fillRect(x, y, width, height);
        ctx.fillStyle = SETTINGS.defaultColor;
    };
    c.clearCircle = function(x, y, radius){
        let ctx = c.context;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        x = GRAPHICS.scale(x);
        y = GRAPHICS.scale(y);
        radius = GRAPHICS.scale(radius);
        let startAngle = 0;
        let endAngle = Math.PI * 2
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
    };
    c.drawCircle = function(x, y, radius, color){
        let ctx = c.context;
        ctx.beginPath();
        if(color){
            ctx.fillStyle = color;
        }
        x = GRAPHICS.scale(x);
        y = GRAPHICS.scale(y);
        radius = GRAPHICS.scale(radius);
        let startAngle = 0;
        let endAngle = Math.PI * 2
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fill();
        ctx.fillStyle = SETTINGS.defaultColor;
    };
    c.clear = function(){
        let ctx = c.context;
        ctx.clearRect(0,0, c.canvas.width, c.canvas.height);
        ctx.beginPath();
    };
    // Copy contents to main canvas
    c.render = function(){
        let ctx = GRAPHICS.getContext();
        ctx.drawImage(c.canvas, 0, 0);
    };
    return c;
};