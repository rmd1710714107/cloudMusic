let a=1;
function alia(){
  a=a+1;
  console.log(a);
  if(a<3){
    alia();
  }
}
alia();