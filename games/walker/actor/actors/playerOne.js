ACTORFACTORY.playerOne = function(){
  let config = UTILITY.getActorConfig("wrath");
  let pone = ACTOR.new();
  pone.entityYype = ENTITY.TYPES.Player;
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
  pone.name = "Wrath";

  pone.attacks.push(ACTOR.AttackFactory.UNARMED());
  pone.activeAttack = pone.attacks[0];

  pone.stats = STATS.StatsController.new();
  pone.stats.getStat(STATS.Resources.health).updateMax(10);
  pone.stats.getStat(STATS.Resources.energy).updateMax(10);
  pone.stats.addEffect(STATS.Effect.EnergyRegen(2000, STATS.Resources.energy, STATS.Effect.Sources.Body));
  return pone;
};