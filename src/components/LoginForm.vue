<template>
  <div>
    <form action="#" @submit.prevent="onSubmit">
      <label>
        Email:
        <input v-model="info.email" type="email" placeholder="Email" />
      </label>
      <label>
        Password:
        <input v-model="info.password" type="password" placeholder="Password" />
      </label>
      <button type="submit">Login</button>
    </form>

    <p>{{ info.email }}</p>
    <p>{{ info.password }}</p>
  </div>
</template>

<script>
export default {
  name: "login-form",
  props: {
    info: {
      type: Object,
      required: false,
      default() {
        return {
          email: "",
          password: "",
        };
      },
    },
  },
  methods: {
    onSubmit() {
      this.$emit("recieveDetails", this.info);
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
