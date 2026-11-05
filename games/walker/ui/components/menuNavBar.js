/*##############################################################################
# Shows buttons to navigate player menus.
##############################################################################*/
UI.COMPONENTS.MenuNavBar = {}; 
UI.COMPONENTS.MenuNavBar.new = function(manager){
    let mnb = {
        rect: SHAPES.RECT.new(VECTOR2.new(278, 328), VECTOR2.new(41, 72)),
        manager: manager
    };
    mnb.panel = UI.COMPONENTS.Panel.new(mnb.rect);
    mnb.inventoryButton = UI.COMPONENTS.TextButton.new(
        SHAPES.RECT.new(
            VECTOR2.new(278,328),
            VECTOR2.new(41,20)
        ),
        "Inventory",
        () => { mnb.manager.activeMenu = MENUS.Inventory; }
    );
    mnb.craftingButton = UI.COMPONENTS.TextButton.new(
        SHAPES.RECT.new(
            VECTOR2.new(278, 348),
            VECTOR2.new(41,20)
        ),
        "Crafting",
        () => { mnb.manager.activeMenu = MENUS.Crafting; }
    );
    
    mnb.update = function(){
        mnb.inventoryButton.update();
        mnb.craftingButton.update();
    };
    
    mnb.draw = function(){
        mnb.panel.draw();
        mnb.inventoryButton.draw();
        mnb.craftingButton.draw();

    };
    return mnb;
};