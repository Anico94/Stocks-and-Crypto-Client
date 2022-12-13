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

  <div class="holdings">
    <table>
      <tr>
        <th>Stock</th>
        <th>Units</th>
        <th>Purchase Price</th>
        <th>Total Price</th>
        <th>Add/Remove</th>
      </tr>
      <tr>
        <td>
          <input v-model="addStock" type="text" placeholder="Search" required />
        </td>
        <td>
          <input v-model="addUnits" type="text" placeholder="Units" required />
        </td>
        <td>
          <input
            v-model="addPrice"
            type="text"
            placeholder="Purchase Price"
            required
          />
        </td>
        <td>
          <input
            v-model="addTotal"
            type="text"
            placeholder="Total Price"
            required
          />
        </td>
        <td><button @click="addToHoldings">Add</button></td>
      </tr>

      <tr v-for="(stock, index) in this.watchlists" :key="index">
        <td>{{ stock.ticker }}</td>
        <td>{{ stock.units }}</td>
        <td>{{ stock.purchasePrice }}</td>
        <td>{{ stock.totalPrice }}</td>
        <td>
          <button @click="remove(index)">Remove</button>
        </td>
      </tr>
      <tr v-if="this.watchlists.length === 0">
        <td colspan="5">Currently no holding fill out above to add</td>
      </tr>
    </table>
  </div>

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
      addStock: "",
      addUnits: "",
      addPrice: "",
      addTotal: "",
    };
  },
  async mounted() {
    if (localStorage.getItem("token") === null) {
      return this.$router.push("/login");
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
      this.$router.push("/login");
    },
    async getStockInfo(stockCode) {
      const STOCKAPI = `${process.env.VUE_APP_ALPHAVANTAGE}`;
      const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockCode}&apikey=${STOCKAPI}`;
      console.log(URL);
      const res = await axios.get(URL);
      console.log(res.data["Weekly Adjusted Time Series"]);
    },
    async addToHoldings() {
      const holding = {
        ticker: this.addStock,
        units: this.addUnits,
        purchasePrice: this.addPrice,
        totalPrice: this.addTotal,
      };
      const res = await api.addHolding(holding, this.watchlists);
      this.watchlists = res.watchlists;
      this.addStock = "";
      this.addUnits = "";
      this.addPrice = "";
      this.addTotal = "";
      console.log(res);
    },
    remove(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
.articles {
  display: flex;
  justify-content: space-evenly;
}
li {
  display: flex;
  justify-content: space-evenly;
}
span {
  border: 1px solid black;
  width: 300px;
}
table {
  margin: 200px auto;
}
</style>
