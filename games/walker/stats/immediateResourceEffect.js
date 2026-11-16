
// An immediate change to a resource
STATS.Effect.ResourceChangeEffect = {};
STATS.Effect.ResourceChangeEffect.new = function(name, source, resource, delta){
  let se = {
    effectType: STATS.Effect.Types.ResourceChange,
    name: name,
    source: source,
    resource: resource,
    delta: delta,
    interval: null,
    duration: null,
    expiration: null,
    lastApplied: null,
    blockedByEffect: null
  };
  return se;
};