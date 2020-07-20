<template>
  <div class="home">
    <el-container>
      <el-header height="30px" style="-webkit-app-region: drag;">
        <header-info></header-info>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <aside-content></aside-content>
        </el-aside>
        <el-main>
          <!-- <main-content></main-content> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import mainContent from "./main/mainContent";
import asideContent from "./aside/asideContent";
import headerInfo from "./header/headerInfo";
export default {
  name: "home",
  components: {
    mainContent,
    asideContent,
    headerInfo
  }
};
</script>
<style scoped>
.el-aside{
  overflow: hidden;
}
.home{
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-main {
  height: 100%;
  background-color: #fff;
  padding: 0px;
}
.el-header {
  width: 100%;
  padding: 0 10px;
}
.el-aside {
  background-color: #99ccff;
  height: 100%;
}
</style>