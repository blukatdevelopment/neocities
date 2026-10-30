ACTORFACTORY.slime = function(){
  let config = UTILITY.getActorConfig("slime");
  let se = ACTOR.new();
  se.entityType = ENTITY.TYPES.Enemy;
  let anm = SPRITES.Animator.new();
  anm.animation = SPRITES.animations[config.name][ACTOR_ANIMATIONS.idleLeft]
  let asm = ACTOR.AnimationStateMachine.new(name, SPRITES.animations[config.name], anm);
  asm.linkToActor(se);
  se.stateMachine = asm;
  let agent = AGENT.SIMPLE_ENEMY.new(se);
  se.agent = agent;
  se.animator = anm;
  se.lockCamera = false;

  se.setCollider(PHYSICS.BoxCollider.new());
  se.getCollider().rect.position = VECTOR2.new(13, 0);
  se.getCollider().rect.size = VECTOR2.new(11, 32);
  se.name = "Slime";
  se.label = se.name;

  se.attacks.push(ACTOR.AttackFactory.UNARMED());
  se.activeAttack = se.attacks[0];

  // Deal damage and knock target away
  se.onCollide = function(collision){
    let target = collision.second.parent == se ? collision.first.parent : collision.second.parent;
    if(target == se){
      return;
    }
    let pos = se.centeredPosition();
    let targetPos = target.centeredPosition();
    let dir = pos.x < targetPos.x ? DIRECTIONS.east : DIRECTIONS.west;
    let attackData = ACTOR.AttackData.new(dir, -se.activeAttack.damage, se, { knockback: 10 });
    target.onAttacked(attackData);
  };

  se.stats = STATS.StatsController.new();
  se.stats.getStat(STATS.Resources.health).updateMax(3);
  se.stats.setAttributeValue(STATS.Attributes.speed, 1.5);
  return se;
};