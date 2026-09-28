/*##############################################################################
# Settings, configuration, and constants
##############################################################################*/
var SETTINGS = {};

SETTINGS._logLevel = 2;
SETTINGS._devMode = true;
SETTINGS._devUrl = "file:///home/blukat/localdev/neocities/games/walker/";
SETTINGS._prodUrl = "https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/";
SETTINGS._assetsDirectory = "assets/";
SETTINGS._defaultImageExtension = ".png";

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
		let fileName = SETTINGS._assetsUrl + actorName + "/" + animation + SETTINGS._defaultImageExtension;
		GRAPHICS.addImageAsync(fileName, SETTINGS.sheets.actors[actorName], animation);
	}
}

// Sprite config
SETTINGS.sheets = {};
SETTINGS.sheets.actors = {};

// Init
SETTINGS.init = function(){
	SETTINGS._baseUrl = SETTINGS._devMode ? SETTINGS._devUrl : SETTINGS.prodUrl;
	SETTINGS._assetsUrl = SETTINGS._baseUrl + SETTINGS._assetsDirectory;

	// Init actor animation constants
	for(let animation of SETTINGS.actorAnimationsList){
		SETTINGS.animations[animation] = animation;
	}

	for(let actor of SETTINGS.actorList){
		SETTINGS.loadActorSheets(actor);
	}
}



