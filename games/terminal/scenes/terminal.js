/*##############################################################################
# Scene: Start Menu
##############################################################################*/
var TERMINAL = {};

TERMINAL.mouseUp = function(){}

TERMINAL.drawStartButton = function(){
    GRAPHICS.drawBox(100, 100, 100, 100);
    GRAPHICS.drawText("Terminal", 100, 150);
    if(this.isStartButtonSelected()){
        GRAPHICS.drawLine(0, 0, 100, 100);
        GRAPHICS.drawLine(0, 500, 100, 200);
        GRAPHICS.drawLine(500, 0, 200, 100);
        GRAPHICS.drawLine(500, 500, 200, 200);
    }
}

TERMINAL.update = function(){
    console.log("Woop");
    GRAPHICS.clearCanvas();
    this.drawStartButton();
}

TERMINAL.isStartButtonSelected = function(){
    var boxTopLeft = { x: 100, y: 100 };
    var boxBottomRight = { x: 200, y: 200};
    var point = INPUT.getMousePosition();
    if(!point){
      return false;
    }
    if(typeof point === "undefined"){
        return false;
    }
    return UTILITY.isInsideBox(boxTopLeft, boxBottomRight, point);
}

TERMINAL.mouseDown = function(){
    if(this.isStartButtonSelected()){
        console.log("Button clicked. Woohoo!");
    }
}
