<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import home from "./view/home"
import mounted from "./plugins/mounted"
export default {
  name: "App",
  components: {
    
    home
  },
  mixins: [mounted],
  data() {
    return {
    };
  }
};
</script>

<style>
#app {
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}

.mu-list .mu-icon{
  margin: 0 auto;
}
.el-popover .div1{
  height: 100%;
  padding: calc(calc(48px - 30px) / 2) 0;
  text-align: center;
}
.el-popover .wrap{
  width: 100%;
  height: 100%;
}
#app .el-main{
  padding: 0px;
}
</style>