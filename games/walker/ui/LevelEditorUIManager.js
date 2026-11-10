UI.COMPONENTS.LevelEditorUIManager = {};
UI.COMPONENTS.LevelEditorUIManager.new = function(parent){
    let le = {
        parent: parent
    };
    le.selector = UI.COMPONENTS.EntitySelectMenu.new();
    le.update = function(){
        //console.log("UI update");
        le.selector.update();
    };
    le.draw = function(){
        //console.log("UI draw");
        le.drawSelected();
        le.selector.draw();
    };
    le.drawSelected = function(){
        let selected = le.parent.selected;
        if(selected == null){
            return;
        }
        let rect = selected.getSpriteRect();
        rect.position = GRAPHICS.relativeToCamera(rect.position);
        let x = rect.position.x;
        let y = rect.position.y;
        let w = rect.size.x;
        let h = rect.size.y;
        let c = GRAPHICS.Colors.Red50;
        GRAPHICS.fillBox(x, y, w, h, c);
    };
    le.isHovered = function(){
        return le.selector.isHovered();
    };
    return le;
}