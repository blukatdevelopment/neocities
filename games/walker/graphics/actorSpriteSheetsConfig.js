SETTINGS.animations = {};

let ACTOR_ANIMATIONS = {};
ACTOR_ANIMATIONS.idleUp = "idleUp";
ACTOR_ANIMATIONS.idleDown = "idleDown";
ACTOR_ANIMATIONS.idleLeft = "idleLeft";
ACTOR_ANIMATIONS.idleRight = "idleRight";
ACTOR_ANIMATIONS.walkUp = "walkUp";
ACTOR_ANIMATIONS.walkDown = "walkDown";
ACTOR_ANIMATIONS.walkLeft = "walkLeft";
ACTOR_ANIMATIONS.walkRight = "walkRight";
ACTOR_ANIMATIONS.meleeUp = "meleeUp";
ACTOR_ANIMATIONS.meleeDown = "meleeDown";
ACTOR_ANIMATIONS.meleeRight = "meleeRight";
ACTOR_ANIMATIONS.meleeLeft = "meleeLeft";

SETTINGS.actorList = [];
SETTINGS.actorList.push({
    name: "wrath",
    sheet: "wrath_sprites.png",
    resolutionX: 32,
    resolutionY: 32,
    cells: 12,
    animations: [
        [ ACTOR_ANIMATIONS.idleUp, 0, 0],
        [ ACTOR_ANIMATIONS.idleDown, 1, 1],
        [ ACTOR_ANIMATIONS.idleRight, 2, 2],
        [ ACTOR_ANIMATIONS.idleLeft, 3, 3],
        [ ACTOR_ANIMATIONS.walkUp, 4, 5],
        [ ACTOR_ANIMATIONS.walkDown, 6, 7],
        [ ACTOR_ANIMATIONS.walkRight, 8, 9],
        [ ACTOR_ANIMATIONS.walkLeft, 10, 11],
        [ ACTOR_ANIMATIONS.meleeUp, 12, 14],
        [ ACTOR_ANIMATIONS.meleeDown, 15, 17],
        [ ACTOR_ANIMATIONS.meleeRight, 18, 20],
        [ ACTOR_ANIMATIONS.meleeLeft, 21, 23]
    ]
});

SETTINGS.actorList.push({
    name: "slime",
    sheet: "slime.png",
    resolutionX: 32,
    resolutionY: 32,
    cells: 2,
    animations: [
        [ ACTOR_ANIMATIONS.idleUp, 0, 1],
        [ ACTOR_ANIMATIONS.idleDown, 0, 1],
        [ ACTOR_ANIMATIONS.idleRight, 0, 1],
        [ ACTOR_ANIMATIONS.idleLeft, 0, 1],
        [ ACTOR_ANIMATIONS.walkUp, 0, 1],
        [ ACTOR_ANIMATIONS.walkDown, 0, 1],
        [ ACTOR_ANIMATIONS.walkRight, 0, 1],
        [ ACTOR_ANIMATIONS.walkLeft, 0, 1],
        [ ACTOR_ANIMATIONS.meleeUp, 0, 1],
        [ ACTOR_ANIMATIONS.meleeDown, 0, 1],
        [ ACTOR_ANIMATIONS.meleeRight, 0, 1],
        [ ACTOR_ANIMATIONS.meleeLeft, 0, 1]
    ]
});