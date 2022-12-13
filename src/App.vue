<template>
  <div id="app">
    <nav>
      <!-- if statement to send to home or landing page depending on if a user is logged in or not-->
      <router-link to="/landing"
        ><img src="./assets/logo.png" class="logo"
      /></router-link>
      <router-link to="/">Home</router-link> |
      <button><router-link to="/login">Login</router-link></button>
      |
      <button><router-link to="/signup">Sign Up</router-link></button>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: lightblue;
  color: white;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logo {
  width: 30px;
  padding-right: 100px;
}
</style>
