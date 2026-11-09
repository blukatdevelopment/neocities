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
  atk.damage = 1;
  atk.damageDice = [];
  atk.frames = 3;
  atk.damageFrames = [1];
  atk.cost = 1;
  return atk;
};


STATS.AttackFactory.Knife = function(){
  let atk = STATS.Attack.new();
  atk.upAnimation = ACTOR_ANIMATIONS.meleeUp;
  atk.downAnimation = ACTOR_ANIMATIONS.meleeDown;
  atk.rightAnimation = ACTOR_ANIMATIONS.meleeRight;
  atk.leftAnimation = ACTOR_ANIMATIONS.meleeLeft;
  atk.damage = 0;
  atk.damageDice = [
    RANDOM.D6()
  ];
  atk.frames = 3;
  atk.damageFrames = [1];
  atk.cost = 1;
  return atk;
};


STATS.AttackFactory.Axe = function(){
  let atk = STATS.Attack.new();
  atk.upAnimation = ACTOR_ANIMATIONS.meleeUp;
  atk.downAnimation = ACTOR_ANIMATIONS.meleeDown;
  atk.rightAnimation = ACTOR_ANIMATIONS.meleeRight;
  atk.leftAnimation = ACTOR_ANIMATIONS.meleeLeft;
  atk.damage = 24;
  atk.damageDice = [];
  atk.frames = 3;
  atk.damageFrames = [1];
  atk.cost = 3;
  return atk;
};

STATS.AttackFactory.Spear = function(){
  let atk = STATS.Attack.new();
  atk.upAnimation = ACTOR_ANIMATIONS.meleeUp;
  atk.downAnimation = ACTOR_ANIMATIONS.meleeDown;
  atk.rightAnimation = ACTOR_ANIMATIONS.meleeRight;
  atk.leftAnimation = ACTOR_ANIMATIONS.meleeLeft;
  atk.damage = 12;
  atk.damageDice = [
    RANDOM.D3()
  ];
  atk.frames = 3;
  atk.damageFrames = [1];
  atk.cost = 2;
  return atk;
};

STATS.AttackFactory.Sword = function(){
  let atk = STATS.Attack.new();
  atk.upAnimation = ACTOR_ANIMATIONS.meleeUp;
  atk.downAnimation = ACTOR_ANIMATIONS.meleeDown;
  atk.rightAnimation = ACTOR_ANIMATIONS.meleeRight;
  atk.leftAnimation = ACTOR_ANIMATIONS.meleeLeft;
  atk.damage = 12;
  atk.damageDice = [
    RANDOM.D3()
  ];
  atk.frames = 3;
  atk.damageFrames = [1];
  atk.cost = 2;
  return atk;
};