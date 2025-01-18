import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Cart from './pages/Cart.vue'
import Login from './pages/Login.vue'

const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user !== null;
}

const routes = [
  { path: '/', component: Home,
    beforeEnter: (to: any, from: any, next: (to?: string | false | void | Error) => void) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    }
  },
  { 
    path: '/cart', 
    component: Cart,
    beforeEnter: (to: any, from: any, next: (to?: string | false | void | Error) => void) => {
      if (!isAuthenticated()) {
        next('/login');
      } else {
        next();
      }
    }
  },
  { path: '/login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
