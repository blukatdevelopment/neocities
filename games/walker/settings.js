/*##############################################################################
# Settings, configuration, and constants
##############################################################################*/
var SETTINGS = {};

SETTINGS.logLevel = 0;
SETTINGS.devMode = true;
SETTINGS.devUrl = "file:///home/blukat/localdev/neocities/games/walker/";
SETTINGS.prodUrl = "https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/";
SETTINGS.assetsDirectory = "assets/";
SETTINGS.defaultPlayerActor = "wrath";

SETTINGS.fps = 60;
SETTINGS.frameDuration = 1000 / SETTINGS.fps;


// Assumes A 2.5 dimensional world
DIRECTIONS = {};
DIRECTIONS.north = 0;
DIRECTIONS.south = 1;
DIRECTIONS.west = 2;
DIRECTIONS.east = 3;
DIRECTIONS.up = 4;
DIRECTIONS.down = 5;

// Graphics
SETTINGS.viewportMin = 0;
SETTINGS.viewportMax = 400;
// The viewport is upscaled to the screen resolution
SETTINGS.canvasMin = 0;
SETTINGS.canvasMax = 800;
SETTINGS.drawScale = SETTINGS.canvasMax / SETTINGS.viewPortMax;


// Animation config
SETTINGS.animationFrameRate = 12;
SETTINGS.animationFrameDuration = 1000 / SETTINGS.animationFrameRate;
SETTINGS.actorAnimationsList = [
	"idleUp", "idleDown", "idleLeft", "idleRight",
	"walkUp", "walkDown", "walkLeft", "walkRight",
	"attackUp", "attackDown", "attackLeft", "attackRight",
	"jumpUp", "jumpDown", "jumpLeft", "jumpRight",
	"death", "deathIdle"
];

SETTINGS.animations = {};

let ACTOR_ANIMATIONS = {};

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
		[ ACTOR_ANIMATIONS.walkLeft, 10, 11]
	]
});

// Sprite config
SETTINGS.sheets = {};
SETTINGS.sheets.actors = {};

// Init
SETTINGS.init = function(){
	SETTINGS.baseUrl = SETTINGS.devMode ? SETTINGS.devUrl : SETTINGS.prodUrl;
	SETTINGS.assetsUrl = SETTINGS.baseUrl + SETTINGS.assetsDirectory;

	for(let i in SETTINGS.actorAnimationsList){
		let animation = SETTINGS.actorAnimationsList;
		ACTOR_ANIMATIONS[animation] = animation;
	}
	for(let actor of SETTINGS.actorList){
		SPRITES.loadActorSprites(actor);
	}
}



