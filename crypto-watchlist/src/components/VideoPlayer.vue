<template>
  <div class="videoContainer">
    <video
      ref="myPlayer"
      class="video-js vjs-theme-forest"
      controls
      preload="auto"
      width="640"
      height="auto"
      poster="MY_VIDEO_POSTER.jpg"
      data-setup="{}"
    >
      <source src="http://embed.wistia.com/deliveries/ffd6824d5d7f2c38f6014b19d9b765cf/my-file.mp4" type="video/mp4" />
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank"
          >supports HTML5 video</a
        >
      </p>
    </video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css'
import '@videojs/themes/dist/forest/index.css';

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.myPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>

<style lang="scss">

</style>