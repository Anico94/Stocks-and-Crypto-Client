<template>
  <div>
    <h1>Sign up page</h1>
    <form action="#" @submit.prevent="signup">
      <label>
        First Name:
        <input
          type="text"
          placeholder="First Name"
          v-model="firstName"
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          placeholder="Last Name"
          v-model="lastName"
          required
        />
      </label>
      <label>
        Email:
        <input type="email" placeholder="Email" v-model="email" required />
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          placeholder="Confirm Password"
          v-model="passwordconf"
          required
        />
      </label>
      <p>{{ message }}</p>
      <button type="submit">Sign Up!</button>
    </form>

    <p>Already a user? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { api } from "../helper/helpers";

export default {
  name: "sign-up",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordconf: "",
      message: "",
    };
  },
  methods: {
    async signup() {
      // TODO create validation for the names and password confirmation

      let newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      const resCreate = await api.createUser(newUser);
      this.message = "";

      // have some sort of conditional to check if the resulting user has been successfully created

      if (resCreate.code === 11000) {
        //code for duplicate email
        this.message = "That email is already in use.";
        return;
      }

      // direct user to the landing page and pass a json web token

      let user = {
        email: this.email,
        password: this.password,
      };

      const resLogin = await api.checkForUser(user);
      if (resLogin.error !== undefined) {
        this.error = resLogin.error;
      } else {
        localStorage.setItem("token", resLogin.token);
        this.error = "";
        this.$router.push(`/landing`);
      }

      this.$router.push(`/landing`);

      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.passwordconf = "";
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 15px;
}

button {
  margin: 0 auto;
  width: 200px;
}
</style>
