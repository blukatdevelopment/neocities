/*##############################################################################
# Shows the health, energy, and magic of the player
##############################################################################*/
UI.COMPONENTS.StatusBar = {};
UI.COMPONENTS.StatusBar.new = function(){
    let sbRect = SHAPES.RECT.new(
        VECTOR2.new(320, 320),
        VECTOR2.new(80, 80)
    );
    let sprite = SPRITES.static.statusbar.statusbar;    
    let sb = UI.COMPONENTS.BaseComponent.new(sbRect, sprite);
    sb.stats = null;
    sb.recentThreshold = 3;
    sb.blinkDuration = 250;
    sb.healthRect = SHAPES.RECT.new(
        VECTOR2.new(6, 6),
        VECTOR2.new(20, 50)
    );
    sb.energyRect = SHAPES.RECT.new(
        VECTOR2.new(30, 6),
        VECTOR2.new(20, 50)
    );
    sb.magicRect = SHAPES.RECT.new(
        VECTOR2.new(53, 6),
        VECTOR2.new(21, 50)
    );
    sb.linkActor = function(actor){
        sb.stats = actor.stats;
    };
    sb.draw = function(){
        if(sb.stats == null){
            return;
        }
        if(!sb.isChangedRecently() && SCENE.getGameState() == GAMESTATES.play){
            // Hide unless the inventory menu's already up
            // or something's changing during play
            return;
        }
        let health = sb.stats.getStat(STATS.Resources.health);
        let energy = sb.stats.getStat(STATS.Resources.energy);
        let magic = sb.stats.getStat(STATS.Resources.magic);
        let pos = sb.rect.position;
        SPRITES.renderSprite(pos.x, pos.y, sb.sprite.index, sb.sprite.sheet, DISPLAY_MODES.static);
        sb.shroudStat(health, sb.healthRect);
        sb.shroudStat(energy, sb.energyRect);
        sb.shroudStat(magic, sb.magicRect);
        sb.renderStatText(sb.healthRect, health);
        sb.renderStatText(sb.energyRect, energy);
        sb.renderStatText(sb.magicRect, magic);
        sb.highlightDelta(sb.healthRect, health);
        sb.highlightDelta(sb.energyRect, energy);
        sb.highlightDelta(sb.magicRect, magic);
    };
    sb.highlightDelta = function(barRect, stat){
        if(stat.changeDelta() == null || stat.changeDelta() == 0 || stat.changeAgeSeconds() > sb.recentThreshold){
            return;
        }
        // Blink the highlight
        let blinks = Math.trunc(stat.changeAgeMilliseconds() / sb.blinkDuration);
        let blinkOff = blinks % 2 == 0; 
        if(blinkOff){
            // Highlighting blinks on and off.
            return;
        }
        if(stat.changeDelta() > 0){
            sb.highlightGain(barRect, stat);
        }
        else if(stat.changeDelta() < 0){
            sb.highlightLoss(barRect, stat);
        }
    };
    sb.highlightGain = function(barRect, stat){
        // TODO
    };
    sb.highlightLoss = function(barRect, stat){
        let delta = stat.changeDelta() * -1;
        let deltaPercentage = delta / stat.max;
        let deltaHeight = deltaPercentage * barRect.size.y;
        let shroudHeight = sb.getShroudHeight(stat.value, stat.max, barRect.size.y);

        let x = barRect.position.x + sb.rect.position.x;
        let y = barRect.position.y + sb.rect.position.y + shroudHeight - deltaHeight ;
        let width = barRect.size.x;
        let height = deltaHeight;
        GRAPHICS.fillBox(x, y, width, height, stat.transparentColor);
    };
    sb.shroudStat = function(stat, rect){
        let barHeight = rect.size.y;
        let shroudHeight = sb.getShroudHeight(stat.value, stat.max, barHeight);
        let shroudPos = rect.position.add(sb.rect.position);
        let x = shroudPos.x;
        let y = shroudPos.y;
        let width = rect.size.x;
        let height = shroudHeight;
        let color = GRAPHICS.Colors.Black;
        if(stat.max == 0){
            color = GRAPHICS.Colors.Beige;
        }
        GRAPHICS.fillBox(shroudPos.x, shroudPos.y, rect.size.x, shroudHeight, color);
    };
    sb.getShroudHeight = function(value, max, barHeight){
        if(max == 0){
            return barHeight;
        }
        let barPercentage = value / max; // how full is the bar
        let shroudPercentage = 1 - barPercentage;
        let shroudHeight = barHeight * shroudPercentage;
        return shroudHeight;
    };
    sb.renderStatText = function(barRect, stat){
        if(stat.max == 0){
            return;
        }
        let color = stat.color;
        let textSize = SETTINGS.defaultFontSize;
        let x = sb.rect.position.x + barRect.position.x;
        let y = sb.rect.position.y + barRect.position.y + barRect.size.y + textSize;
        let text = stat.name;
        GRAPHICS.drawText(text, x, y, textSize, color);
        y += textSize;
        text = stat.value + "/" + stat.max;
        GRAPHICS.drawText(text, x, y, textSize, color);
    };
    sb.isChangedRecently = function(){
        let health = sb.stats.getStat(STATS.Resources.health);
        if(health.changeAgeSeconds() != null && health.changeAgeSeconds() <= sb.recentThreshold){
            return true;
        }
        let energy = sb.stats.getStat(STATS.Resources.energy);
        if(energy.changeAgeSeconds() != null && energy.changeAgeSeconds() <= sb.recentThreshold){
            return true;
        }
        let magic = sb.stats.getStat(STATS.Resources.magic);
        if(magic.changeAgeSeconds() != null && magic.changeAgeSeconds() <= sb.recentThreshold){
            return true;
        }
        return false;
    };
    return sb;
};