/*##############################################################################
# Scene: Start Menu
##############################################################################*/
SCENE.SCENES.Start = function(){
    let st = SCENE.SCENES.BaseScene();
    st.name = "Start";
    st.setup = false;

    st.drawStartButton = function(){
        GRAPHICS.drawBox(100, 100, 100, 100);
        GRAPHICS.drawText("Start", 100, 150);
        if(this.isStartButtonSelected()){
            GRAPHICS.drawLine(0, 0, 100, 100);
            GRAPHICS.drawLine(0, 500, 100, 200);
            GRAPHICS.drawLine(500, 0, 200, 100);
            GRAPHICS.drawLine(500, 500, 200, 200);
        }
    };

    st.update = function(){
        if(st.setup == false){
            GRAPHICS.setDisplayMode(DISPLAY_MODES.static);
            st.setup = true;
        }
        GRAPHICS.clearCanvas();
        this.drawStartButton();
        if(INPUT.mouseClick(INPUT.LEFT_CLICK) && this.isStartButtonSelected()){
            SCENE.setActiveScene(SCENE.SCENES.Game());
        }
    };

    st.isStartButtonSelected = function(){
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
    };
    return st;
};
