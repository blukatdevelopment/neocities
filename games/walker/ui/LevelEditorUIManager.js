UI.COMPONENTS.LevelEditorUIManager = {};
UI.COMPONENTS.LevelEditorUIManager.new = function(parent){
    let le = {
        parent: parent
    };
    le.update = function(){
        console.log("UI update");
    };
    le.draw = function(){
        console.log("UI draw");
    };
    return le;
}