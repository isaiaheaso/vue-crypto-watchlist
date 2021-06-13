<template>
  <tr>
    <td scope="row">
      <img class="thumbnail" :src="image" />
    </td>
    <td><router-link :to="'/detailed/' + name">{{ upperCaseCoinName() }}</router-link></td>
    <td>{{ symbol }}</td>
    <td>{{ price }}</td>
    <td :class="percentChangeClass">{{ percentChange }}</td>
    <td><button type="button" class="btn btn-danger" @click="removeFromWatchlist(name)"><span>&times;</span></button></td>
  </tr>
</template>

<script>
import axios from "axios";

export default {
  name: "Coin",
  props: {
    image: String,
    name: String,
    symbol: String,
  },

  data() {
    return {
      price: "Loading...",
      percentChange: "Loading...",
      percentChangeClass: "",
    };
  },

  mounted() {
    this.getPrice();
  },
  methods: {
    getPrice() {
      axios({
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${this.name}`,
      })
        .then((resp) => {
          this.price = "$" + (resp.data.market_data.current_price.usd).toFixed(2);
          this.percentChange =
            (resp.data.market_data.price_change_percentage_24h).toFixed(2) + "%";
          if (resp.data.market_data.price_change_percentage_24h >= 0) {
            this.percentChangeClass = "pos";
          } else {
            this.percentChangeClass = "neg";
          }
        })
        .catch(() => {
          console.error();
        });
    },
    upperCaseCoinName() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    },
    removeFromWatchlist(name) {
      this.$store.dispatch('removeFromWatchlist', name);
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
img.thumbnail {
  width: 30%;
}
.pos {
  color: green;
}
.neg {
  color: red;
}
</style>
