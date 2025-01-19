import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Product from "./pages/Product.vue";
import Cart from "./pages/Cart.vue";
import Login from "./pages/Login.vue";

const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user !== null;
}

const authGuard = (to: any, from: any, next: (to?: string | false | void | Error) => void) => {
  if (!isAuthenticated()) {
    next("/login");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: authGuard, // Appliquer authGuard ici
  },
  { 
    path: "/product/:productId", 
    component: Product,
    beforeEnter: authGuard, // Appliquer authGuard ici aussi
  },
  {
    path: "/cart",
    component: Cart,
    beforeEnter: authGuard, // Appliquer authGuard ici
  },
  { path: "/login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
