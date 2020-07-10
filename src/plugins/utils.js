function debounce(fn,delay) {
  let timer=null;
  return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer=setTimeout(() => {
      fn.apply(this,args)
    }, delay);
  }
}
function handleMusicTinme(time){
  let second,minute;
  second=parseInt(time)>=60?parseInt(time)%60:parseInt(time);
  minute=parseInt(parseInt(time)/60);
  return timeFormat(minute,second);
}
function timeFormat(min,sec){
  let time=[...arguments].map(item=>{
    item=item.toString();
    if(item.length===1){
      item="0"+item
    }
    return item;
  })
  return time.join(":")
}
export {
  debounce,
  handleMusicTinme
} ;