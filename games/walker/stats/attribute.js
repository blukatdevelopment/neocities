STATS.Attribute = {};
STATS.Attribute.new = function(name, value){
  let st = {
    name: name,
    value: value,
    modifier: 0
  };
  st.toString = function(){
    let ret = "Attribute[name: " + st.name;
    ret += ", value: " + st.value;
    ret += ", modifier: " + st.modifier;
    ret += "]";
    return ret;
  };
  return st;
};