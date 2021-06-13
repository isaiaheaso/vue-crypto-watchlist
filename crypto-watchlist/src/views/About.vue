<template>
  <div class="about">
    <h1>About Crypto Watchlist</h1>
    <p>This is my final project for IT 338 where I will be creating a cryptocurrency watchlist app using Vue.</p>
    <VideoPlayer></VideoPlayer>
  </div>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";

export default {
  name: "Home",
  components: {
    VideoPlayer
  }
}
</script>
<style lang="scss" scoped>
.about{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
