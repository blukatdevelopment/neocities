STATS.StatsController = {};
STATS.StatsController.new = function(){
  let stc = {
    attributes: STATS.getDefaultAttributes(),
    resources: STATS.getDefaultResources(),
    effects: []
  };
  stc.resources[STATS.Resources.health].controller = stc;
  stc.resources[STATS.Resources.energy].controller = stc;
  stc.resources[STATS.Resources.magic].controller = stc;
  stc.getStat = function(name){
    if(stc.attributes[name]){
      return stc.attributes[name];
    }
    if(stc.resources[name]){
      return stc.resources[name];
    }
    return null;
  };
  stc.getResourceValue = function(resource){
    if(stc.resources[resource]){
      return stc.resources[resource].value;
    }
  };
  stc.changeResource = function(resource, delta){
    if(stc.resources[resource]){
      stc.resources[resource].change(delta);
    }    
  };
  stc.getAttribute = function(attribute){
    if(stc.attributes[attribute]){
      let atr = stc.attributes[attribute];
      return atr.value + atr.modifier;
    }
  };
  stc.setAttributeValue = function(attribute, newValue){
    if(stc.attributes[attribute]){
      stc.attributes[attribute].value = newValue;
    }
  };
  stc.changeAttributeModifier = function(attribute, modifier){
    if(stc.attributes[attribute]){
      let prev = stc.attributes[attribute].modifier;
      stc.attributes[attribute].modifier += modifier;      
    }
  };
  stc.getEffect = function(name, source){
    for(let effect of stc.effects){
      if(effect.name === name && effect.source === source){
        return effect;
      }
    }
    return null;
  };
  stc.addEffects = function(effects){
    if(effects == null){
      return;
    }
    for(let _effect of effects){
      stc.addEffect(_effect);
    }
  };
  stc.addEffect = function(_effect){
    if(_effect == null){
      return;
    }
    if(_effect.duration){
      _effect.expiration = _effect.duration + Date.now();
    }
    // Re-adding the same effect just updates it
    let existing = null;
    for(let effect of stc.effects){
      if(effect.name === _effect.name && effect.source === _effect.source){
        existing = effect;
      }
    }
    if(existing){
      existing = _effect;
      return;
    }
    if(_effect.effectType === STATS.Effect.Types.Attribute){
      // Apply the attribute
      stc.changeAttributeModifier(_effect.attribute, _effect.modifier);
    }
    stc.effects.push(_effect);
  };
  stc.removeEffect = function(name, source){
    let effect = stc.getEffect(name, source);
    stc.effects = stc.effects.filter((ef) => !(ef.name === name && ef.source === source));
    if(effect.effectType === STATS.Effect.Types.Attribute){
      let inverseDelta = effect.modifier * -1;
      stc.changeAttributeModifier(effect.attribute, inverseDelta);
    }
    stc.resources[STATS.Resources.health].update();
    stc.resources[STATS.Resources.energy].update();
    stc.resources[STATS.Resources.magic].update();
  };
  stc.update = function(){
    stc.updateEffects();
  };
  stc.updateEffects = function(){
    for(let effect of stc.effects){
      if(effect.effectType === STATS.Effect.Types.Resource){
        stc.updateResourceEffect(effect);
      }
      if(effect.effectType === STATS.Effect.Types.Attribute){
        stc.updateAttributeEffect(effect);
      }
    }
  };
  stc.isBlockerPresent = function(effectName){
    for(let effect of stc.effects){
      if(effectName === effect.name){
        return true;
      }
    }
    return false;
  };
  stc.getActiveFoods = function(){
    let foodEffects = {};
    for(let effect of stc.effects){
      if(effect.source.includes(SETTINGS.foodPrefix)){
        // De-dupes by adding to object this way
        foodEffects[effect.source] = effect;
      }
    }
    let foods = [];
    let now = Date.now();
    for(let source of Object.keys(foodEffects)){
      let effect = foodEffects[source];
      let foodName = source.replace(SETTINGS.foodPrefix, "");
      let foodItem = ITEMS.getByName(foodName);
      let remainingTime = effect.expiration - now;
      let food = STATS.FoodStatus.new(foodName, foodItem.sprite, remainingTime);
      foods.push(food);
    }
    foods.sort((a, b) => {
            if(a.remaining < b.remaining){
                return -1;
            }
            if(a.remaining > b.remaining){
                return 1;
            }
            return 0;
    });
    return foods;
  }
  stc.updateResourceEffect = function(effect){
    // Effects apply their delta only after the interval passes
    if(effect.lastApplied == null){
      effect.lastApplied = Date.now();
      return;
    }
    let now = Date.now();
    if(effect.expiration != null && now > effect.expiration){
      stc.removeEffect(effect.name, effect.source);
    }

    let elapsed = now - effect.lastApplied;
    if(elapsed >= effect.interval){
      effect.lastApplied = Date.now();
      if(effect.blockedByEffect && stc.isBlockerPresent(effect.blockedByEffect)){
        // Effect is blocked. Do not apply changes.
        return;
      }
      stc.changeResource(effect.resource, effect.delta);

      return;
    }
  };
  stc.updateAttributeEffect = function(effect){
    let now = Date.now();
    if(now > effect.expiration){
      stc.removeEffect(effect.name, effect.source);
    }
  };
  stc.fullRestore = function(){
    stc.health.reset();
    stc.energy.reset();
    stc.magic.reset();
  };
  return stc;
};