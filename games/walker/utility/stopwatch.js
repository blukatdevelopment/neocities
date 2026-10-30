UTILITY.StopWatch = {};
UTILITY.StopWatch.new = function(){
    let sw = {
        startTime: null,
        endTime: null,
        secondsElapsed: null
    };
    sw.start = function(){
        sw.startTime = Date.now();
    };
    sw.stop = function(){
        sw.endTime = Date.now();
        sw.secondsElapsed = (sw.endTime - sw.startTime)/1000;
        return sw.secondsElapsed;
    };
    return sw;
};