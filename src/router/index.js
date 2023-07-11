import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/tabbar/TabBar.vue'),
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/tabbar/home/HomeView.vue')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/tabbar/category/CategoryView.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/tabbar/shopingcart/CartView.vue')
        },
        {
          path: 'owner',
          name: 'owner',
          component: () => import('../views/tabbar/owner/OwnerView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Login/RegisterView.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../views/Detail/DetailView.vue')
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
