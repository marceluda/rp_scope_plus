/* RP.osc module */

var $builtinmodule = function(name)
{
  var mod = {};
  
  var mod.trigger = {};
  
  mod.stop = new Sk.builtin.func(function(a) {
    b = Sk.ffi.remapToJs(a);
    //return Sk.ffi.remapToPy(b*b) ;
    return Sk.ffi.remapToPy("stop not implemented");
  });
  
  mod.start = new Sk.builtin.func(function(a) {
    b = Sk.ffi.remapToJs(a);
    return "start not implemented" ;
  });

  mod.source = new Sk.builtin.func(function(a) {
    b = Sk.ffi.remapToJs(a);
    //return Sk.ffi.remapToPy(b*b) ;
    return "source not implemented";
  });
  
  mod.mode = new Sk.builtin.func(function(a) {
    b = Sk.ffi.remapToJs(a);
    return "mode not implemented" ;
  });

  return mod;
}
