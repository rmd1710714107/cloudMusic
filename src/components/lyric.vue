<template>
    <div class="lyric">
      <button @click="musicPanel">music</button>
    </div>
</template>

<script>
export default {
  name:"lyric",
  components: {},
  data() {
    return {

    };
  },
  methods:{
    musicPanel(){
      this.$bus.$emit("showLyric","right")
    }
  }
}
</script>
<style scoped>
.lyric{
  background-color: #fff;
  width: 100%;
  height: 100%;
}
</style>