<template>
<div class="container">
  <div class="detailed">
    <div class="header">
      <img style="display: inline; vertical-align: middle;" :src="imageSmall" />
      <h1 style="display: inline; vertical-align: middle;">{{ name }}</h1>
    </div>
      
      <br>
      <MonthlyPriceChart
        :coinId="id"
      ></MonthlyPriceChart>
<h3>Market Data</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Price ($USD)</th>
          <th scope="col">% Change (24 hours)</th>
          <th scope="col">% Change (7 days)</th>
          <th scope="col">Market Cap</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ price }}</td>
          <td :class="priceChange24hClass">{{ priceChange24h }}</td>
          <td :class="priceChange7dClass">{{ priceChange7d }}</td>
          <td>{{ marketCap }}</td>
        </tr>
      </tbody>
    </table>
    <h3>Description</h3>
    <div id="popular">
              <div class="row" >
                  <div class="col-sm-4">
                      <div class="card">
                          <img class="center" :src="imageLarge" alt="...">
                          <div class="card-body">
                              <ul class="list-group list-group-flush">
                                  <li class="list-group-item">
                                      <b>Name:</b> {{name}}
                                  </li>
                                  <li class="list-group-item">
                                      <b>Symbol:</b> {{symbol}}
                                  </li>
                                  <li class="list-group-item">
                                      <b>Established:</b> {{established}}
                                  </li>
                                  <li class="list-group-item">
                                      <b>Site:</b>
                                      <a v-bind:href="website"
                                        target="_blank"> {{website}}</a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                    </div>

                    <div class="col-sm-8">
                      <div class="description">
                          <p v-html="description" style="text-align: left;"></p>
                      </div>
                    </div>
              </div>
          </div>
  </div>
</div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import MonthlyPriceChart from '../components/MonthlyPriceChart';
import axios from "axios";

export default {
  name: "Detailed",
  components: {
    MonthlyPriceChart
  },

  data() {
    return {
      id: this.$route.params.id,
      name: "Loading...",
      symbol: "",
      imageSmall: "",
      imageLarge: "",
      website: "",
      established: "",
      price: "",
      priceChange24h: "",
      priceChange7d: "",
      priceChange24hClass: "",
      priceChange7dClass: "",
      marketCap: "",
      description: ""
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        method: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${this.id}`,
      })
        .then((resp) => {
          // Update Coin Data Object
          this.name = resp.data.name;
          this.symbol = resp.data.symbol.toUpperCase();
          this.imageSmall = resp.data.image.small;
          this.imageLarge = resp.data.image.large;
          this.website = resp.data.links.homepage[0];
          this.established = resp.data.genesis_date;
          this.price = "$" + resp.data.market_data.current_price.usd.toFixed(2);
          this.priceChange24h = resp.data.market_data.price_change_percentage_24h.toFixed(2) + "%";
          this.priceChange7d = resp.data.market_data.price_change_percentage_7d.toFixed(2) + "%";
          this.priceChange24hClass = (resp.data.market_data.price_change_percentage_24h >= 0) ? "pos" : "neg";
          this.priceChange7dClass = (resp.data.market_data.price_change_percentage_7d >= 0) ? "pos" : "neg";
          this.marketCap = "$" + resp.data.market_data.market_cap.usd;
          this.description = (resp.data.description.en).replace(/\\"/g, "");
        })
        .catch(() => {
          console.error();
        })
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 20px;
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
.pos {
  color: green;
}
.neg {
  color: red;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
