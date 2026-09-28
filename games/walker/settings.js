/*##############################################################################
# Settings, configuration, and constants
##############################################################################*/
var SETTINGS = {};

SETTINGS.logLevel = 2;
SETTINGS.devMode = true;
SETTINGS.devUrl = "file:///home/blukat/localdev/neocities/games/walker/";
SETTINGS.prodUrl = "https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/";
SETTINGS.assetsDirectory = "assets/";
SETTINGS.defaultImageExtension = ".png";

// Actor config
SETTINGS.actorList = [
	"wrath"
];

// Animation config
SETTINGS.actorAnimationsList = [
	"idleUp", "idleDown", "idleLeft", "idleRight",
	"walkUp", "walkDown", "walkLeft", "walkRight",
	"attackUp", "attackDown", "attackLeft", "attackRight",
	"jumpUp", "jumpDown", "jumpLeft", "jumpRight",
	"death", "deathIdle"
];
SETTINGS.animations = {};


SETTINGS.loadActorSheets = function(actorName){
	SETTINGS.sheets.actors[actorName] = {};
	for(let animation of SETTINGS.actorAnimationsList){
		let fileName = SETTINGS._assetsUrl + actorName + "/" + animation + SETTINGS.defaultImageExtension;
		GRAPHICS.addImageAsync(fileName, SETTINGS.sheets.actors[actorName], animation);
	}
}

// Sprite config
SETTINGS.sheets = {};
SETTINGS.sheets.actors = {};

// Init
SETTINGS.init = function(){
	SETTINGS.baseUrl = SETTINGS.devMode ? SETTINGS.devUrl : SETTINGS.prodUrl;
	SETTINGS.assetsUrl = SETTINGS.baseUrl + SETTINGS.assetsDirectory;

	// Init actor animation constants
	for(let animation of SETTINGS.actorAnimationsList){
		SETTINGS.animations[animation] = animation;
	}

	for(let actor of SETTINGS.actorList){
		SETTINGS.loadActorSheets(actor);
	}
}



