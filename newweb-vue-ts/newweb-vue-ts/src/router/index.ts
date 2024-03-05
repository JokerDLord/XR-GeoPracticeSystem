import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
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
      path: '/basicInfo',
      name: '实习区基本情况',
      component: () => import('../views/basicInfo.vue'),
    },
    {
      path: '/siteintro',
      name: '实习点漫游',
      component: () => import('../views/siteintro.vue'),
    },
    {
      path: '/plantintro',
      name: '植物概况',
      component: () => import('../views/plantintro.vue'),
    },
    {
      path: '/plantquiz',
      name: '植物小测试',
      component: () => import('../views/plantquiz.vue'),
    },
    {
      path: '/plantSurvey',
      name: '植被样方调查',
      component: () => import('../views/plantSurvey.vue'),
    },
    {
      path: '/soilSurvey',
      name: '土壤剖面观察',
      component: () => import('../views/soilSurvey.vue'),
    },
    {
      path: '/introDimao',
      name: '地质地貌概况',
      component: () => import('../views/introDimao.vue'),
    },
    {
      path: '/jiaoxueDimao',
      name: '实习教学内容-地貌',
      component: () => import('../views/jiaoxueDimao.vue'),
    },
    {
      path: '/watershed',
      name: '流域绘制',
      component: () => import('../views/watershed.vue'),
    },
    {
      path: '/multiTemporal',
      name: '多时相遥感',
      component: () => import('../views/multiTemporal.vue'),
    },
    {
      path: '/gallery',
      name: '实习点概览',
      component: () => import('../views/gallery.vue'),
      // children: [
      //   {
      //     path: '/xiaohongshu',
      //     component: () => import('../views/xiaohongshu.vue'),
      //   }
      // ]
    },
    {
      path: '/xiaohongshu',
      name: 'xiaohongshu',
      component: () => import('../views/xiaohongshu.vue'),
    },
  ],
})

export default router
