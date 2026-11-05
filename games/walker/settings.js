/*##############################################################################
# Settings, configuration, and constants
##############################################################################*/
SETTINGS.logLevel = 0;
SETTINGS.devMode = true;
SETTINGS.devUrl = "file:///home/blukat/localdev/neocities/games/walker/";
SETTINGS.prodUrl = "https://blukat.neocities.org/games/walker/";
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

SETTINGS.CursorSize = 8;
SETTINGS.NotificationDuration = 3000;

// States that effect rendering.
let GAMESTATES = {};
GAMESTATES.play = "play";
GAMESTATES.playerMenus = "inventory";
GAMESTATES.dialogue = "dialogue";
GAMESTATES.pause = "pause";

let MENUS = {}
MENUS.None = "None";
MENUS.Inventory = "Inventory";
MENUS.Crafting = "Crafting";

// Graphics
SETTINGS.viewportMin = 0;
SETTINGS.viewportMax = 400;
// The viewport is upscaled to the screen resolution
SETTINGS.canvasMin = 0;
SETTINGS.canvasMax = 700;
SETTINGS.drawScale = SETTINGS.canvasMax / SETTINGS.viewportMax;
SETTINGS.foodPrefix = "Food: ";

let DISPLAY_MODES = {};
DISPLAY_MODES.static = "static";
DISPLAY_MODES.camera = "camera";

// Entity Factory
let ENTITY_FACTORY = {};

TIME.second = 1000;
TIME.minute = 60000;

GEAR.slots.head = "head";
GEAR.slots.hand = "hand";
GEAR.slots.offHand = "offHand";
GEAR.slots.torso = "torso";
GEAR.slots.legs = "legs";
GEAR.slots.feet = "feet";
GEAR.slots.special1 = "special1";
GEAR.slots.special2 = "special2";
GEAR.slots.special3 = "special3";

GEAR.slotIndices.head = 0;
GEAR.slotIndices.hand = 1;
GEAR.slotIndices.offHand = 2;
GEAR.slotIndices.torso = 3;
GEAR.slotIndices.legs = 4;
GEAR.slotIndices.feet = 5;
GEAR.slotIndices.special1 = 6;
GEAR.slotIndices.special2 = 7;
GEAR.slotIndices.special3 = 8;

// Event config
let EVENT_TYPES = {};
EVENT_TYPES.actor = "actor";
let EVENTS = {}; // Add global events here

// Animation config
SETTINGS.animationFrameRate = 12;
SETTINGS.animationFrameDuration = 1000 / SETTINGS.animationFrameRate;

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