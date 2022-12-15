<template>
  <div v-if="article !== undefined" class="container">
    <div class="image-container">
      <img :src="article['image_url']" alt="Article Image" />
    </div>
    <h3>{{ article.title }}</h3>
    <p>
      This is the snippet of the article that gives a brief description of the
      article
    </p>
    <p>{{ article.entities["0"].symbol }}</p>
    <a :href="article.url" target="blank">See full story</a>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
  },
  // watch:{
  //   article: function(){

  //   }
  // }
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
</style>
