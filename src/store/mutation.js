const mutations={
  addMusic(state,payload){
    state.musicList=payload
  },
  showSuggest(state,payload){
    state.suggest=payload
  },
  getSearVal(state,payload){
    state.searVal=payload;
  },
  getPlayList(state,payload){
    state.playList=payload;
  },
  addPlayUrl(state,payload){
    state.playUrl=payload
  }
}
export default mutations;