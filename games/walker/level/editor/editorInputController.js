/*##############################################################################
# Handles most input for level editor
##############################################################################*/
LEVEL.Editor.EditorInputController = {};
LEVEL.Editor.EditorInputController.new = function(parent){
    let ic = {
        parent: parent,
        mouseDragOrigin: null,
        camDragOrigin: null
    };
    ic.update = function(){
        ic.handleSelectEntity();
        ic.handleDragEntity();
        ic.handleDragCamera();
        ic.handleCameraControls();
        if(INPUT.key(INPUT.KEYS.K_P)){
            console.log("Export");
        }
    };
    ic.handleSelectEntity = function(){
        let worldPoint = GRAPHICS.getWorldCursor();
        //ic.parent.tooltip = worldPoint.toString();
        if(!INPUT.mouseClick(INPUT.LEFT_MOUSE)){
            return;
        }
        let size = 10;
        let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(size, size));
        rect.recenter(worldPoint);
        //console.log(rect.toString());
        let colliders = ic.parent.physics.rectHitScan([], rect);
        if(colliders.length > 0){
            ic.parent.selected = colliders[0].parent;
        }
        else{
            ic.parent.selected = null;
        }
    };
    ic.handleDragEntity = function(){
        if(!INPUT.isMouseDragging(INPUT.LEFT_MOUSE)){
            return;
        }
        if(ic.parent.selected == null){
            return;
        }
        let mPos = GRAPHICS.getWorldCursor();
        ic.parent.selected.recenter(mPos);
    };
    ic.handleDragCamera = function(){
        if(!INPUT.isMouseDragging(INPUT.RIGHT_MOUSE)){
            ic.camDragOrigin = null;
            ic.mouseDragOrigin = null;
            return;
        }
        if(ic.camDragOrigin == null){
            ic.camDragOrigin = GRAPHICS.getCameraCenter();
            ic.mouseDragOrigin = INPUT.getMousePosition();
            return;
        }
        let old = ic.mouseDragOrigin;
        let current = INPUT.getMousePosition();
        let mouseDelta = old.subtract(current);
        
        let oldCamPos = ic.camDragOrigin;
        let updated = oldCamPos.add(mouseDelta);
        GRAPHICS.centerCamera(updated);
    }
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