var $builtinmodule = function(name)
{
  var mod = {};
  
  mod.fact = new Sk.builtin.func(function(a) {
    //return Sk.builtin.int_( myfact(a) );
    //return Sk.ffi.remapToPy(  myfact(a)  );
    b = Sk.ffi.remapToJs(a);
    return Sk.ffi.remapToPy(b*b) ;
  });
  
  mod.params = new Sk.builtin.func(function(){
    return Sk.ffi.remapToPy( params.local);
  });
  
  mod.show = new Sk.builtin.func(function(a) {
    //return Sk.builtin.int_( myfact(a) );
    //return Sk.ffi.remapToPy(  myfact(a)  );
    b = Sk.ffi.remapToJs(a);
    return Sk.ffi.remapToPy("Show not implemented") ;
  });
  
  mod.lolo = {};
  
  mod.lolo.show = new Sk.builtin.func(function(a) {
    //return Sk.builtin.int_( myfact(a) );
    //return Sk.ffi.remapToPy(  myfact(a)  );
    b = Sk.ffi.remapToJs(a);
    return Sk.ffi.remapToPy("LOLO Show not implemented") ;
  });
  
  
  /*
  mod.Stack = Sk.misceval.buildClass(mod, function($gbl, $loc) {
    $loc.__init__ = new Sk.builtin.func(function(self) {
      self.stack = [];
    });

    $loc.push = new Sk.builtin.func(function(self,x) {
      self.stack.push(x);
    });
    $loc.pop = new Sk.builtin.func(function(self) {
      return self.stack.pop();
    });
  },
  'Stack', []);
  */

  return mod;
}
