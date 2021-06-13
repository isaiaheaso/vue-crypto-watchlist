<template>
  <div>
    <h2>Search</h2>
    <br />
    <div class="row">
      <div class="col-md-6">
        <form class="d-flex" @submit.prevent="searchQueryHandler">
          <input
            type="text"
            v-model="searchQuery"
            class="form-control"
            placeholder="(i.e. bitcoin, ethereum, ripple, etc)"
          />
          <button type="submit" class="btn btn-primary" @click="lowerCaseHandler">
            Search
          </button>
        </form>
      </div>
      <div class="col-md-6">
        <div class="card" style="width: 100%">
          <div class="card-body">
            <div
              v-if="$store.state.query.searchQueryStatus === -1"
              class="alert alert-danger"
              role="alert"
            >
              Invalid cryptocurrency name!
            </div>
            <div
              v-if="$store.state.query.searchQueryStatus === 1"
              class="alert alert-warning"
              role="alert"
            >
              Loading...
            </div>
            <h5 class="card-title">{{ $store.state.query.searchResultName }}</h5>
            <img v-if="$store.state.query.coin.image.length > 0" class="thumbnail" :src="$store.state.query.coin.image" />
            <p class="card-text">{{ $store.state.query.searchResultPrice }}</p>
            <p :class="$store.state.query.searchResultPercentChangeClass">
              {{ $store.state.query.searchResultPercentChange }}</p>
            <button type="button" class="btn btn-primary" @click="addWatchlist">
              Add to watchlist
            </button> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: "Query",

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      watchlist: 'watchlist',
      coin: 'getCoin'
    }),
    searchQuery: {
      get() {
        return this.$store.state.query.searchQuery;
      },
      set(val) {
        this.$store.commit('setSearchQuery', val);
      }
    }
  },

  methods: {
    searchQueryHandler(e) {
      console.log("Submitting search query...")
      this.$store.dispatch('searchForCoin', e);
    },
    lowerCaseHandler() {
      console.log("Lowercasing search query...")
      this.$store.dispatch('lowerCaseQuery');
    },
    addWatchlist() {
      const currentCoinIds = this.watchlist.map(coin => coin._id);
      if (this.coin._id && currentCoinIds.indexOf(this.coin._id) < 0) {
        this.$store.dispatch('setCoinToWatchlist', this.coin);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.results {
  display: flex;
  justify-content: center;
}
.pos {
  color: green;
}
.neg {
  color: red;
}
</style>