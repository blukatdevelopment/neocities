// A change to the modifier of a static stat
STATS.Effect.AttributeEffect.new = function(name, source, attribute, modifier, duration){
  let se = {
    effectType: STATS.Effect.Types.Attribute,
    name: name,
    source: source,
    attribute: attribute,
    modifier: modifier,
    duration: duration,
    expiration: null,
  };
  return se;
};