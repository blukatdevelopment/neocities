/*##############################################################################
# Components and functionality for user interface
##############################################################################*/

let UI = {};
UI.COMPONENTS = {};

UI.COMPONENTS.Manager = {};

// Provides inter-component interaction.
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


UI.COMPONENTS.BaseComponent = {}; 
UI.COMPONENTS.BaseComponent.new = function(rect, sprite){
	let bc = {
		rect: rect, 
		sprite: sprite
	};
	bc.update = function(){};
	bc.draw = function(){
		let pos = bc.rect.position;
		SPRITES.renderSprite(pos.x, pos.y, bc.sprite.index, bc.sprite.sheet, DISPLAY_MODES.static);
	};
	return bc;
};


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

UI.COMPONENTS.StatusBar = {};
UI.COMPONENTS.StatusBar.new = function(){
	let sbRect = SHAPES.RECT.new(
		VECTOR2.new(320, 320),
		VECTOR2.new(80, 80)
	);
	let sprite = SPRITES.static.statusbar.statusbar;	
	let sb = UI.COMPONENTS.BaseComponent.new(sbRect, sprite);
	sb.stats = null;
	sb.recentThreshold = 3;
	sb.blinkDuration = 250;
	sb.healthRect = SHAPES.RECT.new(
		VECTOR2.new(6, 6),
		VECTOR2.new(20, 50)
	);
	sb.energyRect = SHAPES.RECT.new(
		VECTOR2.new(30, 6),
		VECTOR2.new(20, 50)
	);
	sb.magicRect = SHAPES.RECT.new(
		VECTOR2.new(53, 6),
		VECTOR2.new(21, 50)
	);
	sb.linkActor = function(actor){
		sb.stats = actor.stats;
	};
	sb.draw = function(){
		if(sb.stats == null){
			return;
		}
		if(!sb.isChangedRecently()){
			return;
		}
		let pos = sb.rect.position;
		SPRITES.renderSprite(pos.x, pos.y, sb.sprite.index, sb.sprite.sheet, DISPLAY_MODES.static);
		sb.shroudStat(sb.stats.health, sb.healthRect);
		sb.shroudStat(sb.stats.energy, sb.energyRect);
		sb.shroudStat(sb.stats.magic, sb.magicRect);
		sb.renderStatText(sb.healthRect, sb.stats.health);
		sb.renderStatText(sb.energyRect, sb.stats.energy);
		sb.renderStatText(sb.magicRect, sb.stats.magic);
		sb.highlightDelta(sb.healthRect, sb.stats.health);
		sb.highlightDelta(sb.energyRect, sb.stats.energy);
		sb.highlightDelta(sb.magicRect, sb.stats.magic);
	};
	sb.highlightDelta = function(barRect, stat){
		if(stat.changeDelta() == null || stat.changeDelta() == 0){
			return;
		}
		// Blink the highlight
		let blinks = Math.trunc(stat.changeAgeMilliseconds() / sb.blinkDuration);
		let blinkOff = blinks % 2 == 0; 
		console.log("Blinks " + blinks + "  blinkoff " + blinkOff);
		if(blinkOff){
			// Highlighting blinks on and off.
			return;
		}
		if(stat.changeDelta() > 0){
			sb.highlightGain(barRect, stat);
		}
		else if(stat.changeDelta() < 0){
			sb.highlightLoss(barRect, stat);
		}
	};
	sb.highlightGain = function(barRect, stat){
		// TODO
	};
	sb.highlightLoss = function(barRect, stat){
		let delta = stat.changeDelta() * -1;
		let deltaPercentage = delta / stat.max;
		let deltaHeight = deltaPercentage * barRect.size.y;
		let shroudHeight = sb.getShroudHeight(stat.value, stat.max, barRect.size.y);

		let x = barRect.position.x + sb.rect.position.x;
		let y = barRect.position.y + sb.rect.position.y + shroudHeight - deltaHeight ;
		let width = barRect.size.x;
		let height = deltaHeight;
		GRAPHICS.fillBox(x, y, width, height, stat.transparentColor);
	};
	sb.shroudStat = function(stat, rect){
		let barHeight = rect.size.y;
		let shroudHeight = sb.getShroudHeight(stat.value, stat.max, barHeight);
		let shroudPos = rect.position.add(sb.rect.position);
		let x = shroudPos.x;
		let y = shroudPos.y;
		let width = rect.size.x;
		let height = shroudHeight;
		let color = GRAPHICS.Colors.Black;
		if(stat.max == 0){
			color = GRAPHICS.Colors.Beige;
		}
		GRAPHICS.fillBox(shroudPos.x, shroudPos.y, rect.size.x, shroudHeight, color);
	};
	sb.getShroudHeight = function(value, max, barHeight){
		if(max == 0){
			return barHeight;
		}
		let barPercentage = value / max; // how full is the bar
		let shroudPercentage = 1 - barPercentage;
		let shroudHeight = barHeight * shroudPercentage;
		return shroudHeight;
	};
	sb.renderStatText = function(barRect, stat){
		if(stat.max == 0){
			return;
		}
		let color = stat.color;
		let textSize = SETTINGS.defaultFontSize;
		let x = sb.rect.position.x + barRect.position.x;
		let y = sb.rect.position.y + barRect.position.y + barRect.size.y + textSize;
		let text = stat.name;
		GRAPHICS.drawText(text, x, y, textSize, color);
		y += textSize;
		text = stat.value + "/" + stat.max;
		GRAPHICS.drawText(text, x, y, textSize, color);
	};
	sb.isChangedRecently = function(){
		if(sb.stats.health.changeAgeSeconds() != null && sb.stats.health.changeAgeSeconds() <= sb.recentThreshold){
			return true;
		}
		if(sb.stats.energy.changeAgeSeconds() != null && sb.stats.energy.changeAgeSeconds() <= sb.recentThreshold){
			return true;
		}
		if(sb.stats.magic.changeAgeSeconds() != null && sb.stats.magic.changeAgeSeconds() <= sb.recentThreshold){
			return true;
		}
		return false;
	};
	return sb;
};