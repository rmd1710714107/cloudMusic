<template>
  <div class="main" ref="main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <play-music></play-music>
  </div>
</template>

<script>
import playMusic from "../../components/playMusic";
export default {
  name: "mainContent",
  components: {
    playMusic
  },
  data() {
    return {
    };
  },
  methods: {
    Show() {
      this.ishow = !this.ishow;
    }
  },
  mounted() {
    this.$bus.$emit("listHeight",this.$refs.main.offsetHeight)
  }
};
</script>
<style scoped>
.main{
  height: 100%;
  overflow: hidden;
  position: relative;
}
.demo-list-wrap {
  width: 100%;
  max-width: 360px;
  overflow: hidden;
}
.divItem {
  width: 300px;
  height: 30px;
}
</style>