<template>
  <div class="hello">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading price data...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    <line-chart v-else-if="datacollection.datasets.length > 0" :chart-data="datacollection"></line-chart>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./LineChart";

const year = new Date().getFullYear();
const date = '01';

// Helper function to delay execution
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  name: "MonthlyPriceChart",
  components: {
    LineChart
  },
  data() {
    return {
      loading: false,
      error: null,
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
      this.loading = true;
      this.error = null;
      let prices = [];

      try {
        for (let i = 1; i < 7; i++) {
          const chartDate = date + '-' + i + '-' + year;
          
          try {
            // Add 1 second delay between requests
            if (i > 1) await delay(1000);
            
            const response = await axios({
              method: "GET",
              url: `https://api.coingecko.com/api/v3/coins/${this.coinId}/history`,
              params: {date: chartDate}
            });
            
            prices.push(response.data.market_data.current_price.usd);
          } catch (error) {
            if (error.response && error.response.status === 429) {
              // Rate limit hit - wait longer and retry
              await delay(2000);
              i--; // Retry this index
              continue;
            }
            throw error;
          }
        }
        
        this.datacollection.datasets = [{
          label: this.coinId.toUpperCase() + ' Monthly Prices',
          data: prices,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        }];
      } catch (error) {
        this.error = "Failed to load price data. Please try again later.";
        console.error('Error fetching prices:', error);
      } finally {
        this.loading = false;
      }
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
.spinner-border {
  margin: 20px auto;
}
.alert {
  margin: 20px 0;
}
</style>
