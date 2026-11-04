/*##############################################################################
# Factory to build attacks
##############################################################################*/
STATS.AttackFactory = {};
STATS.AttackFactory.Unarmed = function(){
  let atk = STATS.Attack.new();
  atk.upAnimation = ACTOR_ANIMATIONS.meleeUp;
  atk.downAnimation = ACTOR_ANIMATIONS.meleeDown;
  atk.rightAnimation = ACTOR_ANIMATIONS.meleeRight;
  atk.leftAnimation = ACTOR_ANIMATIONS.meleeLeft;
  atk.damage = 4;
  atk.frames = 3;
  atk.damageFrames = [1];
  return atk;
};