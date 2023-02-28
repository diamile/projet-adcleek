import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props:true
    },
    {
      path: '/detail/:city',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
      props:true
    }
  ]
})

export default router
