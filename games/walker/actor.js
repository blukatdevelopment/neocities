/*##############################################################################
# Actor-related classes
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
  pone.lockCamera = true;

  pone.setCollider(PHYSICS.BoxCollider.new());
  pone.getCollider().rect.position = VECTOR3.new(0, 0);
  pone.getCollider().rect.size = VECTOR2.new(32, 32);
  pone.name = "player";
  return pone;
};

ACTORFACTORY.npc = function(){
  // TODO
};

// implements iEntity, inherits base entity
var ACTOR = {};
ACTOR.new = function(){
  let atr = ENTITY.baseEntity.new();
  atr.stateMachine = null;
  atr.prevPosition = VECTOR3.new(0, 0, 0);
  atr.direction = DIRECTIONS.east;
  atr.prevDirection = DIRECTIONS.east;
  atr.moving = false;
  atr.prevMoving = false;
  atr.size = 32;
  atr.speed = 5;
  atr.lockCamera = false;
  atr.update = function(){
    atr.stateMachine.update();
    atr.agent.update();
    if(atr.lockCamera && GRAPHICS.getDisplayMode() == DISPLAY_MODES.camera){
      GRAPHICS.centerCamera(VECTOR2.new(atr.position.x, atr.position.z));
    }
  };
  atr.teleport = function(destination){
    atr.position = destination;
    atr.prevPosition = destination;
  };
  atr.move = function(direction){
    atr.moving = true;
    let dest = VECTOR3.new(atr.position.x, atr.position.y, atr.position.z);
    switch(direction){
      case DIRECTIONS.north:
        dest.z -= atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.south:
        dest.z += atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.east:
        dest.x += atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.west:
        dest.x -= atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.up:
        dest.y += atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.down:
        dest.y -= atr.speed;
        atr.direction = direction;
      break;
    }
    let dest2D = VECTOR2.new(dest.x, dest.z);
    if(atr.collider.moveAndCollideShort(dest2D)){
      return;
    }
    //atr.position = dest;
  };
  atr.draw = function(){
    atr.animator.update(atr.position.x, atr.position.z);
    if(atr.label != ""){
      GRAPHICS.drawTextRelative(atr.label, atr.position.x, atr.position.z);
    }
  };
  atr.onCollide = function(collision){};
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