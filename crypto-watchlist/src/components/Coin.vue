<template>
  <tr>
    <td class="priority-1" scope="row">
      <img class="thumbnail" :src="image" />
    </td>
    <td class="priority-2"><router-link :to="'/detailed/' + name">{{ upperCaseCoinName() }}</router-link></td>
    <td class="priority-3">{{ symbol }}</td>
    <td class="priority-4">{{ price }}</td>
    <td :class="percentChangeClass">{{ percentChange }}</td>
    <td><button type="button" class="btn btn-danger" @click="removeFromWatchlist"><span>&times;</span></button></td>
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
    _id: String,
  },

  data() {
    return {
      price: "Loading...",
      percentChange: "Loading...",
      percentChangeClass: "",
    };
  },

  mounted() {
    if (this.name) {  // Check for name instead of _id
      this.getPrice();
    }
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
            this.percentChangeClass = "priority-5 pos";
          } else {
            this.percentChangeClass = "priority-5 neg";
          }
        })
        .catch(() => {
          this.price = "Error";
          this.percentChange = "N/A";
        });
    },
    upperCaseCoinName() {
      return String(this.name).charAt(0).toUpperCase() + this.name.slice(1);
    },
    removeFromWatchlist() {
      this.$store.dispatch('removeFromWatchlist', this._id);
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
