/*##############################################################################
# Settings, configuration, and constants
##############################################################################*/
var SETTINGS = {};

SETTINGS.logLevel = 0;
SETTINGS.devMode = true;
SETTINGS.devUrl = "file:///home/blukat/localdev/neocities/games/walker/";
SETTINGS.prodUrl = "https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/";
SETTINGS.assetsDirectory = "assets/";

SETTINGS.fps = 60;
SETTINGS.frameDuration = 1000 / SETTINGS.fps;


DIRECTIONS = {};
DIRECTIONS.up = 0;
DIRECTIONS.down = 0;
DIRECTIONS.left = 0;
DIRECTIONS.right = 0;

// Graphics
SETTINGS.viewportMin = 0;
SETTINGS.viewportMax = 400;
SETTINGS.canvasMin = 0;
SETTINGS.canvasMax = 800;


// Animation config
SETTINGS.actorAnimationsList = [
	"idleUp", "idleDown", "idleLeft", "idleRight",
	"walkUp", "walkDown", "walkLeft", "walkRight",
	"attackUp", "attackDown", "attackLeft", "attackRight",
	"jumpUp", "jumpDown", "jumpLeft", "jumpRight",
	"death", "deathIdle"
];
SETTINGS.animations = {};

SETTINGS.actorList = [];
SETTINGS.actorList.push({
	name: "Wrath",
	sheet: "wrath_sprites.png",
	animations: [
		[ SETTINGS.actorAnimationsList.idleUp, 0, 0],
		[ SETTINGS.actorAnimationsList.idleDown, 1, 1],
		[ SETTINGS.actorAnimationsList.idleRight, 2, 2],
		[ SETTINGS.actorAnimationsList.idleLeft, 3, 3],
		[ SETTINGS.actorAnimationsList.walkUp, 4, 5],
		[ SETTINGS.actorAnimationsList.walkDown, 6, 7],
		[ SETTINGS.actorAnimationsList.walkRight, 8, 9],
		[ SETTINGS.actorAnimationsList.walkLeft, 10, 11]
	]
});

// Sprite config
SETTINGS.sheets = {};
SETTINGS.sheets.actors = {};

// Init
SETTINGS.init = function(){
	SETTINGS.baseUrl = SETTINGS.devMode ? SETTINGS.devUrl : SETTINGS.prodUrl;
	SETTINGS.assetsUrl = SETTINGS.baseUrl + SETTINGS.assetsDirectory;

	for(let actor of SETTINGS.actorList){
		SPRITES.loadActorSprites(actor);
	}
}



