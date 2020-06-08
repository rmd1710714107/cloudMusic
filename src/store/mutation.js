const mutations={
  addPath(state,payload){
    state.path=payload;
  },
  addMusicName(state,payload){
    state.musicName=payload
  },
  showSuggest(state,payload){
    state.suggest=payload
  }
}
export default mutations;