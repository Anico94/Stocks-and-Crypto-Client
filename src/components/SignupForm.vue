<template>
  <div>
    <form action="">
      <label>
        First Name:
        <input type="text" placeholder="First Name" />
      </label>
      <label>
        Last Name:
        <input type="text" placeholder="Last Name" />
      </label>
      <label>
        Email:
        <input type="email" placeholder="Email" />
      </label>
      <label>
        Password:
        <input type="password" placeholder="Password" />
      </label>
      <label>
        Confirm Password:
        <input type="password" placeholder="Confirm Password" />
      </label>
      <button type="submit">Sign Up!</button>
    </form>
  </div>
</template>

<script></script>

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
