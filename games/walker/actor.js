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
  pone.getCollider().rect.position = VECTOR2.new(0, 0);
  pone.getCollider().rect.size = VECTOR2.new(32, 32);
  pone.name = "player";

  pone.attacks.push(ACTOR.AttackFactory.UNARMED());

  return pone;
};

ACTORFACTORY.npc = function(){
  // TODO
};


// Set up info for attacks
ACTOR.Attack = {};
ACTOR.Attack.new = function(){
  let atk = {
    upAnimation: null,
    downAnimation: null,
    leftAnimation: null,
    rightAnimation: null,
    damage: null,
    frames: null,
    damageFrames: []
  };
  return atk;
};
ACTOR.AttackPresets = {};
ACTOR.AttackFactory.UNARMED = function(){
  let atk = ACTOR.Attack.new();
  atk.upAnimation = ACTOR_ANIMATIONS.meleeUp;
  atk.downAnimation = ACTOR_ANIMATIONS.meleeDown;
  atk.rightAnimation = ACTOR_ANIMATIONS.meleeRight;
  atk.leftAnimation = ACTOR_ANIMATIONS.meleeLeft;
  atk.damage = 1;
  atk.frames = 3;
  atk.damageFrames = [1];
  return atk;
};


// implements iEntity, inherits base entity
var ACTOR = {};
ACTOR.new = function(){
  let atr = ENTITY.baseEntity.new();
  atr.stateMachine = null;
  atr.prevPosition = VECTOR2.new(0, 0);
  atr.direction = DIRECTIONS.east;
  atr.prevDirection = DIRECTIONS.east;
  atr.moving = false;
  atr.prevMoving = false;
  atr.size = 32;
  atr.speed = 5;
  atr.lockCamera = false;
  atr.attacks = [];
  atr.update = function(){
    atr.stateMachine.update();
    atr.agent.update();
    if(atr.lockCamera && GRAPHICS.getDisplayMode() == DISPLAY_MODES.camera){
      GRAPHICS.centerCamera(VECTOR2.new(atr.position.x, atr.position.y));
    }
  };
  atr.teleport = function(destination){
    atr.position = destination;
    atr.prevPosition = destination;
  };
  atr.move = function(direction){
    atr.moving = true;
    let dest = VECTOR2.new(atr.position.x, atr.position.y);
    switch(direction){
      case DIRECTIONS.north:
        dest.y -= atr.speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.south:
        dest.y += atr.speed;
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
    }
    let dest2D = VECTOR2.new(dest.x, dest.y);
    if(atr.collider.moveAndCollideShort(dest2D)){
      return;
    }
  };
  atr.draw = function(){
    atr.animator.update(atr.position.x, atr.position.y);
    if(atr.label != ""){
      GRAPHICS.drawTextRelative(atr.label, atr.position.x, atr.position.y);
    }
  };
  atr.interact = function(){
    let dir = VECTOR2.vectorFromDirection(atr.direction);
    let halfSize = atr.size/2;
    let speed = VECTOR2.new(halfSize, halfSize); // Should be just out of the hitbox
    dir = dir.multiply(speed);

    let pos = atr.centeredPosition();
    let dest = pos.add(dir);

    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(halfSize, halfSize));
    rect.recenter(dest);

    let colliders = atr.collider.controller.rectHitScan([atr.getEntityId()], rect);
    for(let cl of colliders){
      cl.parent.onInteract({});
    }
  };
  atr.interactAtPoint = function(point){
    let halfSize = atr.size/2;
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(halfSize, halfSize));
    rect.recenter(point);

    let colliders = atr.collider.controller.rectHitScan([atr.getEntityId()], rect);
    for(let cl of colliders){
      cl.parent.onInteract({});
    }
  };
  atr.onCollide = function(collision){};
  atr.onInteract = function(interaction){};
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