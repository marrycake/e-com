import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/HomeView.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/category/CategoryView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/shopingcart/CartView.vue')
    },
    {
      path: '/owner',
      name: 'owner',
      component: () => import('../views/owner/OwnerView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/404Page.vue')
    }
  ]
})

export default router
