/*##############################################################################
# Base object for player or non-player character
##############################################################################*/
// inherits base entity
ACTOR.new = function(){
  let atr = ENTITY.baseEntity.new();
  atr.stateMachine = null;
  atr.prevPosition = VECTOR2.new(0, 0);
  atr.direction = DIRECTIONS.east;
  atr.prevDirection = DIRECTIONS.east;
  atr.moving = false;
  atr.prevMoving = false;
  atr.size = 32;
  atr.lockCamera = false;
  atr.attacks = [];
  atr.activeAttack = null;
  atr.cooldown = true;
  atr.stats = null;
  atr.hotbar = ITEMS.Inventory.new(9);
  atr.inventory = ITEMS.Inventory.new(27);
  atr.damageLabel = null;
  atr.damageLabelFrames = 0;
  atr.update = function(){
    atr.stateMachine.update();
    atr.agent.update();
    if(atr.lockCamera && GRAPHICS.getDisplayMode() == DISPLAY_MODES.camera){
      GRAPHICS.centerCamera(VECTOR2.new(atr.position.x, atr.position.y));
    }
    if(atr.stats){
      atr.stats.update();
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
    let speed = atr.stats.getAttribute(STATS.Attributes.speed);
    let dest = VECTOR2.new(atr.position.x, atr.position.y);
    
    switch(direction){
      case DIRECTIONS.north:
        dest.y -= speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.south:
        dest.y += speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.east:
        dest.x += speed;
        atr.direction = direction;
      break;
      case DIRECTIONS.west:
        dest.x -= speed;
        atr.direction = direction;
      break;
    }
    if(atr.collider.moveAndCollideShort(dest)){
      return;
    }
  };
  atr.draw = function(){
    if(!GRAPHICS.isOnScreen(atr.collider.rect)){
      // Don't render when off screen
      return;
    }
    atr.animator.update(atr.position.x, atr.position.y);
    if(atr.label != ""){
      GRAPHICS.drawTextRelative(atr.label, atr.position.x, atr.position.y + atr.size + SETTINGS.defaultFontSize);
    }
    if(atr.damageLabel && atr.damageLabel != "" && atr.damageLabelFrames > 0){
      GRAPHICS.drawTextRelative(atr.damageLabel, atr.position.x, atr.position.y + SETTINGS.defaultFontSize, "red");
    }
    if(atr.damageLabelFrames > 0){
      atr.damageLabelFrames -= 1;
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
  atr.canSprint = function(){
    if(atr.stats == null){
      // No stats, no problems!
      return true;
    }
    if(atr.stats.getEffect(STATS.Effect.Names.Sprinting, STATS.Effect.Sources.Body)){
      // You're already sprinting.
      return false;
    }
    let energy = atr.stats.getResourceValue(STATS.Resources.energy);
    if(energy > 0){
      // You can afford to sprint
      return true;
    }
    // You can't afford it
    return false;
  };
  // Call this each frame before moving
  atr.sprint = function(){
    if(!atr.canSprint()){
      return;
    }
    let cost = STATS.Effect.SprintCost();
    let buff = STATS.Effect.SprintBuff();
    atr.stats.addEffect(cost);
    atr.stats.addEffect(buff);
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
      cl.parent.onInteract(UTILITY.Interaction.new(atr));
    }
  };
  atr.interactAtPoint = function(point){
    let halfSize = atr.size/2;
    let rect = SHAPES.RECT.new(VECTOR2.new(0,0), VECTOR2.new(halfSize, halfSize));
    rect.recenter(point);

    let colliders = atr.collider.controller.rectHitScan([atr.getEntityId()], rect);
    for(let cl of colliders){
      cl.parent.onInteract(UTILITY.Interaction.new(atr));
    }
  };
  atr.onCollide = function(collision){};
  atr.onAttacked = function(attackData){
    if(atr.stats){
      if(atr.stats.damageCooldown == null || atr.stats.damageCooldown < Date.now()){
        atr.stats.damageCooldown = Date.now() + SETTINGS.damageCooldown;
      }
      else{
        //console.log("Ignoring attack until cooldown finishes");
        return;
      }
      let health = atr.stats.getStat(STATS.Resources.health);
      let prevHealth = health.value;
      health.change(attackData.damage);
      atr.damageLabel = attackData.damage + "";
      atr.damageLabelFrames = 12;
      //console.log(atr.name + " attacked for " + attackData.damage + " and now has " + atr.stats.health.value + " health.");
      if(health.value < 1){
        atr.die();
      }
      if(attackData.knockback > 0){
        //console.log("Being knocked back in direction" + attackData.direction);
        atr.onKnockback(attackData.direction, attackData.knockback);
      }
    }
  };
  atr.onInteract = function(interaction){};
  atr.cursorInRange = function(){
    let pos = GRAPHICS.getWorldCursor();
    let actorPos = atr.centeredPosition();
    let distance = pos.distance(actorPos);
    return distance < SETTINGS.interactionRange;
  };
  atr.pickUp = function(_item){
    let item = _item.clone();
    item.quantity = atr.hotbar.pickUp(item);
    if(item.quantity > 0){
      item.quantity = atr.inventory.pickUp(item);
    }
    return item.quantity;
  };
  atr.toString = function(){
    let str = "[";
    str += "ID: " + atr.entityId;
    str += ", pos: " + atr.position.toString();
    str += "]";
    return str;
  }
  return atr;
};