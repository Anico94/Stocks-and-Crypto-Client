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
    };
  },
  methods: {
    // async createUser(newUser) {
    //   await api.createUser(newUser);
    // this.flash("Word Created Successfully");
    //may want to change this route on sing in
    // this.$router.push(`/`);
    // this.$router.push(`/users/${res._id}`);
    // },
    async signup() {
      // TODO create validation for the names and password confirmation

      let newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      const res = await api.createUser(newUser);
      console.log(res);
      this.$router.push(`/`);
      console.log(this.password);

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
