/*##############################################################################
# Scene: Start Menu
##############################################################################*/
var START = {};

START.mouseUp = function(){}

START.drawStartButton = function(){
    GRAPHICS.drawBox(100, 100, 100, 100);
    GRAPHICS.drawText("Start", 100, 150);
    if(this.isStartButtonSelected()){
        GRAPHICS.drawLine(0, 0, 100, 100);
        GRAPHICS.drawLine(0, 500, 100, 200);
        GRAPHICS.drawLine(500, 0, 200, 100);
        GRAPHICS.drawLine(500, 500, 200, 200);
    }
}

START.update = function(){
    GRAPHICS.clearCanvas();
    this.drawStartButton();
}

START.isStartButtonSelected = function(){
    var boxTopLeft = { x: GRAPHICS.scale(100), y: GRAPHICS.scale(100) };
    var boxBottomRight = { x: GRAPHICS.scale(200), y: GRAPHICS.scale(200)};
    var point = INPUT.getMousePosition();
    if(!point){
      return false;
    }
    if(typeof point === "undefined"){
        return false;
    }
    return UTILITY.isInsideBox(boxTopLeft, boxBottomRight, point);
}

START.mouseDown = function(){
    if(this.isStartButtonSelected()){
        SCENE.setActiveScene(SCENE.SCENES.GAME);
    }
}
