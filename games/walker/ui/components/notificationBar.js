/*##############################################################################
# Displays text on the top-right corner of the screen.
##############################################################################*/
UI.COMPONENTS.NotificationBar = {};
UI.COMPONENTS.NotificationBar.new = function(){
    let nbRect = SHAPES.RECT.new(
        VECTOR2.new(0, 0),
        VECTOR2.new(40, 40)
    );
    let sprite = SPRITES.static.statusbar.statusbar;    
    let nb = UI.COMPONENTS.BaseComponent.new(nbRect, null);
    nb.notifications = [];
    nb.expireTime = null;
    nb.draw = function(){
        if(nb.notifications.length == 0){
            return;
        }
        let now = Date.now();
        if(nb.expireTime != null && now > nb.expireTime){
            nb.expireTime = null;
            nb.notifications.shift();
            return;
        }
        if(nb.expireTime == null){
            nb.expireTime = now + nb.notificationDuration();
        }
        GRAPHICS.drawText(nb.notifications[0], 0, 20, 20, GRAPHICS.Colors.White);
    };
    nb.notificationDuration = function(){
        let base = SETTINGS.NotificationDuration;
        if(nb.notifications.length == 0){
            return base;
        }
        return Math.trunc(base/nb.notifications.length);
    };
    nb.updateDuration = function(){
        if(nb.expireTime == null){
            return;
        }
        let now = Date.now();
        let current = nb.expireTime - now;
        let updated = nb.notificationDuration();
        if(current > updated){
            nb.expireTime = now + updated;
        }
    };
    nb.notification = function(message){
        nb.notifications.push(message);
        nb.updateDuration();
    };
    return nb;
};