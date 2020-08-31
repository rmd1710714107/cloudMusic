class PlayType{
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
  SuiJi(index,max){
    
  }
}
let playType=new PlayType()
export default playType;