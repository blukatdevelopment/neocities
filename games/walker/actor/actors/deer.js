ACTOR.Names.Deer = "Deer";
ACTORFACTORY.Deer = function(){
  let config = UTILITY.getActorConfig("deer");
  let se = ACTOR.new();
  se.entityType = ENTITY.TYPES.NPC;
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
  se.name = ACTOR.Names.Deer;
  se.label = se.name;

  se.attacks.push(STATS.AttackFactory.Unarmed());
  se.activeAttack = se.attacks[0];

  // Deal damage and knock target away
  se.stats = STATS.StatsController.new();
  se.stats.setAttributeValue(STATS.Attributes.healthMax, 3);
  se.stats.setAttributeValue(STATS.Attributes.speed, 1.5);

  let lootTable = ITEMS.LootTable.new();
  lootTable.addItem(ITEMS.getByName(ITEMS.Names.Leather), 2, 1);
  lootTable.addItem(ITEMS.getByName(ITEMS.Names.Venison), 1, 5);
  se.lootTable = lootTable;
  return se;
};