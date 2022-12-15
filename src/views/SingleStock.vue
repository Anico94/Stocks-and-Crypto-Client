<template>
  <div class="container">
    <div class="mt-5">
      <h3>Ticker: {{ $route.params.stockCode }}</h3>
      <h3>Current Price: ${{ currentStockPrice }}</h3>
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
      currentStockPrice: "",
    };
  },

  async mounted() {
    const stockCode = this.$route.params.stockCode;
    const STOCKAPI = `${process.env.VUE_APP_ALPHAVANTAGE}`;
    const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockCode}&apikey=${STOCKAPI}`;
    const res = await axios.get(URL);

    const stockData = res.data["Weekly Adjusted Time Series"];
    const array = [];

    for (const date in stockData) {
      const object = { x: date, y: Number(stockData[date]["4. close"]) };
      array.unshift(object);
    }

    this.chartValues = {
      datasets: [{ label: this.$route.params.stockCode, data: array }],
    };
    this.loaded = true;

    const STOCKAPI1 = `${process.env.VUE_APP_ALPHAVANTAGE1}`;
    const URL2 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockCode}&apikey=${STOCKAPI1}`;
    const price = await axios.get(URL2);

    const currentDate = price.data["Meta Data"]["3. Last Refreshed"];
    this.currentStockPrice =
      price.data["Time Series (Daily)"][currentDate]["4. close"];

    // const currentPrice = price.data["Time Series (Daily)"][0]["4. close"];
    // this.currentStockPrice = currentPrice;
  },

  methods: {
    returnToHoldings() {
      this.$router.push("/landing");
    },
  },
};
</script>

<style scoped></style>
