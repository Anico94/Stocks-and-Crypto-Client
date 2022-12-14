import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../views/LoginPage.vue";
import SignUp from "../views/SignUp.vue";
// import HomePage from "../views/HomePage.vue";
import LandingPage from "../views/LandingPage.vue";
import SingleStock from "../views/SingleStock";

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/landing",
    name: "landing",
    component: LandingPage,
  },
  {
    path: "/singlestock/:stockCode",
    name: "singletock",
    component: SingleStock,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

// export default router
