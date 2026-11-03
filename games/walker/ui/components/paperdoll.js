/*##############################################################################
# Displays the 9 inventory slots the player can choose from to use
##############################################################################*/
UI.COMPONENTS.PaperDoll = {};
UI.COMPONENTS.PaperDoll.new = function(manager){
    let rect = SHAPES.RECT.new(VECTOR2.new(123, 246), VECTOR2.new(89, 80));
    let sprite = SPRITES.static.paperdoll.paperdoll;
    let pd = UI.COMPONENTS.BaseComponent.new(rect, sprite);
    pd.name = "Hotbar";
    pd.manager = manager;
    pd.activeSlot = 0;
    pd.slotCount = 9;
    pd.linkedInv = null;
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
    pd.drawSlot = function(slot, rect){
        return;
    };
    pd.getItem = function(slot){
        if(pd.linkedInv == null){
            return null;
        }
        return pd.linkedInv.getItem(slot);
    };
    pd.setItem = function(slot, item){
        if(pd.linkedInv){
            pd.linkedInv.setItem(slot, item);
        }
    };
    pd.getHoveredSlot = function(){
        return -1;
    };
    pd.getHoveredItem = function(){
        return null;
    };
    return pd;
};