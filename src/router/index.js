import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '首页',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }],
    hidden: true
  },

  {
    path: '/frontend',
    component: Layout,
    meta: { title: '前端开发', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'frontend',
        name: '前端开发',
        component: () => import('@/views/website/index'),
        meta: { title: '前端开发', icon: 'el-icon-s-platform', id: 1 }
      }
    ]
  },
  {
    path: '/backend',
    component: Layout,
    meta: { title: '后端开发', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'backend',
        name: '后端开发',
        component: () => import('@/views/website/index'),
        meta: { title: '后端开发', icon: 'el-icon-s-order', id: 7 }
      }
    ]
  },
  {
    path: '/life',
    component: Layout,
    meta: { title: '生活娱乐', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'life',
        name: '生活娱乐',
        component: () => import('@/views/website/index'),
        meta: { title: '生活娱乐', icon: 'el-icon-headset', id: 2 }
      }
    ]
  },
  {
    path: '/study',
    component: Layout,
    meta: { title: '学习提升', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'study',
        name: '学习提升',
        component: () => import('@/views/website/index'),
        meta: { title: '学习提升', icon: 'el-icon-edit', id: 6 }
      }
    ]
  },
  {
    path: '/resources',
    component: Layout,
    meta: { title: '图片素材', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'resources',
        name: '图片素材',
        component: () => import('@/views/website/index'),
        meta: { title: '图片素材', icon: 'el-icon-picture', id: 3 }
      }
    ]
  },
  {
    path: '/tools',
    component: Layout,
    meta: { title: '软件工具', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tools',
        name: '软件工具',
        component: () => import('@/views/website/index'),
        meta: { title: '软件工具', icon: 'el-icon-s-cooperation', id: 4 }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
