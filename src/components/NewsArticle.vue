<template>
  <div v-if="article !== undefined" class="container">
    <div class="image-container">
      <img :src="article['image_url']" alt="Article Image" />
    </div>
    <h4>{{ article.title }}</h4>
    <p>
      {{ article.snippet }}
    </p>
    <p>Related Stocks: {{ article.entities["0"].symbol }}</p>
    <a :href="article.url" target="blank">Link to full story</a>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
  },
};
</script>

<style scoped>
.container {
  background-color: white;
  border: 1px solid lightgray;
  margin: 10px;
  padding: 20px;
  border-radius: 20px;
}
img {
  width: 200px;
  margin: 0 auto;
  border-radius: 10px;
}
.image-container {
  text-align: center;
}
h4 {
  margin-top: 20px;
}
p {
  margin-top: 10px;
}
</style>
