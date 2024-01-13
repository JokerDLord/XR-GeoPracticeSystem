import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/introduction',
    },
    {
      path: '/home',
      redirect: '/introduction',
    },
    {
      path: '/introduction',
      name: '平台介绍',
      component: () => import('../views/introduction.vue'),
    },
    {
      path: '/datadownload',
      name: '数据下载',
      component: () => import('../views/datadownload.vue'),
    },
    {
      path: '/operation',
      name: '平台操作步骤',
      component: () => import('../views/operation.vue'),
    },
    {
      path: '/plantsurvey',
      name: '植物调查',
      component: () => import('../views/plantsurvey.vue'),
    },
    {
      path: '/plantquiz',
      name: '植物小测试',
      component: () => import('../views/plantquiz.vue'),
    },
  ],
})

export default router
