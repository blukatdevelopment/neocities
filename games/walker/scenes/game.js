/*##############################################################################
# Scene: gameplay
##############################################################################*/

var GAME = {};
GAME.isSetup = false;
GAME.gameState = GAMESTATES.play;
GAME.levelRenderer = null;

GAME.setup = function(){
  GAME.levelRenderer = LEVEL.Renderer.new();
  GAME.levelRenderer.init();
  GAME.isSetup = true;
};

GAME.update = function(){
  if(!GAME.isSetup){
    GAME.setup();
  }
  GAME.levelRenderer.update();
};

GAME.setGameState = function(gameState){
  GAME.gameState = gameState;
};

GAME.getGameState = function(){
  return GAME.gameState;
}