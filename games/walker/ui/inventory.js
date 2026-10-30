/*##############################################################################
# Displays additional inventory space the player can access
##############################################################################*/

UI.COMPONENTS.Inventory = {};
UI.COMPONENTS.Inventory.new = function(manager){
    let rect = SHAPES.RECT.new(VECTOR2.new(123, 328), VECTOR2.new(154, 54));
    let sprite = SPRITES.static.inventory.inventory;    
    let inv = UI.COMPONENTS.BaseComponent.new(rect, sprite);
    inv.name = "Inventory";
    inv.linkedInv = null;
    inv.manager = manager;
    inv.activeSlot = 0;
    inv.slotCount = 9;
    inv.active = false;
    inv.update = function(){
        if(INPUT.keyPress(INPUT.KEYS.K_TAB)){
            inv.toggleActive();
        }
    };
    inv.draw = function(){
        if(!inv.active){
            return;
        }
        let pos = inv.rect.position;
        SPRITES.renderSprite(pos.x, pos.y, inv.sprite.index, inv.sprite.sheet, DISPLAY_MODES.static);
        if(inv.linkedInv){
            for(let i = 0; i < inv.linkedInv.size; i++){
                inv.drawSlot(i);
            }
        }

        let hoveredSlot = inv.getHoveredSlot();
        if(hoveredSlot > -1){
            let rect = inv.getSlotRect(hoveredSlot);
            GRAPHICS.drawBox(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
        }
    };
    inv.drawSlot = function(slot){
        if(inv.manager.dragged && inv.manager.dragged.component == inv && inv.manager.dragged.slot == slot){
            return;
        }
        let item = inv.linkedInv.getItem(slot);
        if(item){
            let rect = inv.getSlotRect(slot);
            SPRITES.renderSprite(rect.position.x, rect.position.y, item.sprite.index, item.sprite.sheet, DISPLAY_MODES.static);
            let quant = item.quantity;
            let xOff = 1;
            let yOff = 15;
            let label = item.quantity + "/" + item.stackSize;
            GRAPHICS.drawText(label, rect.position.x+xOff, rect.position.y+yOff, 10);
        }
    };
    // Returns the rect for one inventory slot
    inv.getSlotRect = function(index){
        let oneIndexed = index+1;
        let row = Math.floor(index/9); // 9 slots per row
        let rowIndex = index % 9;
        let slotSize = 16;
        let offsetX = (rowIndex * slotSize) + rowIndex + 1;
        let offsetY = 1 + (row * (slotSize + 1));
        let x = inv.rect.position.x;
        let y = inv.rect.position.y;
        return SHAPES.RECT.new(VECTOR2.new(x+offsetX, y+offsetY), VECTOR2.new(slotSize, slotSize));
    };
    inv.getItem = function(slot){
        if(inv.linkedInv == null){
            return null;
        }
        return inv.linkedInv.getItem(slot);
    };
    inv.setItem = function(slot, item){
        if(inv.linkedInv){
            inv.linkedInv.setItem(slot, item);
        }
    };
    inv.getHoveredSlot = function(){
        let mousePos = INPUT.getDownScaledMousePosition();

        let ret = -1;
        for(let i = 0; i < 27; i++){
            let rect = inv.getSlotRect(i);
            if(rect.contains(mousePos)){
                return i;
            }
        }
        return ret;
    };
    inv.toggleActive = function(){
        if(inv.active){
            SCENE.setGameState(GAMESTATES.play);
            inv.active = false;
        }
        else{
            SCENE.setGameState(GAMESTATES.inventory);
            inv.active = true;
        }
    };

    return inv;
};

UI.COMPONENTS.Map = {};
UI.COMPONENTS.Map.new = function(grid){
    let map = {
        grid: grid,
        cellSize: 10
    };
    map.rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(400, 400));
    map.draw = function(){
        let cellSize = map.cellSize;
        for(let i = 0; i < map.grid.terrainMap.length; i++){
            let terrain = map.grid.terrainMap[i];
            let color = WORLD.TerrainData[terrain].color;
            let coords = map.grid.indexToCoords(i);
            let x = coords.x * cellSize;
            let y = coords.y * cellSize;
            GRAPHICS.fillBox(x, y, cellSize, cellSize, color);
        }
    }
    return map;
};