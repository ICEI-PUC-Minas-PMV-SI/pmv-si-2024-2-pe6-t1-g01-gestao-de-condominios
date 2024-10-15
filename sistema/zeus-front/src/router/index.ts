import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Site/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/Site/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Site/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Site/CreateAccount.vue')
    },
    {
      path: '/feed-de-noticias',
      name: 'Feed de Notícias',
      component: () => import('@/views/System/NewsFeed.vue')
    },
    {
      path: '/moradores',
      name: 'Moradores',
      component: () => import('@/views/System/Residents.vue')
    },
    {
      path: '/documentos',
      name: 'Documentos',
      component: () => import('@/views/System/NewsFeed.vue')
    },
    {
      path: '/visitantes',
      name: 'Visitantes',
      component: () => import('@/views/System/Visitors.vue')
    },
    {
      path: '/visitas',
      name: 'Visitas',
      component: () => import('@/views/System/NewsFeed.vue')
    },
    {
      path: '/funcionarios',
      name: 'Funcionários',
      component: () => import('@/views/System/NewsFeed.vue')
    },
    {
      path: '/apartamentos',
      name: 'Apartamentos',
      component: () => import('@/views/System/NewsFeed.vue')
    }
  ]
})

export default router
