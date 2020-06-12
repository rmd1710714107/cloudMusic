<template>
  <div id="app">
    <el-container>
      <el-header height="30px" style="-webkit-app-region: drag;">
        <header-info></header-info>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <aside-content></aside-content>
        </el-aside>
        <el-main>
          <main-content></main-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headerInfo from "./view/header/headerInfo"
import asideContent from "./view/aside/asideContent"
import mainContent from "./view/main/mainContent"
export default {
  name: "App",
  components: {
    headerInfo,
    asideContent,
    mainContent
  },
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
.el-container {
  height: 100%;
}
.el-main {
  height: 100%;
  background-color: #fffbf0;
}
.el-header {
  width: 100%;
  padding: 0 10px;
}
.el-aside {
  background-color: #99CCFF;
  height: 100%;
}
.mu-list .p{
  text-align: center;
  width: 100%;
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
</style>