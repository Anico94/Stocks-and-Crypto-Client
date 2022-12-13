<template>
  <div>This is the landing page</div>
  <p>Hello {{ firstName }} {{ lastName }}</p>
  <p>Email Address: {{ email }}</p>
  <ul>
    <li v-for="stock in this.watchlists" :key="stock">
      <router-link :to="{ path: `/singlestock/${stock}` }">{{
        stock
      }}</router-link>
    </li>
  </ul>
  <input type="text" placeholder="Stock Code" v-model="stockCode" />
  <button @click="getStockInfo(this.stockCode)">Add to holding</button>
  <button @click="logout">Logout</button>

  <h2>Holdings</h2>

  <div class="holdings"></div>

  <div>
    <h3>News</h3>
    <div class="articles">
      <news-article></news-article>
      <news-article></news-article>
      <news-article></news-article>
    </div>
  </div>
</template>

<script>
import NewsArticle from "@/components/NewsArticle.vue";
import { api } from "../helper/helpers";
import axios from "axios";

export default {
  components: { NewsArticle },
  name: "landing-page",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      watchlists: [],
      stockCode: "",
    };
  },
  async mounted() {
    if (localStorage.getItem("token") === null) {
      return this.$router.push("/");
    }
    const res = await api.getUser();
    this.firstName = res.user.firstName;
    this.lastName = res.user.lastName;
    this.email = res.user.email;
    this.watchlists = res.user.watchlists;
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    async getStockInfo(stockCode) {
      const STOCKAPI = `${process.env.VUE_APP_ALPHAVANTAGE}`;
      const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockCode}&apikey=${STOCKAPI}`;
      console.log(URL);
      const res = await axios.get(URL);
      console.log(res.data["Weekly Adjusted Time Series"]);
    },
  },
};
</script>

<style scoped>
.articles {
  display: flex;
  justify-content: space-evenly;
}
</style>
