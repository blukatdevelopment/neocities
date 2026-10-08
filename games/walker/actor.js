/*##############################################################################
# Actor class
##############################################################################*/
var ACTORFACTORY = {};

ACTORFACTORY.playerOne = function(){
  let config = UTILITY.getActorConfig("wrath");
  let pone = ACTOR.new();
  let anm = SPRITES.Animator.new();
  anm.animation = SPRITES.animations[config.name][ACTOR_ANIMATIONS.idleLeft]
  let asm = ACTOR.AnimationStateMachine.new(name, SPRITES.animations[config.name], anm);
  asm.linkToActor(pone);
  pone.stateMachine = asm;
  let agent = AGENT.PLAYER_ONE.new(pone);
  pone.agent = agent;
  pone.animator = anm;
  return pone;
};

ACTORFACTORY.npc = function(){
  // TODO
};

var ACTOR = {};
ACTOR.new = function(){
  let atr = {
    entityId: UTILITY.getNextEntityId(),
    stateMachine: null,
    position: VECTOR3.new(0, 0, 0),
    prevPosition: VECTOR3.new(0, 0, 0),
    direction: DIRECTIONS.east,
    prevDirection: DIRECTIONS.east,
    moving: false,
    prevMoving: false,
    size: 32,
    speed: 2.5
  };
  atr.update = function(){
    atr.stateMachine.update();
    atr.agent.update();

  };
  atr.teleport = function(destination){
    atr.position = destination;
    atr.prevPosition = destination;
  };
  atr.move = function(direction){
    atr.moving = true;
    switch(direction){
      case DIRECTIONS.north:
        atr.position.z -= atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.south:
        atr.position.z += atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.east:
        atr.position.x += atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.west:
        atr.position.x -= atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.up:
        atr.position.y += atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.down:
        atr.position.y -= atr.speed;
        atr.direction = direction;
      break;
    }
  };
  atr.draw = function(){
    let events = UTILITY.getEventsByEntity(atr.entityId);
    atr.animator.update(atr.position.x, atr.position.z);
  };
  atr.toString = function(){
    let str = "[";
    str += "ID: " + atr.entityId;
    str += ", pos: " + atr.position.toString();
    str += "]";
    return str;
  }
  return atr;
}


var Actor = {};

ACTOR.AnimationStateMachine = {};
ACTOR.AnimationStateMachine.new = function(name, animations, animator){
  let asm = {
    entityId: -1,
    name: name,
    currentAnimation: null,
    animations: animations,
    animator: animator,
    moving: false,
    direction: DIRECTIONS.north
  };

  asm.linkToActor = function(actor){
    asm.actor = actor;
  };

  asm.getNextAnimationName = function(){
    let nextAnimation = null;
    if(asm.actor.moving){
      switch(asm.actor.direction){
        case DIRECTIONS.north:
          nextAnimation = ACTOR_ANIMATIONS.walkUp;
          break;
        case DIRECTIONS.south:
          nextAnimation = ACTOR_ANIMATIONS.walkDown;
          break;
        case DIRECTIONS.east:
          nextAnimation = ACTOR_ANIMATIONS.walkRight;
          break;
        case DIRECTIONS.west:
          nextAnimation = ACTOR_ANIMATIONS.walkLeft;
          break;
      }
    }
    else{
      switch(asm.actor.direction){
        case DIRECTIONS.north:
          nextAnimation = ACTOR_ANIMATIONS.idleUp;
          break;
        case DIRECTIONS.south:
          nextAnimation = ACTOR_ANIMATIONS.idleDown;
          break;
        case DIRECTIONS.east:
          nextAnimation = ACTOR_ANIMATIONS.idleRight;
          break;
        case DIRECTIONS.west:
          nextAnimation = ACTOR_ANIMATIONS.idleLeft;
          break;
      }
    }
    return nextAnimation;
  };

  asm.update = function(){
    let nextAnimation = asm.getNextAnimationName();
    if(nextAnimation && asm.animations[nextAnimation]){
      asm.animator.setAnimation(asm.animations[nextAnimation]);
    }
    else{
      let obj = {
        nextAnimation: nextAnimation,
        ref: asm.animations[nextAnimation]
      };
      UTILITY.log("ACTOR" + "nextanimation invalid" + JSON.stringify(obj));
    }
  };

  return asm;
};