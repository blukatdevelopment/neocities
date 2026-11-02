/*##############################################################################
# Stats Configs
##############################################################################*/
STATS.Attributes = {};
STATS.Attributes.speed = "Speed";
STATS.Attributes.healthMax = "healthMax";
STATS.Attributes.energyMax = "energyMax";
STATS.Attributes.magicMax = "magicMax";


STATS.Resources = {};
STATS.Resources.health = "Health";
STATS.Resources.energy = "Energy";
STATS.Resources.magic = "Magic";


STATS.Effect.Types = {};
STATS.Effect.Types.Attribute = "Attribute";
STATS.Effect.Types.Resource = "Resource";
STATS.Effect.Types.ResourceMax = "ResourceMax";

STATS.Effect.Names = {};
STATS.Effect.Names.SprintCost = "SprintCost";
STATS.Effect.Names.SprintBuff = "SprintBuff";
STATS.Effect.Names.Regen = "Regen";
STATS.Effect.Names.HealthMax = "HealthMax";
STATS.Effect.Names.EnergyMax = "EnergyMax";
STATS.Effect.Names.MagicMax = "MagicMax";

STATS.Effect.Sources = {};
STATS.Effect.Sources.Body = "Body";

STATS.getDefaultAttributes = function(){
  let attributes = {};
  attributes[STATS.Attributes.speed] = STATS.Attribute.new(STATS.Attributes.speed, 5);
  attributes[STATS.Attributes.healthMax] = STATS.Attribute.new(STATS.Attributes.healthMax, 10);
  attributes[STATS.Attributes.energyMax] = STATS.Attribute.new(STATS.Attributes.energyMax, 10);
  attributes[STATS.Attributes.magicMax] = STATS.Attribute.new(STATS.Attributes.magicMax, 0);
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
    5, // modifier
    1000 // Duration
  );
};

STATS.Effect.HealthMax = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.HealthMax, // name
    source, // Source
    STATS.Attributes.healthMax, // attribute
    amount, // modifier
    duration // Duration
  );
};

STATS.Effect.EnergyMax = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.EnergyMax, // name
    source, // Source
    STATS.Attributes.energyMax, // attribute
    amount, // modifier
    duration // Duration
  );
};

STATS.Effect.MagicMax = function(amount, duration, source){
  return STATS.Effect.AttributeEffect.new(
    STATS.Effect.Names.MagicMax, // name
    source, // Source
    STATS.Attributes.magicMax, // attribute
    amount, // modifier
    duration // Duration
  );
};



STATS.Effect.SprintCost = function(){
  return STATS.Effect.ResourceEffect.new(
      STATS.Effect.Names.SprintCost, // Name
      STATS.Effect.Sources.Body, // Source
      STATS.Resources.energy, // Resource
      -1, // Delta
      1000, // Interval
      1000 // Duration
    );
};


STATS.Effect.EnergyRegen = function(interval, resource, source){
  let regen = STATS.Effect.ResourceEffect.new(
      STATS.Effect.Names.Regen, // Name
      source, // Source
      resource, // Resource
      1, // Delta
      interval, // Interval
      null // Duration
    );
  regen.blockedByEffect = STATS.Effect.Names.SprintCost;
  return regen;
};