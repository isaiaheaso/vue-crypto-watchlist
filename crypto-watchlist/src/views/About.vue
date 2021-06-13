<template>
  <div class="about">
    <h1>About Crypto Watchlist</h1>
    <div style="width: 65%">
      <p>
        This free-to-use crypto watchlist will help you track and learn more
        about virtually any cryptocurrency.
      </p>
      <p>
        To use it, simply search for any cryptocurrency on the
        <router-link to="/">homepage</router-link>, and if you would like to
        start tracking it, click "Add to watchlist." Removing a cryptocurrency
        from your watchlist is as easy as clicking the red delete button.
      </p>
      <p>
        If you would like to learn more about any particular cryptocurrency from
        your watchlist, click on the coin name (i.e.
        <router-link to="/detailed/bitcoin">Bitcoin</router-link>).
      </p>
      <p>Not sure where to start? Check out the video below!</p>
    </div>
    <VideoPlayer></VideoPlayer>
  </div>
</template>

<script>
import VideoPlayer from "../components/VideoPlayer.vue";

export default {
  name: "Home",
  components: {
    VideoPlayer,
  },
};
</script>
<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
