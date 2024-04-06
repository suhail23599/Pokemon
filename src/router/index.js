import { createRouter, createWebHistory } from "vue-router"
import ListView from '@/pages/ListView.vue'
import DetailView from '@/pages/DetailView.vue'
const routes = [
  {
    path: '/',
    name: 'List',
    component: ListView
  },
  {
    path: '/detail',
    name: 'Detail',
    component: DetailView
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router