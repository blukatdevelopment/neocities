/*##############################################################################
# Components and functionality for user interface
##############################################################################*/

let UI = {};
UI.COMPONENTS = {};

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
UI.COMPONENTS.Hotbar.new = function(){
	let rect = SHAPES.RECT.new(VECTOR2.new(123, 382), VECTOR2.new(154, 18));
	let sprite = SPRITES.static.hotbar.hotbar;	
	let hb = UI.COMPONENTS.BaseComponent.new(rect, sprite);
	hb.activeSlot = 0;
	hb.slotCount = 9;
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
		let rect = hb.getSlotRect(hb.activeSlot);
		GRAPHICS.drawBox(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
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
	return hb;
};

