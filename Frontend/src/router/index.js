import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Dogs from "../components/Dogs/DogsPage.vue";
import Commands from "../components/Commands/CommandsPage.vue";

import Experience from "../components/Experiences/ExperiencesPage.vue";
import Trainers from "../components/Trainers/TrainerPage.vue";

import Customers from "../components/Customers/CustomerPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/Dogs",
      name: "Dogs",
      component: Dogs,
    },
    {
      path: "/Commands",
      name: "Commands",
      component: Commands,
    },
    {
      path: "/Experience",
      name: "Experience",
      component: Experience,
    },
    {
      path: "/Trainers",
      name: "Trainers",
      component: Trainers,
    },
    {
      path: "/Customers",
      name: "Customers",
      component: Customers,
    },
  ],
});

export default router;
