console.log("A  "+('foo' == new function(){ return String('foo'); }));
console.log("B  "+('foo' == new function(){ return new String('foo'); }));
console.log("C  "+([] == 0));
console.log("D  "+(![]));
console.log("E  "+(!0));