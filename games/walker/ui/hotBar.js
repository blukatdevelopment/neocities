/*##############################################################################
# Displays the 9 inventory slots the player can choose from to use
##############################################################################*/
UI.COMPONENTS.Hotbar = {};
UI.COMPONENTS.Hotbar.new = function(manager){
    let rect = SHAPES.RECT.new(VECTOR2.new(123, 382), VECTOR2.new(154, 18));
    let sprite = SPRITES.static.hotbar.hotbar;  
    let hb = UI.COMPONENTS.BaseComponent.new(rect, sprite);
    hb.name = "Hotbar";
    hb.manager = manager;
    hb.activeSlot = 0;
    hb.slotCount = 9;
    hb.linkedInv = null;
    hb.update = function(){
        // Using the number keys to select a slot
        if(INPUT.keyPress(INPUT.KEYS.K_1)){
            hb.setActiveSlot(0);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_2)){
            hb.setActiveSlot(1);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_3)){
            hb.setActiveSlot(2);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_4)){
            hb.setActiveSlot(3);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_5)){
            hb.setActiveSlot(4);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_6)){
            hb.setActiveSlot(5);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_7)){
            hb.setActiveSlot(6);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_8)){
            hb.setActiveSlot(7);
        }
        else if(INPUT.keyPress(INPUT.KEYS.K_9)){
            hb.setActiveSlot(8);
        }
        // change slot based on mouse wheel
        let wheelInput = INPUT.getMouseWheel();
        if(wheelInput > 0){
            hb.prevSlot();
        }
        else if(wheelInput < 0){
            hb.nextSlot();
        }
    };
    hb.draw = function(){
        let pos = hb.rect.position;
        SPRITES.renderSprite(pos.x, pos.y, hb.sprite.index, hb.sprite.sheet, DISPLAY_MODES.static);
        if(hb.linkedInv){
            for(let i = 0; i < hb.linkedInv.size; i++){
                hb.drawSlot(i);
            }
        }

        let rect = null;
        if(SCENE.getGameState() === GAMESTATES.play){
            // Highlight active slot
            rect = hb.getSlotRect(hb.activeSlot);
            GRAPHICS.drawBox(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
        }
        else if(SCENE.getGameState() === GAMESTATES.inventory){
            // Highlight slot that's hovered over
            let hoveredSlot = hb.getHoveredSlot();
            if(hoveredSlot > -1){
                rect = hb.getSlotRect(hoveredSlot);
                GRAPHICS.drawBox(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
            }
        }
    };
    hb.drawSlot = function(slot){
        if(hb.manager.dragged && hb.manager.dragged.component == hb && hb.manager.dragged.slot == slot){
            return;
        }
        let item = hb.linkedInv.getItem(slot);
        if(item){
            let rect = hb.getSlotRect(slot);
            SPRITES.renderSprite(rect.position.x, rect.position.y, item.sprite.index, item.sprite.sheet, DISPLAY_MODES.static);
            let quant = item.quantity;
            let xOff = 1;
            let yOff = 15;
            let label = item.quantity + "/" + item.stackSize;
            GRAPHICS.drawText(label, rect.position.x+xOff, rect.position.y+yOff, 10);
        }
    };
    // Returns the rect for one inventory slot
    hb.getSlotRect = function(index){
        let slotSize = 16;
        let offsetX = (index * slotSize) + index + 1;
        let offsetY = 1;
        let x = hb.rect.position.x;
        let y = hb.rect.position.y;
        return SHAPES.RECT.new(VECTOR2.new(x+offsetX, y+offsetY), VECTOR2.new(slotSize, slotSize));
    };
    hb.getItem = function(slot){
        if(hb.linkedInv == null){
            return null;
        }
        return hb.linkedInv.getItem(slot);
    };
    hb.setItem = function(slot, item){
        if(hb.linkedInv){
            hb.linkedInv.setItem(slot, item);
        }
    };
    hb.nextSlot = function(){
        hb.activeSlot += 1;
        if(hb.activeSlot >= hb.slotCount){
            hb.activeSlot = 0;
        }
    };
    hb.prevSlot = function(){
        hb.activeSlot -= 1;
        if(hb.activeSlot < 0){
            hb.activeSlot = hb.slotCount-1;
        }
    };
    hb.setActiveSlot = function(index){
        hb.activeSlot = index;
    };
    hb.getHoveredSlot = function(){
        let mousePos = INPUT.getDownScaledMousePosition();

        let ret = -1;
        for(let i = 0; i < 9; i++){
            let rect = hb.getSlotRect(i);
            if(rect.contains(mousePos)){
                return i;
            }
        }
        return ret;
    };
    return hb;
};