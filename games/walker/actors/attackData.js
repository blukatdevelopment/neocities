/*##############################################################################
# Record consumed by Entity.onAttacked()
##############################################################################*/
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