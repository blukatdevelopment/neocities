ACTOR.Names.PlayerOne = "PlayerOne";
ACTORFACTORY.PlayerOne = function(){
  let config = UTILITY.getActorConfig("wrath");
  let pone = ACTOR.new();
  pone.entitytype = ENTITY.TYPES.Player;
  let anm = SPRITES.Animator.new();
  anm.animation = SPRITES.animations[config.name][ACTOR_ANIMATIONS.idleLeft]
  let asm = ACTOR.AnimationStateMachine.new(name, SPRITES.animations[config.name], anm);
  asm.linkToActor(pone);
  pone.stateMachine = asm;
  let agent = AGENT.PLAYER_ONE.new(pone);
  pone.agent = agent;
  pone.animator = anm;
  pone.lockCamera = true;
  pone.setCollider(PHYSICS.BoxCollider.new());
  pone.getCollider().rect.position = VECTOR2.new(13, 0);
  pone.getCollider().rect.size = VECTOR2.new(11, 32);
  pone.name = ACTOR.Names.PlayerOne;

  pone.attacks.push(STATS.AttackFactory.Unarmed());
  pone.activeAttack = pone.attacks[0];

  pone.stats = STATS.StatsController.new();
  pone.stats.setAttributeValue(STATS.Attributes.healthMax, 40);
  pone.stats.setAttributeValue(STATS.Attributes.energyMax, 10);
  pone.stats.setAttributeValue(STATS.Attributes.magicMax, 0);
  pone.stats.fullRestore();
  pone.stats.addEffect(STATS.Effect.EnergyRegen(2000, STATS.Resources.energy, STATS.Effect.Sources.Body));
  return pone;
};

ENTITY.ENTITIES.PlayerOne = ACTORFACTORY.PlayerOne;
ENTITYFACTORY.PlayerOne = ACTORFACTORY.PlayerOne;