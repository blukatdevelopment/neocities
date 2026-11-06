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
  atr.paperdoll = ITEMS.EquipInventory.new(9, atr);
  atr.damageLabel = null;
  atr.damageLabelFrames = 0;
  atr.itemsDrawn = false;
  atr.lootTable = false;
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
  atr.destroyItem = function(item){
    atr.hotbar.removeItem(item);
    atr.inventory.removeItem(item);
  };
  atr.draw = function(){
    if(!GRAPHICS.isOnScreen(atr.getSpriteRect())){
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
  atr.toggleItemsDrawn = function(){
    if(atr.itemsDrawn){
      atr.itemsDrawn = false;
      UTILITY.notification("Items are now stashed");
    }
    else{
      let handItem = atr.paperdoll.slots[GEAR.slotIndices.hand];
      let offHandItem = atr.paperdoll.slots[GEAR.slotIndices.offHand];
      // Only draw your items if you have items to draw    
      if(handItem || offHandItem){
        atr.itemsDrawn = true;
        UTILITY.notification("Items are now drawn");  
      }
      
    }
  };
  // Left click
  atr.primaryAction = function(){
    let inRange = atr.cursorInRange();
    if(atr.itemsDrawn){
      atr.useHandItem();
    }
    else{
      // Melee Attack
      atr.attack(atr.activeAttack);
    }
  };
  // Right click
  atr.secondaryAction = function(){
    let inRange = atr.cursorInRange();
    if(atr.itemsDrawn){
      atr.useOffhandItem();
    }
    else if(inRange){
        let point = INPUT.getMousePosition();
        point.x = GRAPHICS.downScale(point.x);
        point.y = GRAPHICS.downScale(point.y);
        let worldPoint = GRAPHICS.getWorldPoint(point);
        atr.interactAtPoint(worldPoint);
    }
  };
  atr.useHandItem = function(){
    let handItem = atr.paperdoll.slots[GEAR.slotIndices.hand];
    if(handItem){
      handItem.primaryUse(handItem, atr);
    }
  };
  atr.useOffhandItem = function(){
    let handItem = atr.paperdoll.slots[GEAR.slotIndices.hand];
    let offHandItem = atr.paperdoll.slots[GEAR.slotIndices.offHand];
    if(handItem == null && offHandItem == null){
      return; // Nothing to do
    }
    if(offHandItem == null){
      handItem.secondaryUse(handItem, atr);
    }
    else{
      offHandItem.primaryUse(offHandItem, atr);
    }
  };
  atr.attack = function(attack){
    if(!atr.cooldown){
      return;
    }
    let atk = attack;

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
    let attackData = STATS.AttackData.new(atr.direction, atk.getDamage(), atr, { knockback: 10 });
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
    if(atr.stats == null){
      return;
    }

    if(atr.stats.damageCooldown == null || atr.stats.damageCooldown < Date.now()){
      atr.stats.damageCooldown = Date.now() + SETTINGS.damageCooldown;
    }
    else{
      //console.log("Ignoring attack until cooldown finishes");
      return;
    }
    let damageDealt = atr.stats.receiveAttack(attackData);
    
    atr.damageLabel = UTILITY.formatDamage(damageDealt);
    atr.damageLabelFrames = 12;

    let health = atr.stats.getStat(STATS.Resources.health);
    if(health.value < 1){
      atr.die();
    }
    if(attackData.knockback > 0){
      //console.log("Being knocked back in direction" + attackData.direction);
      atr.onKnockback(attackData.direction, attackData.knockback);
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
    let quantityLeft = _item.quantity;
    let item = _item.clone();
    //console.log("stashing " + item.quantity + " into hotbar");
    quantityLeft = atr.hotbar.pickUp(item);

    if(quantityLeft > 0){
      item = _item.clone();
      item.quantity = quantityLeft;
      quantityLeft = atr.inventory.pickUp(item);

    }
    return quantityLeft;
  };
  atr.useItem = function(){
    let item = atr.hotbar.getActiveItem();
    if(item == null){
      return;
    }
    item.use(atr);
  };
  atr.eat = function(item){
    if(!atr.canEat(item)){
      return;
    }
    atr.stats.addEffects(item.effects);
  }
  atr.canEat = function(item){
    if(item.type != ITEMS.Types.Food){
      return false;
    }
    if(atr.getActiveFoods().length > 2){
      UTILITY.notification("You're full.");
      return false;
    }
    for(let food of atr.getActiveFoods()){
      if(food.name == item.name){
        UTILITY.notification("You can't eat more of that food right now.");
        return false;
      }
    }
    return true;
  };
  atr.getActiveFoods = function(){
    return atr.stats.getActiveFoods();
  };
  atr.getSpriteRect = function(){
    return SHAPES.RECT.new(
      atr.position,
      atr.animator.getSize()
    );
  };
  atr.toString = function(){
    let str = "[";
    str += "ID: " + atr.entityId;
    str += ", pos: " + atr.position.toString();
    str += "]";
    return str;
  }
  atr.equip = function(item, slot){
    if(item == null){
      return;
    }
    UTILITY.notification("Equipped " + item.name);
    if(item.effects){
      atr.stats.addEffects(item.effects);  
    }
    if(slot == GEAR.slotIndices.hand || slot == GEAR.slotIndices.offHand){
      if(!atr.itemsDrawn){
        // Draw your item on equip
        atr.toggleItemsDrawn();
      }
    }
  };
  atr.unequip = function(item){
    if(item == null){
      return;
    }
    UTILITY.notification("Unequipped " + item.name);
    if(item.effects == null){
      return;
    }
    for(let effect of item.effects){
      atr.stats.removeEffect(effect.name, effect.source);
    }
    let handItem = atr.paperdoll.slots[GEAR.slotIndices.hand];
    let offHandItem = atr.paperdoll.slots[GEAR.slotIndices.offHand];  
    // If you have no items, you have nothing to have drawn
    if(atr.itemsDrawn && handItem == null && offHandItem == null){
      atr.toggleItemsDrawn();
    }
  };
  atr.canStoreItem = function(item){
    let spaceNeeded = item.quantity;
    let spaceAvailable = 0;
    spaceAvailable += atr.hotbar.getAvailableSpaceForItem(item);
    spaceAvailable += atr.inventory.getAvailableSpaceForItem(item);
    return spaceNeeded <= spaceAvailable;
  };
  atr.canCraft = function(recipe){
    for(let ingredient of recipe.ingredients){
      if(ingredient.quantity > atr.queryItemQuantity(ingredient.itemName)){
        UTILITY.notification("Recipe requires more " + ingredient.itemName);
        return false;
      }
    }
    let product = ITEMS.getByName(recipe.product.itemName);
    product.quantity = recipe.product.quantity;
    if(!atr.canStoreItem(product)){
      UTILITY.notification("Nowhere to put " + recipe.product.itemName);
      return false;
    }
    return true;
  };
  atr.craft = function(recipe){
    if(!atr.canCraft(recipe)){
      return;
    }
    for(let ingredient of recipe.ingredients){
      atr.removeItemQuantity(ingredient.itemName, ingredient.quantity);
    }
    let product = ITEMS.getByName(recipe.product.itemName);
    product.quantity = recipe.product.quantity;
    atr.pickUp(product);
    let text = "Crafted " + product.name;
    if(product.quantity > 1){
      text += "(" + product.quantity + ")";
    }
    UTILITY.notification(text);
  };
  atr.queryItemQuantity = function(itemName){
    let quantity = 0;
    quantity += atr.inventory.queryItemQuantity(itemName);
    quantity += atr.hotbar.queryItemQuantity(itemName);
    return quantity;
  };
  atr.removeItemQuantity = function(itemName, quantity){
    let quantityLeft = quantity;
    quantityLeft = atr.inventory.removeItemQuantity(itemName, quantityLeft);
    quantityLeft = atr.hotbar.removeItemQuantity(itemName, quantityLeft);
  };
  atr.die = function(){
    console.log("Dead!");
    if(atr.lootTable){
      let loot = atr.lootTable.getLoot();
      for(let item of loot){
        atr.dropItem(item);
      }
    }
    SCENE.destroyEntity(atr);
  };
  atr.dropItem = function(item){
    // Create an item stack within short range of body
    console.log("Dropping item "+ item.toString());

    let itemStack = ENTITY.ItemStack.new(item);
    let position = atr.position.clone();
    let drift = 32;
    position.x += UTILITY.randRange(-drift, drift);
    position.y += UTILITY.randRange(-drift, drift);
    itemStack.position = position;
    SCENE.createEntity(itemStack);
  };
  return atr;
};