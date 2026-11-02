STATS.Resource = {};
STATS.Resource.new = function(name, value, maxAttribute, color, transparentColor){
  let st = {
    name: name,
    value: value,
    maxAttribute: maxAttribute,
    min: 0,
    damageCooldown: null,
    lastChangeTime: null,
    lastChangeDelta: null,
    color: color,
    transparentColor: transparentColor,
    controller: null // The stats controller containing this resource
  };
  st.update = function(){
    if(st.value > st.max()){
      st.value = st.max();
    }
  };
  st.reset = function(){
    st.value = st.max();
  };
  st.clear = function(){
    st.value = st.min;
  };
  st.change = function(delta){
    if(delta > 0 && st.value == st.max()){
      // Already full
      return;
    }
    if(delta < 0 && st.value == st.min){
      // Already empty
      return;
    }
    st.value += delta;
    st.value = UTILITY.clamp(st.value);
    st.lastChangeDelta = delta;
    st.lastChangeTime = Date.now();
  };
  st.changeDelta = function(){
    return st.lastChangeDelta;
  };
  st.changeAgeSeconds = function(){
    if(st.lastChangeTime == null){
      return null;
    }
    return Math.trunc(st.changeAgeMilliseconds()/1000);
  };
  st.changeAgeMilliseconds = function(){
    if(st.lastChangeTime == null){
      return null;
    }
    let last = st.lastChangeTime;
    let now = Date.now();
    let elapsed = now - last;
    return elapsed;
  };
  st.max = function(){
    if(st.controller == null){
      UTILITY.log("STATS.Resource.max","Controller not set",{name: st.name});
      return -1;
    }
    return st.controller.getAttribute(st.maxAttribute);
  };
  st.toString = function(){
    let ret = "Stat[";
    ret += "name: " + st.name;
    ret += ", value: " + st.value;
    ret += ", max: " + st.max();
    ret += ", min: " + st.min;
    ret += ", damageCooldown: " + st.damageCooldown;
    ret += "]";
    return ret;
  };
  return st;
};