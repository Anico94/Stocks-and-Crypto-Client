<template>
  <div>
    <h1>Login Page</h1>
    <form action="#" @submit.prevent="onSubmit">
      <label>
        Email:
        <input type="email" placeholder="Email" />
      </label>
      <label>
        Password:
        <input type="password" placeholder="Password" />
      </label>
      <button type="submit">Login</button>
    </form>
    <!-- <login-form @recieveDetails="showUser"></login-form> -->
  </div>
</template>

<script>
// import LoginForm from "../components/LoginForm.vue";

export default {
  // components: { LoginForm },
  name: "login-page",
  methods: {
    // showUser(details) {
    //   console.log(details);
    // },
  },
};
</script>

<style scoped></style>
