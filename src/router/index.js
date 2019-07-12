import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
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
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: 'Home', icon: 'home' }
    }]
  },
  {
    path: '/search',
    component: Layout,
    children: [{
      path: 'search',
      name: 'Search',
      component: () => import('@/views/search/index'),
      meta: { title: 'Search', icon: 'search' }
    }]
  },
  {
    path: '/polygon-selection',
    component: Layout,
    children: [{
      path: 'polygon',
      name: 'Polygon',
      component: () => import('@/views/polygon/index'),
      meta: { title: 'Polygon Selection', icon: 'hexagon' }
    }]
  },
  {
    path: '/data-mining',
    component: Layout,
    name: 'DataMining',
    meta: { title: 'Data Mining', icon: 'analytics' },
    children: [
      {
        path: 'classification',
        name: 'Classification',
        component: () => import('@/views/mining/classification/index'),
        meta: { title: 'Classification' }
      },
      {
        path: 'clustering',
        name: 'Clustering',
        component: () => import('@/views/mining/clustering/index'),
        meta: { title: 'Clustering' }
      },
      {
        path: 'association-rule',
        name: 'AssociationRule',
        component: () => import('@/views/mining/association-rule/index'),
        meta: { title: 'Association Rule' }
      },
      {
        path: 'neural-network',
        name: 'NeuralNetwork',
        component: () => import('@/views/mining/neural-network/index'),
        meta: { title: 'Neural Network' }
      }
    ]
  },

  {
    path: '/data-visualization',
    component: Layout,
    children: [
      {
        path: 'data-visualization',
        name: 'DataVisualization',
        component: () => import('@/views/visualization/index'),
        meta: { title: 'Data Visualization', icon: 'visualization' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table-plus' }
      }
    ]
  },
  {
    path: '/export',
    component: Layout,
    children: [
      {
        path: 'export',
        name: 'Export',
        component: () => import('@/views/export-data/index'),
        meta: { title: 'Export', icon: 'link' }
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

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
