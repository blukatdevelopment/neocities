/*##############################################################################
# Determines which animations play for an actor
##############################################################################*/

ACTOR.AnimationStateMachine = {};
ACTOR.AnimationStateMachine.new = function(name, animations, animator){
  let asm = {
    entityId: -1,
    name: name,
    currentAnimation: null,
    animations: animations,
    animator: animator,
    moving: false,
    direction: DIRECTIONS.north,
    attack: null
  };

  asm.linkToActor = function(actor){
    asm.actor = actor;
  };

  asm.getNextAnimationName = function(){
    let nextAnimation = null;
    if(asm.attack){
      let atk = asm.attack;
      switch(asm.actor.direction){
        case DIRECTIONS.north:
          nextAnimation = atk.upAnimation;
          break;
        case DIRECTIONS.south:
          nextAnimation = atk.downAnimation;
          break;
        case DIRECTIONS.east:
          nextAnimation = atk.rightAnimation;
          break;
        case DIRECTIONS.west:
          nextAnimation = atk.leftAnimation;
          break;
      }
    }
    else if(asm.actor.moving){
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

  asm.startAttack = function(attack, frames){
    asm.attack = attack;
    UTILITY.delayExecute(attack.frames, () => { asm.attack = null; });
  };
  return asm;
};