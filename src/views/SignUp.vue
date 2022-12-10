<template>
  <div>
    <h1>Sign up page</h1>
  </div>
  <signup-form></signup-form>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
export default {
  components: { SignupForm },
  name: "sign-up",
};
</script>

<style scoped></style>
