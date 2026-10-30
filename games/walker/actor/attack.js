/*##############################################################################
# Record representing one attack an actor can perform
##############################################################################*/
ACTOR.Attack = {};
ACTOR.Attack.new = function(){
  let atk = {
    upAnimation: null,
    downAnimation: null,
    leftAnimation: null,
    rightAnimation: null,
    damage: null,
    frames: null,
    damageFrames: []
  };
  return atk;
};