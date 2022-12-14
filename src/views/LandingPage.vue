<template>
  <div :class="updating ? 'blurred' : ''">
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

    <h2>{{ firstName }} {{ lastName }}'s Holdings</h2>

    <div class="holdings">
      <table>
        <tr>
          <th>Stock</th>
          <th>Units</th>
          <th>Purchase Price</th>
          <th>Total Price</th>
          <!-- <th>Current Price</th> -->
          <th colspan="2">Add/Remove/Update</th>
        </tr>
        <tr>
          <td>
            <input
              v-model="addStock"
              type="text"
              placeholder="Search"
              required
            />
          </td>
          <td>
            <input
              v-model="addUnits"
              type="text"
              placeholder="Units"
              required
            />
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
          <!-- <td>TO BE ADDED</td> -->
          <td colspan="2">
            <button @click="addToHoldings">Add Holding</button>
          </td>
        </tr>

        <tr v-for="(stock, index) in this.watchlists" :key="index">
          <td>
            <router-link :to="{ path: `/singlestock/${stock.ticker}` }">{{
              stock.ticker
            }}</router-link>
          </td>
          <td>{{ stock.units }}</td>
          <td>${{ stock.purchasePrice }}</td>
          <td>${{ stock.totalPrice }}</td>
          <!-- <td>{{ currentPrice(stock.ticker) }}</td> -->
          <td><button @click="startUpdate(index)">Update</button></td>
          <td>
            <button @click="remove(index)">Remove</button>
          </td>
        </tr>
        <tr v-if="this.watchlists.length === 0">
          <td colspan="6">Currently no holding fill out above to add</td>
        </tr>
      </table>
      <div>
        <h3>News</h3>
        <div class="articles">
          <news-article></news-article>
          <news-article></news-article>
          <news-article></news-article>
        </div>
      </div>
    </div>
  </div>

  <div :class="updating ? 'update-popup' : 'hidden'">
    <h1>Update: {{ updatingTicker }}</h1>
    <form action="#" @submit.prevent="completeUpdate(this.updatingIndex)">
      <label>
        Units:
        <input type="text" required v-model="this.updatingUnits" />
      </label>
      <br />
      <label>
        Purchase Price:
        <input type="number" required v-model="this.updatingPrice" />
      </label>
      <br />
      <label>
        Total Value:
        <input type="number" required v-model="this.updatingTotal" />
      </label>
      <br />
      <button type="submit">Update!</button>
    </form>
    <button @click="exitUpdate">Back</button>
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
      updatingTicker: "",
      updatingUnits: "",
      updatingPrice: "",
      updatingTotal: "",
      updatingIndex: "",
      updating: false,
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
    },
    async remove(index) {
      const res = await api.removeHolding(index, this.watchlists);
      this.watchlists = res.watchlists;
    },
    async startUpdate(index) {
      this.updating = true;
      const res = await api.getHolding(index);
      this.updatingTicker = res.user.watchlists.ticker;
      this.updatingUnits = res.user.watchlists.units;
      this.updatingPrice = res.user.watchlists.purchasePrice;
      this.updatingTotal = res.user.watchlists.totalPrice;
      this.updatingIndex = index;
    },
    async completeUpdate(index) {
      const holding = {
        ticker: this.updatingTicker,
        units: this.updatingUnits,
        purchasePrice: this.updatingPrice,
        totalPrice: this.updatingTotal,
      };
      const res = await api.updateHolding(index, holding, this.watchlists);
      this.watchlists = res.watchlists;
      this.updating = false;
      this.updatingTicker = "";
      this.updatingUnits = "";
      this.updatingPrice = "";
      this.updatingTotal = "";
      this.updatingIndex = "";
    },
    exitUpdate() {
      this.updating = false;
    },
    //ONLY ALLOWED 5 API REQUESTS A MINUTE
    // async currentPrice(stockCode) {
    //   const STOCKAPI = `${process.env.VUE_APP_ALPHAVANTAGE}`;
    //   const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockCode}&apikey=${STOCKAPI}`;
    //   const res = await axios.get(URL);
    //   console.log(res);
    // },
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
.update-popup {
  margin: auto;
  padding: 15px;
  position: fixed;
  right: 0;
  left: 0;
  top: 50px;
  width: 400px;
  height: 500px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
}
.hidden {
  display: none;
}

.blurred {
  filter: blur(15px);
  pointer-events: none;
}
</style>
