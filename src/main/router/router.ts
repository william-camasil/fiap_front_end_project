import { createRouter, createWebHistory } from "vue-router";

import HomeFactory from "../factories/pages/home/HomeFactory.vue";
import LoginFactory from "../factories/pages/login/LoginFactory.vue";
import MenuOptionsFactory from "../factories/pages/menuOptions/MenuOptionsFactory.vue";
import FinalizeOrderFactory from "../factories/pages/finalizeOrder/FinalizeOrderFactory.vue";

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: HomeFactory,
  },
  {
    path: "/",
    name: "Login",
    component: LoginFactory,
  },
  {
    path: "/MenuOptions/:link",
    name: "MenuOptions",
    component: MenuOptionsFactory,
  },
  {
    path: "/FinalizeOrder/",
    name: "FinalizeOrder",
    component: FinalizeOrderFactory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
