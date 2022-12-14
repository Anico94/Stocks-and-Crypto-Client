<template>
  <div class="container">
    <div class="left"><img src="../assets/stock.png" /></div>
    <div class="right">
      <news-article></news-article>
      <news-article></news-article>
      <news-article></news-article>
    </div>
  </div>
  <footer>Small bottom banner</footer>
</template>

<script>
// import axios from "axios";
import NewsArticle from "@/components/NewsArticle.vue";

export default {
  components: { NewsArticle },
  name: "home-page",
  data() {
    return {
      article1: {},
      article2: {},
      article3: {},
    };
  },
  async mounted() {
    // this is requesting news articles form the api successfully
    // const APIKEY = `${process.env.VUE_APP_MARKETAUX}`;
    // const stockCode = "AMZN";
    // const URL = `https://api.marketaux.com/v1/news/all?symbols=${stockCode}&filter_entities=true&language=en&api_token=${APIKEY}`;
    // const response = await axios.get(URL);
    // console.log(response);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
}

.left {
  width: 500px;
  padding: 25px;
}
.right {
  width: 500px;
  padding: 25px;
}

img {
  width: 100%;
}
</style>
