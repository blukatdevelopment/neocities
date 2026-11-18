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

SESSION.DebugSession = function(){
    let s = SESSION.Session.new();

    s.addExterior(LEVEL.Generate.DebugLevel());
    s.addInterior(LEVEL.Static.TestLevel());
    s.activeLevel = s.exteriors[0];
    return s;
};

SESSION.NewGame = function(){
    SESSION.INSTANCE = SESSION.DebugSession();
};