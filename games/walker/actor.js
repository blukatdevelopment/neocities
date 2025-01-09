/*##############################################################################
# Actor class
##############################################################################*/
var Actor = {};

Actor.ANIMATIONS = {
  NORTH_STAND: [0, 0],
  SOUTH_STAND: [1, 1],
  EAST_STAND: [2, 2],
  WEST_STAND: [3, 3],
  NORTH_MOVE: [4, 5],
  SOUTH_MOVE: [6, 7],
  EAST_MOVE: [8, 9],
  WEST_MOVE: [10, 11]
};

Actor.EVENTS = {
  FACE_NORTH: "FACE_NORTH",
  FACE_EAST: "FACE_EAST",
  FACE_SOUTH: "FACE_SOUTH",
  FACE_WEST: "FACE_WEST",
  MOVE: "MOVE",
  STOP: "STOP"
};

Actor.NORTH = 0;
Actor.SOUTH = 1;
Actor.EAST = 2;
Actor.WEST = 3;

Actor.AGENT = {};
Actor.AGENT.PLAYER_ONE = "Player One";
Actor.AGENT.ENEMY = "Enemy";


Actor.EVENT_HANDLER = function(events, state, manager){
  // init
  if(state?.initialized == null){
    state.initialized = true;
    state.direction = Actor.NORTH;
    state.moving = false;
  }

  // Update state with events
  while(events.length > 0){
    var event = events.shift();
    //console.log("EVENT: " + event);
    switch(event){
      case Actor.EVENTS.MOVE:
        state.moving = true;
      break;
      case Actor.EVENTS.STOP:
        state.moving = false;
      break;
      case Actor.EVENTS.FACE_NORTH:
        state.direction = Actor.NORTH;
      break;
      case Actor.EVENTS.FACE_EAST:
        state.direction = Actor.EAST;
      break;
      case Actor.EVENTS.FACE_SOUTH:
        state.direction = Actor.SOUTH;
      break;
      case Actor.EVENTS.FACE_WEST:
        state.direction = Actor.WEST;
      break;
    }

    // Calculate event for state
    var currentAnimation = null;
    if(state.moving){
      switch(state.direction){
        case Actor.NORTH:
          currentAnimation = "NORTH_MOVE";
        break;
        case Actor.SOUTH:
          currentAnimation = "SOUTH_MOVE";
        break;
        case Actor.EAST:
          currentAnimation = "EAST_MOVE";
        break;
        case Actor.WEST:
          currentAnimation = "WEST_MOVE";
        break;
      }
    }
    else{
      switch(state.direction){
        case Actor.NORTH:
          currentAnimation = "NORTH_STAND";
        break;
        case Actor.SOUTH:
          currentAnimation = "SOUTH_STAND";
        break;
        case Actor.EAST:
          currentAnimation = "EAST_STAND";
        break;
        case Actor.WEST:
          currentAnimation = "WEST_STAND";
        break;
      }
    }
  }
  if(currentAnimation){
    manager.setAnimation(currentAnimation);
  }
};

Actor.new = function(agent_constructor){
  var wkr = {
    id: GAME.getNextId(),
    x: 100,
    y: 100,
    size: 50,
    speed: 2.5
  };
  wkr.agent = agent_constructor(wkr);
  var spriteSheet = GRAPHICS.loadImage("file:///home/blukat/localdev/neocities/games/walker/player.png");//"https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/player.png");
  wkr.spriteManager = SPRITES.Manager.new(
    spriteSheet, // sheet
    16, // width
    32, // height
    10, // columns
    10, // rows
    12, // frameRate
    Actor.ANIMATIONS, // animations
    Actor.EVENT_HANDLER // animation event handler
  );
  wkr.update = function(){
    wkr.move();
  }
  
  wkr.move = function(){
    if(wkr.agent){
      wkr.agent.move();  
    }
    
  }
  
  wkr.draw = function(){
    wkr.spriteManager.draw(wkr.x, wkr.y);
  }
  return wkr;
}