import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/auth/FormLogin.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/components/auth/ViewProfile.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/auth/FormRegister.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/cart',
      name: 'shopping-carts',
      component: () => import('@/views/ShoppingCarts.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: () => import('@/components/NotFound.vue')
    },
    {
      path: '/book/:id',
      name: 'bookDetail',
      component: () => import('@/views/BookDetail.vue')
    }
  ]
})

export default router
