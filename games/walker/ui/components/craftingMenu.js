/*##############################################################################
# Base for other UI components
##############################################################################*/
UI.COMPONENTS.CraftingMenu = {}; 
UI.COMPONENTS.CraftingMenu.new = function(rect, sprite){
    let cm = {
        rect: rect
    };
    cm.panel = UI.COMPONENTS.Panel.new(rect);
    cm.backButton = UI.COMPONENTS.TextButton.new(SHAPES.RECT.new(), "Back", UI.COMPONENTS.CraftingMenu.back);
    cm.update = function(){};
    cm.draw = function(){
        cm.panel.draw();

    };
    return cm;
};

UI.COMPONENTS.CraftingMenu.back = function(){

};