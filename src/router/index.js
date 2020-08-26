import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import(/* webpackChunkName: "overview" */ '../views/Overview.vue')
  },
  {
    path: '/devtools',
    name: 'DevTools',
    component: () => import(/* webpackChunkName: "devtools" */ '../views/DevTools.vue')
  },
  { path: '/dashboard', redirect: '/overview' },
  {
    path: '/dashboard/:id',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    children: [
      { path: '', redirect: 'overview' },
      { path: 'overview', component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Overview.vue') },
      { path: 'console', component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Console.vue') },
      { path: 'errors', component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/Errors.vue') },
      { path: 'plugins', component: () => import(/* webpackChunkName: "plugins" */ '../views/Dashboard/Plugins.vue') },
      { path: 'fs', component: () => import(/* webpackChunkName: "fs" */ '../views/Dashboard/FileManager.vue') },
      { path: 'fs/:path(.+)', component: () => import(/* webpackChunkName: "fs" */ '../views/Dashboard/FileManager.vue') }
    ]
  }
]

export default new VueRouter({ routes, mode: 'history', base: '/hentadmin-web/' })
