<template>
  <div id="app">
    <div class="container">
      <h1>Cryptocurrency Watchlist</h1>
      <br />
      <h2>Watchlist</h2>
      <table class="table">
        <thead>
          <tr>
            <th class="priority-1" scope="col">Image</th>
            <th class="priority-2" scope="col">Name</th>
            <th class="priority-3" scope="col">Symbol</th>
            <th class="priority-4" scope="col">Price ($USD)</th>
            <th class="priority-5" scope="col">% Change (24 hours)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Coin v-for="coin in $store.state.watchlist.watchlist"
              :key="coin._id"
              :image="coin.image"
              :name="coin.name"
              :symbol="coin.symbol"
              :_id="coin._id"
          ></Coin>
        </tbody>

        
      </table>
      <Query></Query>
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Coin from "../components/Coin.vue";
import Query from "../components/Query.vue";
export default {
  name: "Home",
  components: {
    Coin,
    Query
  },
  created() {
    if (!this.$store.getters.hasWatchlist) {
      console.log('Getting coins...')
      this.$store.dispatch('getWatchlist')
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;  
}
@media screen and (max-width: 1225px) and (min-width: 1045px) {
  .priority-5{
    display:none;
  }
}

@media screen and (max-width: 1045px) and (min-width: 835px) {
  .priority-5{
    display:none;
  }
  .priority-4{
    display:none;
  }
}

@media screen and (max-width: 565px) and (min-width: 300px) {
  .priority-5{
    display:none;
  }
  .priority-4{
    display:none;
  }
  .priority-3{
    display:none;
  }
}

@media screen and (max-width: 300px) {
  .priority-5{
    display:none;
  }
  .priority-4{
    display:none;
  }
  .priority-3{
    display:none;
  }
  .priority-2{
    display:none;
  }

}
</style>