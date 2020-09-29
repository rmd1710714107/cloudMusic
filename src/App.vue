<template>
  <div id="app">
    <el-container>
      <el-header height="30px" style="-webkit-app-region: drag;">
        <header-info></header-info>
      </el-header>
      <router-view></router-view>
    <!-- <el-footer height="15px"></el-footer> -->
    </el-container>
  </div>
</template>

<script>
import headerInfo from "./view/header/headerInfo"
import mounted from "./plugins/mounted"
import beforeCreate from "./plugins/beforeCreate"
export default {
  name: "App",
  components: {
    headerInfo
  },
  mixins: [mounted,beforeCreate],
  data() {
    return {
    };
  }
};
</script>

<style>
#app {
  height: 100%;
  overflow: initial;
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

#app .el-header {
  width: 100%;
  padding: 0 10px;
}
#app .el-container {
  height: 100%;
}
#app .el-footer{
  background-color: #efefef;
}
</style>