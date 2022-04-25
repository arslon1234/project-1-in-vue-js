import { createRouter, createWebHistory } from 'vue-router'
import Bce from '../views/Bce.vue'
import Новости from '../views/Новости.vue'
import События from '../views/События.vue'
import Акции from '../views/Акции.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Bce',
      component: Bce
    },
    {
      path: '/Новости',
      name: 'Новости',
      component: Новости
    },
    {
      path: '/События',
      name: 'События',
      component: События
    },
    {
      path: '/Акции',
      name: 'Акции',
      component: Акции
    },
  ]
})

export default router
