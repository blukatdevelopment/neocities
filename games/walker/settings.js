/*##############################################################################
# Settings, configuration, and constants
##############################################################################*/
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

// States that effect rendering.
let GAMESTATES = {};
GAMESTATES.play = "play";
GAMESTATES.inventory = "inventory";
GAMESTATES.dialogue = "dialogue";
GAMESTATES.pause = "pause";

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