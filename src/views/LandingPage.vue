<template>
  <div :class="updating ? 'blurred container' : 'container'">
    <!-- <p>Hello {{ firstName }} {{ lastName }}</p>
    <p>Email Address: {{ email }}</p>
    <input type="text" placeholder="Stock Code" v-model="stockCode" />
    <button @click="getStockInfo(this.stockCode)">Add to holding</button>
    <button @click="logout">Logout</button> -->

    <h2>{{ firstName }} {{ lastName }}'s Holdings</h2>

    <div class="holdings">
      <table class="table text-center align-middle">
        <thead class="table-dark">
          <tr>
            <th>Stock</th>
            <th>Units</th>
            <th>Price/Stock</th>
            <th>Total Price</th>
            <!-- <th>Current Price</th> -->
            <th colspan="2">Add/Remove/Update</th>
          </tr>
        </thead>
        <tbody>
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
            <td>
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="startUpdate(index)"
              >
                Update
              </button>
            </td>
            <td>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="remove(index)"
              >
                Remove
              </button>
            </td>
          </tr>
          <tr v-if="this.watchlists.length === 0">
            <td colspan="6">Currently no holding fill out below to add</td>
          </tr>
          <tr>
            <td>
              <input
                v-model="addStock"
                list="stock"
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <datalist id="stock">
                <option
                  v-for="stock in this.stocknames"
                  :key="stock"
                  :value="stock.ticker"
                >
                  {{ stock.ticker }} - {{ stock.name }}
                </option>
              </datalist>
            </td>
            <td>
              <input
                v-model="addUnits"
                type="number"
                placeholder="Units"
                class="form-control me-2"
                aria-label="Units"
              />
            </td>
            <td>
              <input
                v-model="addPrice"
                type="number"
                placeholder="Price/Stock"
                class="form-control me-2"
                aria-label="Price/Stock"
              />
            </td>
            <td>
              <input
                v-model="addTotal"
                type="number"
                placeholder="Total Price"
                class="form-control me-2"
                aria-label="Total Price"
              />
            </td>
            <!-- <td>TO BE ADDED</td> -->
            <td colspan="2">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="addToHoldings"
              >
                Add Holding
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="error-message text-center">{{ message }}</p>
    </div>

    <div class="container news-section">
      <h3>News</h3>
      <div class="articles">
        <news-article :article="newsArticles[0]"></news-article>
        <news-article :article="newsArticles[1]"></news-article>
        <news-article :article="newsArticles[2]"></news-article>
      </div>
    </div>
  </div>

  <div :class="updating ? 'update-popup' : 'hidden'">
    <h1 class="text-center">Update: {{ updatingTicker }}</h1>
    <form
      class="text-center"
      action="#"
      @submit.prevent="completeUpdate(this.updatingIndex)"
    >
      <label class="form-label mb-1">
        Units:
        <input
          class="form-control w-100 mb-2"
          type="text"
          required
          v-model="this.updatingUnits"
        />
      </label>
      <br />
      <label class="form-label mb-1">
        Purchase Price:
        <input
          class="form-control w-100 mb-2"
          type="number"
          required
          v-model="this.updatingPrice"
        />
      </label>
      <br />
      <label class="form-label mb-1">
        Total Value:
        <input
          class="form-control w-100 mb-2"
          type="number"
          required
          v-model="this.updatingTotal"
        />
      </label>
      <br />
      <button class="btn btn-outline-primary" type="submit">Update!</button>
      <button class="btn btn-outline-secondary" @click="exitUpdate">
        Back
      </button>
    </form>
  </div>
</template>

<script>
import NewsArticle from "@/components/NewsArticle.vue";
import { api } from "../helper/helpers";
import axios from "axios";
import { stockArray } from "../helper/USStocks";

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
      newsArticles: [],
      stocknames: stockArray(),
      message: "",
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

    // this is requesting news articles form the api successfully

    const APIKEY = `${process.env.VUE_APP_MARKETAUX}`;
    const stockCode = "AMZN,GOOG,TEAM,MSFT,TSLA";
    const URL = `https://api.marketaux.com/v1/news/all?symbols=${stockCode}&filter_entities=true&language=en&api_token=${APIKEY}`;
    const response = await axios.get(URL);
    this.newsArticles = response.data.data;

    // CODE BELOW TO REQUEST NEWS FROM BACK END FEATURE TO COME
    // const response = await api.requestNews();
    // this.newsArticles = response;
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
      this.message = "";
      if (
        this.addStock === "" ||
        this.addUnits === "" ||
        this.addPrice === "" ||
        this.addTotal === ""
      ) {
        this.message = "Please fill out all fields to add";
        return;
      }
      const holding = {
        ticker: this.addStock.toUpperCase(),
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
      this.message = "";
      const res = await api.removeHolding(index, this.watchlists);
      this.watchlists = res.watchlists;
    },
    async startUpdate(index) {
      this.message = "";
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
  watch: {
    addUnits() {
      this.addTotal = Number(this.addUnits) * Number(this.addPrice);
    },
    addPrice() {
      this.addTotal = Number(this.addUnits) * Number(this.addPrice);
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
  margin: 20px auto;
}
.update-popup {
  margin: auto;
  padding: 15px;
  position: fixed;
  right: 0;
  left: 0;
  top: 50px;
  width: 350px;
  height: 400px;
  border: 1px solid black;
  border-radius: 15px;
  background-color: white;
  -webkit-box-shadow: 0px 0px 15px 5px #a6a6a6;
  box-shadow: 0px 0px 15px 5px #a6a6a6;
}
.hidden {
  display: none;
}

.blurred {
  filter: blur(15px);
  pointer-events: none;
}
h2 {
  padding: 25px 10px 10px 10px;
}

.news-section {
  border: 1px solid lightgray;
  background-color: lightgray;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
}
.error-message {
  color: red;
}
</style>
