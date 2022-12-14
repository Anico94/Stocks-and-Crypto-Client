<template>
  <div class="container">
    <div class="signup-width">
      <h1 class="text-center">Sign Up!</h1>
      <form action="#" @submit.prevent="signup">
        <input
          class="form-control w-100 mb-2"
          type="text"
          placeholder="First Name"
          v-model="firstName"
          required
        />

        <input
          class="form-control w-100 mb-2"
          type="text"
          placeholder="Last Name"
          v-model="lastName"
          required
        />

        <input
          class="form-control w-100 mb-2"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
        <input
          class="form-control w-100 mb-2"
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <input
          class="form-control w-100 mb-2"
          type="password"
          placeholder="Confirm Password"
          v-model="passwordconf"
          required
        />

        <button class="btn btn-dark mt-2 w-100" type="submit">Sign Up!</button>
        <p>{{ message }}</p>
      </form>

      <p>Already a user? <router-link to="/login">Login</router-link></p>
    </div>
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
.signup-width {
  margin: 100px auto;
  max-width: 400px;
  border: 1px solid black;
  padding: 20px;
  border-radius: 20px;
  -webkit-box-shadow: 0px 5px 33px -1px #000000;
  box-shadow: 0px 5px 33px -1px #000000;
}
p {
  text-align: center;
}
h1 {
  padding-bottom: 20px;
}
</style>
