/*##############################################################################
# Handles most for level editor
##############################################################################*/
LEVEL.Editor.EditorInputController = {};
LEVEL.Editor.EditorInputController.new = function(parent){
    let ic = {
        parent: parent
    };
    ic.update = function(){
        ic.handleSelectEntity();
        ic.handleCameraControls();
        if(INPUT.key(INPUT.KEYS.K_P)){
            console.log("Export");
        }
    };
    ic.handleSelectEntity = function(){
        
    };
    ic.handleCameraControls = function(){
        let vector = VECTOR2.new(0,0);
        let speed = 5;
        if(INPUT.key(INPUT.KEYS.K_LEFT_SHIFT)){
            speed *= 3;
        }
        // Prioritize keyboard keys
        if(INPUT.key(INPUT.KEYS.K_W)){
            vector.y -= speed;
        }
        else if(INPUT.key(INPUT.KEYS.K_S)){
            vector.y += speed;
        }
        if(INPUT.key(INPUT.KEYS.K_A)){
            vector.x -= speed;
        }
        else if(INPUT.key(INPUT.KEYS.K_D)){
            vector.x += speed;
        }
        if(vector.x != 0 || vector.y != 0){
            GRAPHICS.panCamera(vector);
            return;
        }
        // pan with mouse only if not panning with keyboard
        let mPos = INPUT.getMousePosition();
        let margin = 20;
        if(mPos.x < margin){
            vector.x -= speed;
        }
        else if(mPos.x > SETTINGS.canvasMax - margin){
            vector.x += speed;
        }
        if(mPos.y < margin){
            vector.y -= speed;
        }
        else if(mPos.y > SETTINGS.canvasMax - margin){
            vector.y += speed;
        }
        if(vector.x != 0 || vector.y != 0){
            GRAPHICS.panCamera(vector);
        }
    };
    return ic;
};