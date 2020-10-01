function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay);
  }
}
function handleMusicTinme(time) {
  let second, minute;
  second = parseInt(time) >= 60 ? parseInt(time) % 60 : parseInt(time);
  minute = parseInt(parseInt(time) / 60);
  return timeFormat(minute, second);
}
function timeFormat(min, sec) {
  let time = [...arguments].map(item => {
    item = item.toString();
    if (item.length === 1) {
      item = "0" + item
    }
    return item;
  })
  return time.join(":")
}
function processsRate(total, process) {
  rate = process / total;
  return rate;
}

import { Message } from "element-ui";
function message(type, msg, showClose = false) {
  Message({
    type: type,
    message: msg,
    showClose: showClose
  })
}
function shuffle(musicList) {
  let maxNumber = musicList.length,
      musicArr = [],
      resArr = [];
  for (let k = 0; k < maxNumber; k++) {
    musicArr.push(k);
  }
  for (let i = musicArr.length; i > 0; i--) {
    let nexIndex = Math.floor(Math.random() * musicArr.length),
      cardItem = musicArr[nexIndex];
    musicArr[nexIndex] = musicArr[musicArr.length - 1];
    musicArr[musicArr.length - 1] = cardItem;
    resArr.push(musicArr.pop());
  }
  return resArr
}
function loading({target,lock,text}){
  return Loading.service({
    target,
    lock,
    text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    fullscreen:false
  })
}
export {
  debounce,
  handleMusicTinme,
  message,
  processsRate,
  shuffle,
  loading
};