/*##############################################################################
# Handles most input for level editor
##############################################################################*/
LEVEL.Editor.EditorInputController = {};
LEVEL.Editor.EditorInputController.new = function(parent){
    let ic = {
        parent: parent,
        mouseDragOrigin: null,
        camDragOrigin: null,
        dragOrigin: null,
        freshlySelected: false
    };
    ic.update = function(){
        ic.parent.hovered = ic.getHoveredEntity();
        if(INPUT.leftClick()){
            ic.handleClick();
        }
        ic.handleDragEntity();
        ic.handleDragCamera();
        ic.handleCameraControls();
        
        if(INPUT.fullClick()){
            ic.handleFullClick();
        }
        if(INPUT.keyPress(INPUT.KEYS.K_P)){
            ic.parent.export();
        }
        if(INPUT.keyPress(INPUT.KEYS.K_L)){
            ic.parent.snap = !ic.parent.snap;
        }
        if(INPUT.keyPress(INPUT.KEYS.K_SPACE) && ic.parent.selected){
            SCENE.destroyEntity(ic.parent.selected);
            ic.parent.selected = null;
        }
    };
    ic.handleClick = function(){
        if(ic.parent.ui.isHovered()){
            // Selection disabled over UI
            return;
        }
        if(ic.dragOrigin == null){
            ic.dragOrigin = GRAPHICS.getWorldCursor();
        }
        let mPos = GRAPHICS.getWorldCursor();
        let hEnt = ic.parent.hovered;
        if(hEnt == null){
            // Clicked on nothing. Deselect.
            ic.parent.selected = null;
            return;
        }
        if(hEnt != ic.parent.selected){
            // Clicked on another entity. Select it.
            ic.parent.selected = hEnt;
            ic.freshlySelected = true;
        }
    };
    ic.handleFullClick = function(){
        let dragOrigin = ic.dragOrigin;
        ic.dragOrigin = null;
        if(ic.parent.ui.isHovered()){
            // Selection disabled over UI
            return;
        }
        if(dragOrigin == null){
            return;
        }
        let mPos = GRAPHICS.getWorldCursor();
        let hEnt = ic.parent.hovered;
        let mouseDrift = dragOrigin.distance(GRAPHICS.getWorldCursor());
        if(!ic.freshlySelected && mouseDrift < 8){
            // Clicked on selected entity. Deselect it.
            ic.parent.selected = null;
        }
        ic.freshlySelected = false;
    };
    ic.getHoveredEntity = function(){
        let worldPoint = GRAPHICS.getWorldCursor();
        //ic.parent.tooltip = worldPoint.toString();
        let size = 10;
        let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(size, size));
        rect.recenter(worldPoint);
        //console.log(rect.toString());
        let colliders = ic.parent.physics.rectHitScan([], rect);
        if(colliders == null || colliders.length == 0){
            return null;
        }
        colliders.sort((a, b) => {
            if(a.parent.renderLayer < b.parent.renderLayer){
                return 1;
            }
            if(a.parent.renderLayer > b.parent.renderLayer){
                return -1;
            }
            return 0;
        });
        return colliders[0].parent;
    };

    ic.handleDragEntity = function(){
        if(!INPUT.isMouseDragging(INPUT.LEFT_MOUSE)){
            return;
        }
        if(ic.dragOrigin == null){
            return;
        }
        if(ic.parent.ui.isHovered()){
            return;
        }
        if(ic.parent.selected == null){
            return;
        }
        let mPos = GRAPHICS.getWorldCursor();
        let ent = ic.parent.selected;
        ent.colliderRecenter(mPos);
        if(ic.parent.snap){
            ent.position = ent.position.snapToGrid(16);
        }
    };
    ic.handleDragCamera = function(){
        if(!INPUT.isMouseDragging(INPUT.RIGHT_MOUSE)){
            ic.camDragOrigin = null;
            ic.mouseDragOrigin = null;
            return;
        }
        if(ic.parent.ui.isHovered()){
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
        return; // Disabling the below.
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