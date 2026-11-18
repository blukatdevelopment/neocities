/*##############################################################################
# Contains the levels and player data for a single playthrough
##############################################################################*/


SESSION.Session = {};
SESSION.Session.new = function(){
    let s = {
        exteriors: {},
        interiors: {},
        playerData: {},
        nextLevelId: 0,
        activeLevel: null
    };

    s.addExterior = function(ext){
        let id = s.nextLevelId;
        s.nextLevelId++;
        s.exteriors[id] = ext;
    };
    s.addInterior = function(interior){
        let id = s.nextLevelId;
        s.nextLevelId++;
        s.interiors[id] = interior;
    };
    return s;
};