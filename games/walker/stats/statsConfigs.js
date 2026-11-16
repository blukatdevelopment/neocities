/*##############################################################################
# Stats Configs
##############################################################################*/
STATS.Attributes = {};
STATS.Attributes.speed = "Speed";
STATS.Attributes.healthMax = "healthMax";
STATS.Attributes.energyMax = "energyMax";
STATS.Attributes.magicMax = "magicMax";
STATS.Attributes.armorValue = "armorValue";
STATS.Attributes.lightRadius = "lightRadius";


STATS.Resources = {};
STATS.Resources.health = "Health";
STATS.Resources.energy = "Energy";
STATS.Resources.magic = "Magic";


STATS.Effect.Types = {};
STATS.Effect.Types.Attribute = "Attribute";
STATS.Effect.Types.Resource = "Resource";
STATS.Effect.Types.ResourceMax = "ResourceMax";
STATS.Effect.Types.ResourceChange = "ResourceChange";

STATS.Effect.Names = {};
STATS.Effect.Names.SprintBuff = "SprintBuff";
STATS.Effect.Names.Regen = "Regen";
STATS.Effect.Names.HealthMax = "HealthMax";
STATS.Effect.Names.EnergyMax = "EnergyMax";
STATS.Effect.Names.MagicMax = "MagicMax";
STATS.Effect.Names.Armor = "Armor";
STATS.Effect.Names.Torch = "Torch";
STATS.Effect.Names.HealthGain = "HealthGain";
STATS.Effect.Names.EnergyGain = "EnergyGain";
STATS.Effect.Names.MagicGain = "MagicGain";

STATS.Effect.Sources = {};
STATS.Effect.Sources.Body = "Body";

STATS.getDefaultAttributes = function(){
  let attributes = {};
  attributes[STATS.Attributes.speed] = STATS.Attribute.new(STATS.Attributes.speed, 5);
  attributes[STATS.Attributes.healthMax] = STATS.Attribute.new(STATS.Attributes.healthMax, 10);
  attributes[STATS.Attributes.energyMax] = STATS.Attribute.new(STATS.Attributes.energyMax, 10);
  attributes[STATS.Attributes.magicMax] = STATS.Attribute.new(STATS.Attributes.magicMax, 0);
  attributes[STATS.Attributes.armorValue] = STATS.Attribute.new(STATS.Attributes.armorValue, 0);
  attributes[STATS.Attributes.lightRadius] = STATS.Attribute.new(STATS.Attributes.lightRadius, 0);
  return attributes;
};


STATS.getDefaultResources = function(){
  let resources = {};
  
  resources[STATS.Resources.health] = STATS.Resource.new(
    STATS.Resources.health, // name
    10,
    STATS.Attributes.healthMax,  // defaultmax
    GRAPHICS.Colors.Red, // color
   GRAPHICS.Colors.Red50); // transparent color
  
  resources[STATS.Resources.energy] = STATS.Resource.new(
    STATS.Resources.energy, // name
    10,
    STATS.Attributes.energyMax,  // defaultmax
    GRAPHICS.Colors.Green, // color
   GRAPHICS.Colors.Green50); // transparent color
  
  resources[STATS.Resources.magic] = STATS.Resource.new(
    STATS.Resources.magic, // name
    0,
    STATS.Attributes.magicMax,  // defaultmax
    GRAPHICS.Colors.Blue, // color
   GRAPHICS.Colors.Blue50); // transparent color
  
  return resources;
};

STATS.Effect.SprintBuff = function(){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.SprintBuff, // name
    STATS.Effect.Sources.Body, // Source
    STATS.Attributes.speed, // attribute
    3, // modifier
    1000 // Duration
  );
};

STATS.Effect.HealthGain = function(amount, source){
  return STATS.Effect.ResourceChangeEffect.new(
    STATS.Effect.Names.HealthGain, // Name
    source, // Source
    STATS.Resources.health, // resource
    amount
  );
};

STATS.Effect.EnergyGain = function(amount, source){
  return STATS.Effect.ResourceChangeEffect.new(
    STATS.Effect.Names.EnergyGain, // Name
    source, // Source
    STATS.Resources.energy, // resource
    amount
  );
};

STATS.Effect.MagicGain = function(amount, source){
  return STATS.Effect.ResourceChangeEffect.new(
    STATS.Effect.Names.MagicGain, // Name
    source, // Source
    STATS.Resources.magic, // resource
    amount
  );
};

STATS.Effect.foodEffects = function(duration, source, health, energy, magic){
  let effects = [];
  let src = SETTINGS.foodPrefix + source;
  if(health != 0){
    effects.push(STATS.Effect.MaxHealthBuff(health * SETTINGS.PiecesPerHeart, duration, src));
    effects.push(STATS.Effect.HealthGain(health * SETTINGS.PiecesPerHeart, src));
  }
  if(energy != 0){
    effects.push(STATS.Effect.MaxEnergyBuff(energy, duration, src));
    effects.push(STATS.Effect.EnergyGain(energy, src));
  }
  if(magic != 0){
    effects.push(STATS.Effect.MaxMagicBuff(magic, duration, src));
    effects.push(STATS.Effect.MagicGain(magic, src));
  }
  return effects;
};

STATS.Effect.MaxHealthBuff = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.HealthMax, // name
    source, // Source
    STATS.Attributes.healthMax, // attribute
    amount, // modifier
    duration // Duration
  );
};

STATS.Effect.MaxEnergyBuff = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.EnergyMax, // name
    source, // Source
    STATS.Attributes.energyMax, // attribute
    amount, // modifier
    duration // Duration
  );
};

STATS.Effect.MaxMagicBuff = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.MagicMax, // name
    source, // Source
    STATS.Attributes.magicMax, // attribute
    amount, // modifier
    duration // Duration
  );
};

STATS.Effect.Armor = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.Armor, // name
    source, // Source
    STATS.Attributes.armorValue, // attribute
    amount, // modifier
    duration // Duration
  );
};

STATS.Effect.Regen = function(interval, resource, source){
  let regen = STATS.Effect.ResourceEffect.new(
      resource + STATS.Effect.Names.Regen, // Name
      source, // Source
      resource, // Resource
      1, // Delta
      interval, // Interval
      null // Duration
    );
  regen.blockedByEffect = STATS.Effect.Names.SprintCost;
  return regen;
};

STATS.Effect.Torch = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.Torch, // name
    source, // Source
    STATS.Attributes.lightRadius, // attribute
    amount, // modifier
    duration // Duration
  );
};