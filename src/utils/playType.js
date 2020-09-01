class PlayType{
  constructor(){
    this.resArr=[];
  }
  ShunXu(musicInfo,action){
    if(action==="prevMusic"){
      return musicInfo.index-=1;
    }else{
      return musicInfo.index+=1;
    }
  }
  DanQu(musicInfo){
    return musicInfo.index;
  }
  SuiJi(musicInfo,maxNumber,action,resArr){
    // let maxNumber=musicList.length,
    //     musicArr=[],
    //     resArr=[];
    // for (let k = 0; k < maxNumber; k++) {
    //   musicArr.push(k);
    // }
    // for (let i=musicArr.length; i>0; i--) {
    //   let nexIndex=Math.floor(Math.random() * musicArr.length),
    //       cardItem=musicArr[nexIndex];
    //   musicArr[nexIndex]=musicArr[musicArr.length-1];
    //   musicArr[musicArr.length-1]=cardItem;
    //   resArr.push(musicArr.pop());
    // }
    if(action==="prevMusic"){
      musicInfo.index<=0?musicInfo.index=maxNumber-1:musicInfo.index-=1;
      
    }else{
      musicInfo.index>=maxNumber-1?musicInfo.index=0:musicInfo.index+=1;
    }
    return resArr[musicInfo.index];
  }
}
let playType=new PlayType()
export default playType;