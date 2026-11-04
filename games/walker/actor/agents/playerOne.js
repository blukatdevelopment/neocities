AGENT.PLAYER_ONE = {};
AGENT.PLAYER_ONE.new = function(actor){
    var pone = {
        actor: actor,
        keyPresses: {}
    };
    for(let i in KEY_PRESSES_USED){
        let key = KEY_PRESSES_USED[i];
        pone.keyPresses[key] = false;
    }

    pone.update = function (){
        // TODO: move code currently in GAME.mouseDown here to break tight coupling
        let atr = pone.actor;
        let aId = atr.entityId;
        if(INPUT.key(INPUT.KEYS.K_LEFT_SHIFT)){
            atr.sprint();
        }
        let x_movement = 0;
        let y_movement = 0;
        let k_w = INPUT.key(INPUT.KEYS.K_W) ? 1 : 0;
        let k_s = INPUT.key(INPUT.KEYS.K_S) ? 1 : 0;
        let k_a = INPUT.key(INPUT.KEYS.K_A) ? 1 : 0;
        let k_d = INPUT.key(INPUT.KEYS.K_D) ? 1 : 0;

        // Net inputs
        let x = k_d - k_a;
        let z = k_w - k_s; // Invert

        if(x == 0 && z == 0){
            if(atr.moving){
                atr.moving = false; 
            }
        }
        else{
            if(x < 0){
                atr.move(DIRECTIONS.west);
            }
            else if(x > 0){
                atr.move(DIRECTIONS.east);
            }
            if(z < 0){
                atr.move(DIRECTIONS.south);
            }
            else if(z > 0){
                atr.move(DIRECTIONS.north);
            }
        }
        if(INPUT.keyPress(INPUT.KEYS.K_M)){
            SCENE.setActiveScene(SCENE.SCENES.WorldMap());
        }
        if(INPUT.keyPress(INPUT.KEYS.K_SPACE) || INPUT.mouseClick(INPUT.LEFT_CLICK)){
            atr.primaryAction();         
        }
        if(INPUT.keyPress(INPUT.KEYS.K_E)){
            atr.interact();
        }
        if(INPUT.keyPress(INPUT.KEYS.K_F)){
            atr.useItem();
        }
        if(INPUT.keyPress(INPUT.KEYS.K_R)){
            atr.toggleItemsDrawn();
        }
        if(INPUT.mouseClick(INPUT.RIGHT_CLICK)){
            atr.secondaryAction();            
        }
    };
    return pone;
};