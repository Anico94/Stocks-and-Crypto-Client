<template>
  <div>This is the landing page</div>
  <p>Hello {{ firstName }} {{ lastName }}</p>
  <p>Email Address: {{ email }}</p>
  <button @click="logout">Logout</button>
</template>

<script>
import { api } from "../helper/helpers";

export default {
  name: "landing-page",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      watchlists: [],
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
  },
};
</script>

<style scoped></style>
