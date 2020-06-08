<template>
  <div class="main">
    <div>main</div>
      <p v-for="(item,index) in $store.state.musicName" :key="index+1">{{item}}</p>
      <audio v-for="(item,index) in $store.state.path" :key="index" controls :src="'local-resource://'+item"></audio>
      <loop-scroll></loop-scroll>
  </div>
</template>

<script>
import loopScroll from "../../components/loopScroll"
export default {
  name: "mainContent",
  components: {
    loopScroll
  },
  data() {
    return {
      //path:this.$store.state.path
    };
  }
};
</script>
<style scoped>
.demo-list-wrap {
    width: 100%;
    max-width: 360px;
    overflow: hidden;
  }
</style>