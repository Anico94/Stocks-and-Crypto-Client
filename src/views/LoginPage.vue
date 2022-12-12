<template>
  <div>
    <h1>Login Page</h1>
    <form action="#" @submit.prevent="login">
      <label>
        Email:
        <input type="email" placeholder="Email" v-model="email" />
      </label>
      <label>
        Password:
        <input type="password" placeholder="Password" v-model="password" />
      </label>
      <button type="submit">Login</button>
      <p class="error-message">{{ error }}</p>
    </form>

    <p>
      Don't have an account? <router-link to="/signup">Sign Up!</router-link>
    </p>
  </div>
</template>

<script>
import { api } from "../helper/helpers";

export default {
  name: "login-page",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      const res = await api.checkForUser(user);

      if (res.error !== undefined) {
        this.error = res.error;
      } else {
        localStorage.setItem("token", res.token);
        this.error = "";
        this.$router.push(`/landing`);
      }
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

label {
  margin-bottom: 15px;
}

button {
  margin: 0 auto;
  width: 200px;
}

.error-message {
  color: red;
}
</style>
