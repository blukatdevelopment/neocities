/*##############################################################################
# RPG stats logic
##############################################################################*/

let STATS = {};
STATS.Attributes = {};
STATS.Attributes.speed = "Speed";


STATS.Resources = {};
STATS.Resources.health = "Health";
STATS.Resources.energy = "Energy";
STATS.Resources.magic = "Magic";


STATS.Effect = {};
STATS.Effect.Types = {};
STATS.Effect.Types.Attribute = "Attribute";
STATS.Effect.Types.Resource = "Resource";

STATS.Effect.Names = {};
STATS.Effect.Names.SprintCost = "SprintCost";
STATS.Effect.Names.SprintBuff = "SprintBuff";
STATS.Effect.Names.Regen = "Regen";

STATS.Effect.Sources = {};
STATS.Effect.Sources.Body = "Body";

STATS.StatsController = {};
STATS.StatsController.new = function(){
  let stc = {
    attributes: STATS.getDefaultAttributes(),
    resources: STATS.getDefaultResources(),
    effects: []
  };
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
  stc.addEffect = function(_effect){
    if(_effect == null){
      return;
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


STATS.Attribute = {};
STATS.Attribute.new = function(name, value){
  let st = {
    name: name,
    value: value,
    modifier: 0
  };
  st.toString = function(){
    let ret = "Attribute[name: " + st.name;
    ret += ", value: " + st.value;
    ret += ", modifier: " + st.modifier;
    ret += "]";
    return ret;
  };
  return st;
};

STATS.getDefaultAttributes = function(){
  let attributes = {};
  attributes[STATS.Attributes.speed] = STATS.Attribute.new(STATS.Attributes.speed, 5);
  return attributes;
};


STATS.Resource = {};
STATS.Resource.new = function(name, max, color, transparentColor){
  let st = {
    name: name,
    value: max,
    max: max,
    min: 0,
    damageCooldown: null,
    lastChangeTime: null,
    lastChangeDelta: null,
    color: color,
    transparentColor: transparentColor
  };
  st.reset = function(){
    st.value = st.max;
  };
  st.clear = function(){
    st.value = st.min;
  };
  st.change = function(delta){
    if(delta > 0 && st.value == st.max){
      // Already full
      return;
    }
    if(delta < 0 && st.value == st.min){
      // Already empty
      return;
    }
    st.value += delta;
    st.value = UTILITY.clamp(st.value);
    st.lastChangeDelta = delta;
    st.lastChangeTime = Date.now();
  };
  st.updateMax = function(newMax){
    st.max = newMax;
    if(st.value > st.max){
      st.value = st.max;
    }
  };
  st.changeDelta = function(){
    return st.lastChangeDelta;
  };
  st.changeAgeSeconds = function(){
    if(st.lastChangeTime == null){
      return null;
    }
    return Math.trunc(st.changeAgeMilliseconds()/1000);
  };
  st.changeAgeMilliseconds = function(){
    if(st.lastChangeTime == null){
      return null;
    }
    let last = st.lastChangeTime;
    let now = Date.now();
    let elapsed = now - last;
    return elapsed;
  };
  st.toString = function(){
    let ret = "Stat[";
    ret += "name: " + st.name;
    ret += ", value: " + st.value;
    ret += ", max: " + st.max;
    ret += ", min: " + st.min;
    ret += ", damageCooldown: " + st.damageCooldown;
    ret += "]";
    return ret;
  };
  return st;
};

STATS.getDefaultResources = function(){
  let resources = {};
  
  resources[STATS.Resources.health] = STATS.Resource.new(
    STATS.Resources.health, // name
    100,  // defaultmax
    GRAPHICS.Colors.Red, // color
   GRAPHICS.Colors.Red50); // transparent color
  
  resources[STATS.Resources.energy] = STATS.Resource.new(
    STATS.Resources.energy, // name
    100,  // defaultmax
    GRAPHICS.Colors.Green, // color
   GRAPHICS.Colors.Green50); // transparent color
  
  resources[STATS.Resources.magic] = STATS.Resource.new(
    STATS.Resources.magic, // name
    0,  // defaultmax
    GRAPHICS.Colors.Blue, // color
   GRAPHICS.Colors.Blue50); // transparent color
  
  return resources;
};


// A change to the modifier of a static stat
STATS.Effect.AttributeEffect = {};
STATS.Effect.AttributeEffect.new = function(name, source, attribute, modifier, expiration){
  let se = {
    effectType: STATS.Effect.Types.Attribute,
    name: name,
    source: source,
    attribute: attribute,
    modifier: modifier,
    expiration: expiration,
  };
  return se;
};

STATS.Effect.SprintBuff = function(){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.SprintBuff, // name
    STATS.Effect.Sources.Body, // Source
    STATS.Attributes.speed, // attribute
    5, // modifier
    Date.now() + 1000 // Expiration
  );
};

// A change over time applied to a status, such as regen or drain.
STATS.Effect.ResourceEffect = {};
STATS.Effect.ResourceEffect.new = function(name, source, resource, delta, interval, expiration){
  let se = {
    effectType: STATS.Effect.Types.Resource,
    name: name,
    source: source,
    resource: resource,
    delta: delta,
    interval: interval,
    expiration: expiration,
    lastApplied: null,
    blockedByEffect: null
  };
  return se;
};


STATS.Effect.SprintCost = function(){
  return STATS.Effect.ResourceEffect.new(
      STATS.Effect.Names.SprintCost, // Name
      STATS.Effect.Sources.Body, // Source
      STATS.Resources.energy, // Resource
      -1, // Delta
      1000, // Interval
      Date.now() + 1000 // Expiration
    );
};


STATS.Effect.EnergyRegen = function(interval, resource, source){
  let regen = STATS.Effect.ResourceEffect.new(
      STATS.Effect.Names.Regen, // Name
      source, // Source
      resource, // Resource
      1, // Delta
      interval, // Interval
      null // Expiration
    );
  regen.blockedByEffect = STATS.Effect.Names.SprintCost;
  return regen;
};