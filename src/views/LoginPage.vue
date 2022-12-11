<template>
  <div>
    <h1>Login Page</h1>
    <form action="#" @submit.prevent="onSubmit">
      <label>
        Email:
        <input type="email" placeholder="Email" v-model="email" />
      </label>
      <label>
        Password:
        <input type="password" placeholder="Password" v-model="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login-page",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      console.log(this.email, this.password);
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
</style>
