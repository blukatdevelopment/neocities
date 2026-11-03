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
    pd.slotIndexToName = function(slotIndex){
        if(slotIndex < 0){
            return null;
        }
        let keys = Object.keys(pd.slotPositions);
        if(slotIndex >= keys.length){
            return null;
        }
        return keys[slotIndex];
    };
    pd.draw = function(){
        if(!pd.active){
            return;
        }
        let pos = pd.rect.position;
        SPRITES.renderSprite(pos.x, pos.y, pd.sprite.index, pd.sprite.sheet, DISPLAY_MODES.static);
        for(let slot of Object.keys(pd.slotPositions)){
            let slotRect = pd.getSlotRect(slot);
            let item = pd.getItemBySlotName(slot);
            if(item != null){
                SPRITES.renderSprite(slotRect.position.x, slotRect.position.y, item.sprite.index, item.sprite.sheet, DISPLAY_MODES.static);
            }
        }
        let hoveredSlot = pd.getHoveredSlotName();
        if(hoveredSlot){
            let rect = pd.getSlotRect(hoveredSlot);
            GRAPHICS.drawBox(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
            let hoveredItem = pd.getItemBySlotName(hoveredSlot);
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
    pd.getItemBySlotName = function(slot){
        if(pd.linkedInv == null){
            return null;
        }
        let slotIndex = GEAR.slotIndices[slot];
        return pd.linkedInv.getItem(slotIndex);
    };
    pd.getItem = function(slotIndex){
        if(pd.linkedInv == null){
            return null;
        }
        return pd.linkedInv.getItem(slotIndex);
    };
    pd.setItem = function(slotIndex, item){
        if(pd.linkedInv == null){
            return;
        }
        pd.linkedInv.setItem(slotIndex, item);
    };
    pd.canSetItem = function(slotIndex, item){
        if(item == null){
            // Can always clear slot
            return true;
        }
        let slotName = pd.slotIndexToName(slotIndex);
        if(slotName == null){
            return false;
        }
        if(item.type != ITEMS.Types.Gear){
            UTILITY.notification("Cannot equip that");
            return false;
        }
        if(item.slots && item.slots.includes(slotName)){
            return true;
        }
        UTILITY.notification("Cannot equip that there");
        return false;
    };
    pd.getHoveredSlot = function(){
        let mousePos = INPUT.getDownScaledMousePosition();
        for(let slot of Object.keys(pd.slotPositions)){
            let rect = pd.getSlotRect(slot);
            if(rect && rect.contains(mousePos)){
                return GEAR.slotIndices[slot];
            }
        }
        return null;
    };
    pd.getHoveredSlotName = function(){
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
        let slot = pd.getHoveredSlotName();
        if(slot == null){
            return null;
        }
        return pd.getItemBySlotName(slot);
    };
    return pd;
};