UI.COMPONENTS.LevelEditorUIManager = {};
UI.COMPONENTS.LevelEditorUIManager.new = function(parent){
    let le = {
        parent: parent
    };
    le.selector = UI.COMPONENTS.EntitySelectMenu.new(parent);
    le.update = function(){
        //console.log("UI update");
        le.selector.update();
    };
    le.draw = function(){
        //console.log("UI draw");
        le.drawSelectedEntity();
        le.drawHoveredEntity();
        le.selector.draw();
    };
    le.drawSelectedEntity = function(){
        let selected = le.parent.selected;
        if(selected == null){
            return;
        }
        let rect = selected.getColRect();
        rect.position = GRAPHICS.relativeToCamera(rect.position);
        let x = rect.position.x;
        let y = rect.position.y;
        let w = rect.size.x;
        let h = rect.size.y;
        let c = GRAPHICS.Colors.Red50;
        GRAPHICS.fillBox(x, y, w, h, c);
    };
    le.drawHoveredEntity = function(){
        if(le.parent.hovered == null){
            return;
        }
        let hovered = le.parent.hovered;
        let rect = hovered.getColRect();
        rect.position = GRAPHICS.relativeToCamera(rect.position);
        let x = rect.position.x;
        let y = rect.position.y;
        let w = rect.size.x;
        let h = rect.size.y;
        let c = GRAPHICS.Colors.Blue50;
        GRAPHICS.fillBox(x, y, w, h, c);
    };
    le.isHovered = function(){
        return le.selector.isHovered();
    };
    return le;
}