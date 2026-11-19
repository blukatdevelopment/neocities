/*##############################################################################
# Access methods for global session instance.
##############################################################################*/

SESSION.INSTANCE = null;
SESSION.ActiveLevel = function(){
    if(SESSION.INSTANCE){
        return SESSION.INSTANCE.activeLevel;
    }
    return null;
};

SESSION.EditorSession = function(){
    let s = SESSION.Session.new();
    s.addExterior(LEVEL.Generate.DebugLevel());
    s.activeLevel = s.exteriors[0];
    s.playerData.player = ACTORFACTORY.PlayerOne();
    SESSION.INSTANCE = s;
};

SESSION.DebugSession = function(){
    let s = SESSION.Session.new();

    s.addExterior(LEVEL.Generate.DebugLevel());
    s.activeLevel = s.exteriors[0];
    s.linkDoors();
    s.playerData.player = ACTORFACTORY.PlayerOne();
    return s;
};

SESSION.NewGame = function(){
    SESSION.INSTANCE = SESSION.DebugSession();
};

SESSION.GetPlayer = function(){
    return SESSION.INSTANCE.playerData.player;
}

SESSION.EnterLevel = function(levelId, doorId){
    console.log("Entering level " + levelId + ", door " + doorId);
    
    let ses = SESSION.INSTANCE;
    if(ses == null){
        console.log("SESSION.EnterLevel(): Session instance is null!");
        return;
    }
    ses.enterLevel(levelId, doorId);
};

SESSION.ClearSession = function(){
    SESSION.INSTANCE = null;
};