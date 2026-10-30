/*##############################################################################
# provides the base scene with placeholder methods
##############################################################################*/
SCENE.SCENES.BaseScene = function(){
    let bs = {
        name: "base",
        gameState: null
    };
    bs.update = function(){};
    bs.setGameState  = function(state){
        bs.gameState = state;
    };
    bs.getGameState  = function(){
        return bs.gameState;
    };
    bs.destroyEntity = function(entity){};
    bs.debugMessage = function(){};
    return bs;
};