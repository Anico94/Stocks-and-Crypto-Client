import axios from "axios";
// import { createApp } from "vue";
// import VueFlashMessage from "vue-flash-message";
// import "vue-flash-message/dist/vue-flash-message.min.css";

// const app = createApp();
// app.use(VueFlashMessage, {
//   messageOptions: {
//     timeout: 3000,
//     pauseOnInteract: true,
//   },
// });

// const vueInstance = app.mount("#app");

// when I deploy this will have to change to the deployed address ?
const baseURL = "http://localhost:1337/users/";
const loginURL = "http://localhost:1337/login/";

const handleError =
  (fn) =>
  (...params) =>
    fn(...params).catch((error) => {
      console.log(`${error.response.status}: ${error.response.statusText}`);
      // vueInstance.flash(
      //   `${error.response.status}: ${error.response.statusText}`,
      //   "error"
      // );
    });

export const api = {
  checkForUser: handleError(async (payload) => {
    const res = await axios.post(loginURL, payload);
    return res.data;
  }),
  getUser: handleError(async () => {
    const res = await axios.get(baseURL, {
      headers: { token: localStorage.getItem("token") },
    });
    return res.data;
  }),
  getUsers: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteUser: handleError(async (id) => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),
  createUser: handleError(async (payload) => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  updateUser: handleError(async (payload) => {
    const res = await axios.put(baseURL + payload._id, payload);
    return res.data;
  }),
};
