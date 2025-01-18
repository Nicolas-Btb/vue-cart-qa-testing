import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Cart from './pages/Cart.vue'
import Login from './pages/Login.vue'

// Fonction pour vérifier l'authentification
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  return user !== null;
}

const routes = [
  { path: '/', component: Home,
    beforeEnter: (to: any, from: any, next: (to?: string | false | void | Error) => void) => {
      if (!isAuthenticated()) {
        next('/login'); // Redirige vers la page de login si non connecté
      } else {
        next(); // Continue vers la page si connecté
      }
    }
  },
  { 
    path: '/cart', 
    component: Cart,
    beforeEnter: (to: any, from: any, next: (to?: string | false | void | Error) => void) => {
      if (!isAuthenticated()) {
        next('/login'); // Redirige vers la page de login si non connecté
      } else {
        next(); // Continue vers la page si connecté
      }
    }
  },
  { path: '/login', component: Login }, // Route pour la page de login
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
