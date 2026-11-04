/*##############################################################################
# Record representing one attack an actor can perform
##############################################################################*/
STATS.Attack = {};
STATS.Attack.new = function(){
  let atk = {
    upAnimation: null,
    downAnimation: null,
    leftAnimation: null,
    rightAnimation: null,
    damage: null,
    frames: null,
    damageFrames: [],
    damageDice: [],
    cost: null
  };
  atk.getDamage = function(){
    let dmg = 0;
    if(atk.damage != null){
      dmg += atk.damage;
    }
    for(let die of atk.damageDice){
      dmg += die.roll();
    }
    dmg *= -1;
    return dmg;
  };
  return atk;
};