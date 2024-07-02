import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
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
      component: () => import('@/views/UserProfile.vue')
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
      component: () => import('@/views/CartView.vue')
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
    },
    { 
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/about', '/', '', '/search']

  const authRequired = !publicPages.includes(to.path) && !to.matched.some(record => record.path.startsWith('/book/'))
  const userStore = useUserStore()

  if (authRequired && !userStore.token) {
    alert('You are not authorized to access this or session has ended. Please log in again.')
    return next({ path: '/login', query: { returnUrl: to.fullPath } })
  }
  next()
})

export default router