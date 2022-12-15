<template>
  <div class="container">
    <div class="mt-5">
      <h3>Ticker: {{ $route.params.stockCode }} - {{ companyName }}</h3>
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
import { stockArray } from "../helper/USStocks";

export default {
  components: { LineChart },
  data() {
    return {
      loaded: false,
      chartValues: null,
      currentStockPrice: "",
      companyName: "",
    };
  },

  mounted() {
    this.setupPage();
  },

  methods: {
    returnToHoldings() {
      this.$router.push("/landing");
    },
    async setupPage() {
      const stockCode = this.$route.params.stockCode;
      const stockObjects = stockArray();
      for (let i = 0; i < stockObjects.length; i++) {
        const current = stockObjects[i];
        if (current.ticker === this.$route.params.stockCode) {
          this.companyName = current.name;
          break;
        }
      }

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
      const currentDate = price.data["Meta Data"][
        "3. Last Refreshed"
      ].substring(0, 10);
      console.log(currentDate);
      this.currentStockPrice =
        price.data["Time Series (Daily)"][currentDate]["4. close"];

      // const currentPrice = price.data["Time Series (Daily)"][0]["4. close"];
      // this.currentStockPrice = currentPrice;
    },
  },
  watch: {
    $route() {
      this.setupPage();
    },
  },
};
</script>

<style scoped></style>
