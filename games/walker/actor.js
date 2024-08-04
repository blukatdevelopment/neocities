/*##############################################################################
# Actor class
# Todo: use real classes here if it makes sense
##############################################################################*/
var Actor = {};

Actor.ANIMATIONS = {
  "SOUTH_STAND": [0, 7]
};

Actor.new = function(){
  var wkr = {
    id: GAME.getNextId(),
    x: 100,
    y: 100,
    size: 50,
    speed: 5
  };
  var spriteSheet = GRAPHICS.loadImage("https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/player.png");
  wkr.spriteManager = SPRITES.Manager.new(spriteSheet, 16, 32, 10, 10, 6, Actor.ANIMATIONS);
  wkr.spriteManager.setAnimation("SOUTH_STAND");
  wkr.update = function(){
    wkr.move();
  }
  
  wkr.move = function(){
    var x_movement = 0;
    var y_movement = 0;
    if(INPUT.key(INPUT.KEYS.K_W)){
      y_movement -= wkr.speed;
    }
    if(INPUT.key(INPUT.KEYS.K_S)){
      y_movement += wkr.speed;
    }
    if(INPUT.key(INPUT.KEYS.K_A)){
      x_movement -= wkr.speed;
    }
    if(INPUT.key(INPUT.KEYS.K_D)){
      x_movement += wkr.speed;
    }
    wkr.x += x_movement;
    wkr.y += y_movement;
  }
  
  wkr.draw = function(){
    wkr.spriteManager.draw(wkr.x, wkr.y);
  }
  return wkr;
}
