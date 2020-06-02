<template>
    <div class="main">
      <div>main</div>
      <p v-for="(item,nameIndex) in $store.state.musicName" :key="nameIndex">{{item}}</p>
      <audio v-for="(item,index) in $store.state.path" :key="index" controls :src="'local-resource://'+item"></audio>
    </div>
</template>

<script>
export default {
  name:"",
  components: {},
  data() {
    return {
      //path:this.$store.state.path
    };
  },
}
</script>
<style scoped>

</style>