UI.COMPONENTS.LevelEditorUIManager = {};
UI.COMPONENTS.LevelEditorUIManager.new = function(parent){
    let le = {
        parent: parent
    };
    le.update = function(){
        //console.log("UI update");
    };
    le.draw = function(){
        //console.log("UI draw");
        le.drawSelected();
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
    return le;
}