/*##############################################################################
# Provides inter-component interaction, particularly for moving items
##############################################################################*/
UI.COMPONENTS.ComponentManager = {};
UI.COMPONENTS.ComponentManager.new = function(){
    let cm = {};
    cm.hotbar = UI.COMPONENTS.Hotbar.new(cm);
    cm.inventory = UI.COMPONENTS.Inventory.new(cm);
    cm.statusbar = UI.COMPONENTS.StatusBar.new();
    cm.dragged = null;

    cm.update = function(){
        cm.hotbar.update();
        cm.inventory.update();
        cm.statusbar.update();
        if(SCENE.getGameState() !== GAMESTATES.inventory){
            return;
        }
        if(INPUT.mouseClick(INPUT.LEFT_CLICK)){
            let draggedComponent = cm.getDraggedComponent();
            if(draggedComponent){
                cm.dragged = {
                    component: draggedComponent,
                    slot: draggedComponent.getHoveredSlot()
                };
            }
        }
        if(INPUT.fullClick()){
            // Deposit dropped item if possible
            let destComponent = cm.getHoveredComponent();
            if(destComponent){
                let destSlot = destComponent.getHoveredSlot();
                let draggedItem = cm.dragged.component.getItem(cm.dragged.slot);
                let displacedItem = destComponent.getItem(destSlot);
                
                // Swap contents of slots
                destComponent.setItem(destSlot, draggedItem);
                cm.dragged.component.setItem(cm.dragged.slot, displacedItem);
            }
            // Stop dragging
            cm.dragged = null;
        }
    };
    cm.draw = function(){
        cm.hotbar.draw();
        cm.inventory.draw();
        cm.statusbar.draw();
        if(cm.dragged == null){
            return;
        }

        let slot = cm.dragged.slot;
        let item = cm.dragged.component.linkedInv.getItem(slot);

        if(item == null){
            return;
        }
        let pos = INPUT.getDownScaledMousePosition();
        let size = VECTOR2.new(item.sprite.sheet.cellResolutionX, item.sprite.sheet.cellResolutionY);
        //pos.x += size.x/2;
        //pos.y += size.y/2;
        SPRITES.renderSprite(pos.x, pos.y, item.sprite.index, item.sprite.sheet, DISPLAY_MODES.static);
    };
    // Component who's item is being clicked and dragged
    cm.getDraggedComponent = function(){
        if(cm.hotbar.getHoveredSlot() != -1 && cm.hotbar.getItem(cm.hotbar.getHoveredSlot()) != null){
            return cm.hotbar;
        }
        if(cm.inventory.getHoveredSlot() != -1 && cm.inventory.getItem(cm.inventory.getHoveredSlot()) != null){
            return cm.inventory;
        }
        return null;
    };
    // Component whose slot is hovered over
    cm.getHoveredComponent = function(){
        if(cm.hotbar.getHoveredSlot() != -1){
            return cm.hotbar;
        }
        if(cm.inventory.getHoveredSlot() != -1){
            return cm.inventory;
        }
        return null;
    };
    cm.linkActor = function(actor){
        cm.hotbar.linkedInv = actor.hotbar;
        cm.inventory.linkedInv = actor.inventory;
        cm.statusbar.linkActor(actor);

    };
    return cm;
};