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

SETTINGS.fps = 30;
SETTINGS.frameDuration = 1000 / SETTINGS.fps;

SETTINGS.interactionRange = 100;
SETTINGS.damageCooldown = 500; // Time between hits registering
SETTINGS.defaultFontSize = 10;
SETTINGS.defaultColor = "black";
SETTINGS.DefaultLevelTileSize = 1024;
SETTINGS.DefaultLevelSize = 9;

// Stats
STATS = {};
STATS.health = "Health";
STATS.energy = "Energy";
STATS.magic = "Magic";

// States that effect rendering.
let GAMESTATES = {};
GAMESTATES.play = "play";
GAMESTATES.inventory = "inventory";
GAMESTATES.dialogue = "dialogue";
GAMESTATES.pause = "pause";

// Assumes A 2.5 dimensional world
DIRECTIONS = {};
DIRECTIONS.none = -1;
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
SETTINGS.canvasMax = 700;
SETTINGS.drawScale = SETTINGS.canvasMax / SETTINGS.viewportMax;

let DISPLAY_MODES = {};
DISPLAY_MODES.static = "static";
DISPLAY_MODES.camera = "camera";

// Entity Factory
let ENTITY_FACTORY = {};


// Event config
let EVENT_TYPES = {};
EVENT_TYPES.actor = "actor";
let EVENTS = {}; // Add global events here

// Animation config
SETTINGS.animationFrameRate = 12;
SETTINGS.animationFrameDuration = 1000 / SETTINGS.animationFrameRate;

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

SETTINGS.staticSheetList = [];
SETTINGS.staticSheetList.push({
	name: "village",
	sheet: "village.png",
	resolutionX: 1024,
	resolutionY: 1024,
	cells: 1,
	sprites: ["village"]
});

SETTINGS.staticSheetList.push({
	name: "items",
	sheet: "items.png",
	resolutionX: 16,
	resolutionY: 16,
	cells: 16,
	sprites: [
		"Apple", "Seeds", "Talon", "Stick",
		"Rope", "Rock", "RockGrass", "Root",
		"RedBerry", "GreenBerry", "BlueBerry", "Placeholder",
		"Placeholder", "Placeholder", "Placeholder", "Placeholder"
	]
});

SETTINGS.staticSheetList.push({
	name: "cursors",
	sheet: "cursors.png",
	resolutionX: 8,
	resolutionY: 8,
	cells: 6,
	sprites: [
		"roundBlack", "roundRed", "roundGreen",
		"arrowBlack", "arrowRed", "arrowGreen"
	]
});
SETTINGS.staticSheetList.push({
	name: "hotbar",
	sheet: "hotbar.png",
	resolutionX: 154,
	resolutionY: 18,
	cells: 1,
	sprites: ["hotbar"]
});

SETTINGS.staticSheetList.push({
	name: "inventory",
	sheet: "inventory.png",
	resolutionX: 154,
	resolutionY: 52,
	cells: 1,
	sprites: ["inventory"]
});

SETTINGS.staticSheetList.push({
	name: "statusbar",
	sheet: "statusbar.png",
	resolutionX: 80,
	resolutionY: 89,
	cells: 1,
	sprites: ["statusbar"]
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
	for(let sheet of SETTINGS.staticSheetList){
		SPRITES.loadStaticSprites(sheet);
	}
	ITEMS.init();
};