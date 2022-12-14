<template>
  <div class="container">
    <div class="mt-5">
      <h3>Ticker: {{ $route.params.stockCode }}</h3>
      <h3>Current Price: $93.98</h3>
      <button class="btn btn-outline-secondary" @click="returnToHoldings">
        Return to Holdings
      </button>
    </div>
    <div class="chart">
      <line-chart v-if="loaded" :chartValues="chartValues" />
    </div>
  </div>
</template>

<script>
import LineChart from "../components/LineChart.vue";
import axios from "axios";
export default {
  components: { LineChart },
  data() {
    return {
      loaded: false,
      chartValues: null,
    };
  },

  async mounted() {
    const stockCode = this.$route.params.stockCode;
    const STOCKAPI = `${process.env.VUE_APP_ALPHAVANTAGE}`;
    const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockCode}&apikey=${STOCKAPI}`;
    console.log(URL);
    const res = await axios.get(URL);

    const stockData = res.data["Weekly Adjusted Time Series"];
    const array = [];

    for (const date in stockData) {
      const object = { x: date, y: Number(stockData[date]["4. close"]) };
      array.unshift(object);
    }

    this.chartValues = {
      datasets: [{ data: array }],
    };
    console.log(array);

    this.loaded = true;
  },

  methods: {
    returnToHoldings() {
      this.$router.push("/landing");
    },
  },
};
</script>

<style scoped></style>
