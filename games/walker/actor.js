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
  pone.getCollider().rect.position = VECTOR2.new(13, 0);
  pone.getCollider().rect.size = VECTOR2.new(11, 32);
  pone.name = "Wrath";

  pone.attacks.push(ACTOR.AttackFactory.UNARMED());
  pone.activeAttack = pone.attacks[0];

  pone.stats = ACTOR.StatsController.new(100, 100);

  return pone;
};

ACTORFACTORY.simpleEnemy = function(){
  let config = UTILITY.getActorConfig("wrath");
  let se = ACTOR.new();
  let anm = SPRITES.Animator.new();
  anm.animation = SPRITES.animations[config.name][ACTOR_ANIMATIONS.idleLeft]
  let asm = ACTOR.AnimationStateMachine.new(name, SPRITES.animations[config.name], anm);
  asm.linkToActor(se);
  se.stateMachine = asm;
  let agent = AGENT.SIMPLE_ENEMY.new(se);
  se.agent = agent;
  se.animator = anm;
  se.lockCamera = false;

  se.setCollider(PHYSICS.BoxCollider.new());
  se.getCollider().rect.position = VECTOR2.new(13, 0);
  se.getCollider().rect.size = VECTOR2.new(11, 32);
  se.name = "Enemy";
  se.label = se.name;

  se.attacks.push(ACTOR.AttackFactory.UNARMED());
  se.activeAttack = se.attacks[0];

  se.stats = ACTOR.StatsController.new(3, 3);
  return se;
};


// inherits base entity
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
  atr.activeAttack = null;
  atr.cooldown = true;
  atr.stats = null;
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
    // No moving while attacking
    if(!atr.cooldown){
      return;
    }
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
    if(atr.collider.moveAndCollideShort(dest)){
      return;
    }
  };
  atr.draw = function(){
    atr.animator.update(atr.position.x, atr.position.y);
    if(atr.label != ""){
      GRAPHICS.drawTextRelative(atr.label, atr.position.x, atr.position.y + atr.size + SETTINGS.defaultFontSize);
    }
  };
  atr.attack = function(){
    if(!atr.cooldown){
      return;
    }
    let atk = atr.activeAttack;
    

    // Execute immediately
    atr.cooldown = false;
    atr.stateMachine.startAttack(atk);

    // Execute attack hitscans at specific timing.
    for(let damageFrame of atk.damageFrames){
      if(damageFrame == 0){
        // Deal damage now
        atr.attackHitscan(atk);
      }
      else{
        // Deal damage later
        UTILITY.delayExecute(damageFrame, () => {
          atr.attackHitscan(atk);
        });
      }
    }
    
    // Execute at end of attack
    UTILITY.delayExecute(atk.frames, () => {
      atr.cooldown = true;
    });
    
  };
  atr.attackHitscan = function(atk){

    let dest = atr.centeredPosition().move(atr.direction, atr.size);
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(atr.size, atr.size));
    rect.recenter(dest);

    let colliders = atr.collider.controller.rectHitScan([atr.getEntityId()], rect);
    let attackData = ACTOR.AttackData.new(atr.direction, -atk.damage, atr, { knockback: 10 });
    for(let cl of colliders){
      cl.parent.onAttacked(attackData);
    }
  };
  atr.interact = function(){
    let dest = atr.centeredPosition().move(atr.direction, atr.size);
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(atr.size, atr.size));
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
  atr.onAttacked = function(attackData){
    if(atr.stats){
      let prevHealth = atr.stats.health.value;
      atr.stats.health.change(attackData.damage);
      console.log(atr.name + " attacked for " + attackData.damage +", going from " + prevHealth + " to " + atr.stats.health.value);
      if(atr.stats.health.value < 1){
        atr.die();
      }
      if(attackData.knockback > 0){
        atr.onKnockback(attackData.direction, attackData.knockback);
      }
    }
  };
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

// Record to pass to entity.onAttacked()
// Valid options: knockback
ACTOR.AttackData = {};
ACTOR.AttackData.new = function(direction, damage, sender, options){
  let ad = {
    direction: direction,
    damage: damage,
    sender: sender,
    knockback: 0,    
  };
  if(options.knockback){
    ad.knockback = options.knockback;
  }

  return ad;
};

ACTOR.AttackFactory = {};
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


ACTOR.StatsController = {};
ACTOR.StatsController.new = function(maxHealth, maxEnergy){
  let stc = {
    health: ACTOR.Stat.new(STATS.health, maxHealth),
    energy: ACTOR.Stat.new(STATS.energy, maxEnergy)
  };
  stc.fullRestore = function(){
    stc.health.reset();
    stc.energy.reset();
  };
  return stc;
};

ACTOR.Stat = {};
ACTOR.Stat.new = function(name, max){
  let st = {
    name: name,
    value: max,
    max: max,
    min: 0
  };
  st.reset = function(){
    st.value = st.max;
  };
  st.clear = function(){
    st.value = st.min;
  };
  st.change = function(delta){
    st.value += delta;
    st.value = UTILITY.clamp(st.value);
  };
  return st;
};