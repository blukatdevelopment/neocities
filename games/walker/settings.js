/*##############################################################################
# Settings and configuration
##############################################################################*/
var SETTINGS = {};

SETTINGS._logLevel = 0;
SETTINGS._devMode = true;
SETTINGS._devUrl = "file:///home/blukat/localdev/neocities/games/walker/";
SETTINGS._prodUrl = "https://raw.githubusercontent.com/blukatdevelopment/neocities/main/games/walker/";
SETTINGS._assetsDirectory = "assets/";

SETTINGS.init = function(){
	SETTINGS._baseUrl = SETTINGS._devMode ? SETTINGS._devUrl : SETTINGS.prodUrl;
	SETTINGS._assetsUrl = SETTINGS._baseUrl + SETTINGS._assetsDirectory;
}
SETTINGS.init();