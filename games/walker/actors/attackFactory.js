/*##############################################################################
# Factory to build attacks
##############################################################################*/
ACTOR.AttackFactory = {};
ACTOR.AttackFactory.UNARMED = function(){
  let atk = ACTOR.Attack.new();
  atk.upAnimation = ACTOR_ANIMATIONS.meleeUp;
  atk.downAnimation = ACTOR_ANIMATIONS.meleeDown;
  atk.rightAnimation = ACTOR_ANIMATIONS.meleeRight;
  atk.leftAnimation = ACTOR_ANIMATIONS.meleeLeft;
  atk.damage = 1;
  atk.frames = 3;
  atk.damageFrames = [1];
  return atk;
};