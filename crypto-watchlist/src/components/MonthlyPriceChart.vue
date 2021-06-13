<template>
  <div class="hello">
    <line-chart v-if="datacollection.datasets.length > 0" :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./LineChart";

const year = new Date().getFullYear();
const date = '01'
export default {
  name: "MonthlyPriceChart",
  components: {
    LineChart
  },
  data() {
    return {
      datacollection: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: []
      }
    };
  },
  props: {
    coinId: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  methods: {
    async getMonthlyPrices() {
      let prices = [];
      console.log(this.coinId)
      for (let i = 1; i < 7; i++) {
        const chartDate = date + '-' + i + '-' + year;
        await axios({
          method: "GET",
          url: `https://api.coingecko.com/api/v3/coins/${this.coinId}/history`,
          params: {date: chartDate}
        })
          .then((resp) => {
            // Update Coin Data Object
            prices.push(resp.data['market_data']['current_price'].usd)
          })
          .catch(() => {
            console.error();
        })
      }
      
      this.datacollection.datasets = [{
        label: this.coinId.toUpperCase() + ' Monthly Prices',
        data: prices,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0,
      }]
    }
  },
  mounted() {
    this.getMonthlyPrices();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
