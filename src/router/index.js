import { createRouter, createWebHistory } from "vue-router"
import ListView from '@/pages/ListView.vue'

const routes = [
  {
    path: '/list',
    name: 'List',
    component: ListView
  },
  // {
  //   path: '/detail',
  //   name: 'List',
  //   component: ListView
  // }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router