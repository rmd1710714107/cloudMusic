import Vue from 'vue'
import App from './App.vue'
import store from "./store/index"
import './plugins/element.js'
import "./plugins/muse"
import "normalize.css"
import "./assets/basic.css"
import './assets/material-icons.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
