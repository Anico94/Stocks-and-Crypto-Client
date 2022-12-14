import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
const app = createApp(App);
app.use(BootstrapVue);
app.use(IconsPlugin);

createApp(App).use(router).mount("#app");
