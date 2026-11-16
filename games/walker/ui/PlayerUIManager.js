/*##############################################################################
# Manages in-game UI
##############################################################################*/
UI.COMPONENTS.PlayerUIManager = {};


UI.COMPONENTS.PlayerUIManager.new = function(){
    let cm = {};
    cm.hotbar = UI.COMPONENTS.Hotbar.new(cm);
    cm.inventory = UI.COMPONENTS.Inventory.new(cm);
    cm.statusbar = UI.COMPONENTS.StatusBar.new(cm);
    cm.notificationsBar = UI.COMPONENTS.NotificationBar.new();
    cm.foodbar = UI.COMPONENTS.FoodBar.new(cm);
    cm.paperdoll = UI.COMPONENTS.PaperDoll.new(cm);
    cm.navBar = UI.COMPONENTS.MenuNavBar.new(cm);
    cm.craftingMenu = UI.COMPONENTS.CraftingMenu.new(cm);
    cm.dragged = null;
    cm.activeMenu = MENUS.None;

    cm.update = function(){
        // Always update notifications
        cm.notificationsBar.update();
        cm.foodbar.update();


        if(INPUT.keyPress(INPUT.KEYS.K_TAB)){
            if(cm.activeMenu == MENUS.None){
                cm.activeMenu = MENUS.Equip;
                SCENE.setGameState(GAMESTATES.playerMenus);
            }
            else if(cm.activeMenu == MENUS.Equip){
                cm.activeMenu = MENUS.None;
                SCENE.setGameState(GAMESTATES.play);
            }
            else if(cm.activeMenu == MENUS.Craft){
                cm.activeMenu = MENUS.Equip;
            }
        }

        if(SCENE.getGameState() == GAMESTATES.play){
            cm.hotbar.update();
            return;
        }
        cm.navBar.update();
        if(cm.activeMenu == MENUS.Craft){
            cm.craftingMenu.update();
        }
        if(cm.activeMenu == MENUS.Equip){
            cm.handleDrag();    
        }
    };

    cm.handleDrag = function(){
        cm.handleDragStart();
        cm.handleDragEnd();
    };
    cm.handleDragStart = function(){
        if(INPUT.mouseClick(INPUT.LEFT_MOUSE)){
            let draggedComponent = cm.getDraggedComponent();
            if(draggedComponent){
                cm.dragged = {
                    component: draggedComponent,
                    slot: draggedComponent.getHoveredSlot()
                };
            }
        }
    };
    cm.handleDragEnd = function(){
        if(!INPUT.fullClick()){
            return;
        }
        if(cm.dragged == null
            || cm.dragged.component == null 
            || cm.dragged.slot == null 
            || cm.dragged.component.getItem(cm.dragged.slot) == null){
            // Missing or malformed dragged object
            cm.dragged = null;
            return;
        }

        let destComponent = cm.getHoveredComponent();

        if(destComponent == null){
            cm.dropItem();
            return; // Dragged off UI. Drop item.
        }

        let destSlot = destComponent.getHoveredSlot();
        let draggedItem = cm.dragged.component.getItem(cm.dragged.slot);
        let displacedItem = destComponent.getItem(destSlot);

        if(displacedItem != null && draggedItem.name == displacedItem.name){
            // Attempt to stack like items
            return cm.stackItem(draggedItem, displacedItem);            
        }
        // Attempt to swap items
        cm.swapItems(destComponent, destSlot, draggedItem, displacedItem);        
    };
    cm.dropItem = function(){
        let player = SCENE.getPlayerOne();
        let draggedItem = cm.dragged.component.getItem(cm.dragged.slot);
        player.dropItem(draggedItem);
        cm.dragged.component.setItem(cm.dragged.slot, null);
        cm.dragged = null;
    };
    cm.stackItem = function(draggedItem, displacedItem){
        if(draggedItem == displacedItem){
            // Don't stack an item into itself.
            cm.dragged = null;
            return;
        }
        let space = displacedItem.stackSpace();
        if(space >= draggedItem.quantity){
            displacedItem.stack(draggedItem.quantity);
            cm.dragged.component.setItem(cm.dragged.slot, null)
        }
        else{
            let overflow = draggedItem.quantity - space;
            displacedItem.stack(space);
            draggedItem.quantity = overflow;
        }
        cm.dragged = null;
    };
    cm.swapItems = function(destComponent, destSlot, draggedItem, displacedItem){
        if(!destComponent.canSetItem(destSlot, draggedItem) || !cm.dragged.component.canSetItem(cm.dragged.slot, displacedItem)){
            // Swap is not possible. Abort.
            cm.dragged = null;
            return;
        }

        // Swap contents of slots
        destComponent.setItem(destSlot, draggedItem);
        cm.dragged.component.setItem(cm.dragged.slot, displacedItem);
        cm.dragged = null;
    };
    cm.draw = function(){
        // Always draw notifications bar
        cm.notificationsBar.draw();

        if(cm.activeMenu == MENUS.None){
            cm.statusbar.draw();
            cm.foodbar.draw();
            cm.hotbar.draw();
        }
        else if(cm.activeMenu == MENUS.Equip){
            cm.hotbar.draw();
            cm.inventory.draw();
            cm.paperdoll.draw();
            cm.statusbar.draw();
            cm.foodbar.draw();
            cm.navBar.draw();
        }
        else if(cm.activeMenu == MENUS.Craft){
            cm.craftingMenu.draw();
            cm.navBar.draw();
            cm.hotbar.draw();
            cm.inventory.draw();
        }
        
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
        if(cm.paperdoll.getHoveredSlot() != null && cm.paperdoll.getHoveredItem() != null){
            return cm.paperdoll;
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
        if(cm.paperdoll.getHoveredSlot() != null){
            return cm.paperdoll;
        }
        return null;
    };
    cm.linkActor = function(actor){
        cm.hotbar.linkedInv = actor.hotbar;
        cm.inventory.linkedInv = actor.inventory;
        cm.statusbar.linkActor(actor);
        cm.paperdoll.linkedInv = actor.paperdoll;
    };
    return cm;
};