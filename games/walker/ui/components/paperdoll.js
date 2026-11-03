/*##############################################################################
# Displays the 9 inventory slots the player can choose from to use
##############################################################################*/
UI.COMPONENTS.PaperDoll = {};
UI.COMPONENTS.PaperDoll.new = function(manager){
    let rect = SHAPES.RECT.new(VECTOR2.new(123, 246), VECTOR2.new(89, 80));
    let sprite = SPRITES.static.paperdoll.paperdoll;
    let pd = UI.COMPONENTS.BaseComponent.new(rect, sprite);
    pd.name = "Paperdoll";
    pd.manager = manager;
    pd.linkedInv = null;
    pd.slotPositions = {};
    pd.slotPositions[GEAR.slots.head] = VECTOR2.new(21,2);
    pd.slotPositions[GEAR.slots.hand] = VECTOR2.new(2,21);
    pd.slotPositions[GEAR.slots.offHand] = VECTOR2.new(40,21);
    pd.slotPositions[GEAR.slots.torso] = VECTOR2.new(21,21);
    pd.slotPositions[GEAR.slots.legs] = VECTOR2.new(21,40);
    pd.slotPositions[GEAR.slots.feet] = VECTOR2.new(21,59);
    pd.slotPositions[GEAR.slots.special1] = VECTOR2.new(67,13);
    pd.slotPositions[GEAR.slots.special2] = VECTOR2.new(67,32);
    pd.slotPositions[GEAR.slots.special3] = VECTOR2.new(67,51);

    pd.update = function(){
        if(INPUT.keyPress(INPUT.KEYS.K_TAB)){
            pd.toggleActive();
        }

    };
    pd.draw = function(){
        if(!pd.active){
            return;
        }
        let pos = pd.rect.position;
        SPRITES.renderSprite(pos.x, pos.y, pd.sprite.index, pd.sprite.sheet, DISPLAY_MODES.static);
        for(let slot of Object.keys(pd.slotPositions)){
            let slotRect = pd.getSlotRect(slot);
            let item = pd.getItem(slot);
            if(item != null){
                SPRITES.renderSprite(slotRect.position.x, slotRect.position.y, item.sprite.index, item.sprite.sheet, DISPLAY_MODES.static);
            }
        }
        let hoveredSlot = pd.getHoveredSlot();
        if(hoveredSlot){
            let rect = pd.getSlotRect(hoveredSlot);
            GRAPHICS.drawBox(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
            let hoveredItem = pd.getItem(hoveredSlot);
            if(hoveredItem){
                GRAPHICS.drawTooltip(hoveredItem.name);
            }
        }
    };
    pd.toggleActive = function(){
        if(pd.active){
            SCENE.setGameState(GAMESTATES.play);
            pd.active = false;
        }
        else{
            SCENE.setGameState(GAMESTATES.inventory);
            pd.active = true;
        }
    };
    pd.getItem = function(slot){
        if(pd.linkedInv == null){
            return null;
        }
        let slotIndex = GEAR.slotIndices[slot];
        return pd.linkedInv.getItem(slotIndex);
    };
    pd.setItem = function(slot, item){
        if(pd.linkedInv){
            pd.linkedInv.setItem(slot, item);
        }
        let slotIndex = GEAR.slotIndices[slot];
        pd.linkedInv.setItem(slotIndex, item);
    };
    pd.getHoveredSlot = function(){
        let mousePos = INPUT.getDownScaledMousePosition();
        for(let slot of Object.keys(pd.slotPositions)){
            let rect = pd.getSlotRect(slot);
            if(rect && rect.contains(mousePos)){
                return slot;
            }
        }
        return null;
    };
    pd.getSlotRect = function(slot){
        if(pd.slotPositions[slot] == null){
            return null;
        }
        let slotOffset = pd.slotPositions[slot];
        let pos = pd.rect.position.add(slotOffset);
        let size = VECTOR2.new(16,16);
        return SHAPES.RECT.new(pos, size)
    };
    pd.getHoveredItem = function(){
        let slot = pd.getHoveredSlot();
        if(slot == null){
            return null;
        }
        return pd.getItem(slot);
    };
    return pd;
};