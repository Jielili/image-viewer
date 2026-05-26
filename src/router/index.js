// filepath: /Users/lili.jie/project/image-viewer/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import PictureList from '@/views/picture-list.vue'
import Mine from '@/views/mine.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PictureList
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router