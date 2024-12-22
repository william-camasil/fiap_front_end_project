import { createRouter, createWebHistory } from "vue-router";

import HomeFactory from "../factories/pages/home/HomeFactory.vue";
import LoginFactory from "../factories/pages/login/LoginFactory.vue";
import MenuOptionsFactory from "../factories/pages/menuOptions/MenuOptionsFactory.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
