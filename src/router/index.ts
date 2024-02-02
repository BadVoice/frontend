import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import CompanyDetails from "@/views/CompanyDetails.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/companies/:id",
      name: "CompanyDetails",
      component: CompanyDetails,
    },
  ],
});

export default router;
