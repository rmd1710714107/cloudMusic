<template>
    <div class="aside">
      <login-area></login-area>
      <info></info>
    </div>
</template>

<script>
import loginArea from "../../components/loginArea"
import info from "../../components/info"
export default {
  name:"asideContent",
  components: {
    loginArea,
    info
  },
  data() {
    return {

    };
  },
}
</script>
<style scoped>
</style>