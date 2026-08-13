import "./index.css";
import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBilibili, faGithub } from "@fortawesome/free-brands-svg-icons";
import App from "./App.vue";

// 注册 FontAwesome 品牌图标（按需注册，避免打包体积过大）
library.add(faBilibili, faGithub);

const app = createApp(App);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.mount("#root");
