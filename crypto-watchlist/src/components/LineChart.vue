<template>
  <div class="container">
    <canvas ref="chart-planet"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'LineChart',
  data() {
    return {
      selectedYears: [2021],
    };
  },
  props: {
    chartType: {
      type: String,
      default: () => 'line'
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    generateChart() {
      console.log('chart data',this.chartData)
      new Chart(this.$refs['chart-planet'], {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions
      });
    }
  },
  mounted() {
    this.generateChart();
  }
}
</script>
