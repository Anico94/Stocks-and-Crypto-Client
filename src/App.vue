<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"
          ><img src="./assets/logo.png" alt="Article Image"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <!-- <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                ><router-link to="/">Home</router-link></a
              >
            </li> -->
            <li v-if="userPresent" class="nav-item">
              <a class="nav-link active" aria-current="page" href="#"
                ><router-link to="/landing">Holdings</router-link></a
              >
            </li>
            <li v-if="!userPresent" class="nav-item">
              <a class="nav-link" href="#"
                ><router-link to="/login">Login</router-link></a
              >
            </li>
            <li v-if="!userPresent" class="nav-item">
              <a class="nav-link" href="#"
                ><router-link to="/signup">Sign Up</router-link></a
              >
            </li>
            <li v-if="userPresent" class="nav-item">
              <a @click="logout" class="nav-link" href="#"
                ><router-link to="/login">Log out</router-link></a
              >
            </li>
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li> -->
            <li v-if="userPresent">
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button class="btn btn-secondary btn-sm" type="submit">
                  Search
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view @user-logged-in="setUser" />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      userPresent: false,
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.userPresent = true;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.userPresent = false;
    },
    setUser(value) {
      this.userPresent = value;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

img {
  width: 50px;
}
</style>
