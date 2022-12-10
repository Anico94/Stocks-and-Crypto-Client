<template>
  <div>
    <h1>Login Page</h1>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  components: { LoginForm },
  name: "login-page",
};
</script>

<style scoped></style>
