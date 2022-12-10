<template>
  <div>
    <form action="">
      <label>
        Email:
        <input type="email" placeholder="Email" />
      </label>
      <label>
        Password:
        <input type="email" placeholder="Email" />
      </label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login-form",
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
