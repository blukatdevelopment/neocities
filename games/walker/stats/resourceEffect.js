
// A change over time applied to a status, such as regen or drain.
STATS.Effect.ResourceEffect = {};
STATS.Effect.ResourceEffect.new = function(name, source, resource, delta, interval, duration){
  let se = {
    effectType: STATS.Effect.Types.Resource,
    name: name,
    source: source,
    resource: resource,
    delta: delta,
    interval: interval,
    duration: duration,
    expiration: null,
    lastApplied: null,
    blockedByEffect: null
  };
  return se;
};