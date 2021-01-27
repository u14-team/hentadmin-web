import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index.html',
    redirect: '/auth'
  },
  {
    path: '/auth',
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
  { path: '/bot', redirect: '/overview' },
  {
    path: '/bot/:id',
    name: 'Bot',
    component: () => import(/* webpackChunkName: "bot" */ '../views/Bot.vue'),
    children: [
      { path: '', redirect: 'overview' },
      { path: 'overview', component: () => import(/* webpackChunkName: "bot" */ '../views/Bot/Overview.vue') },
      { path: 'console', component: () => import(/* webpackChunkName: "bot" */ '../views/Bot/Console.vue') },
      { path: 'errors', component: () => import(/* webpackChunkName: "bot" */ '../views/Bot/Errors.vue') },
      { path: 'plugins', component: () => import(/* webpackChunkName: "bot" */ '../views/Bot/Plugins.vue') },
      { path: 'fs', component: () => import(/* webpackChunkName: "bot" */ '../views/Bot/FileManager.vue') },
      { path: 'fs/:path(.+)', component: () => import(/* webpackChunkName: "bot" */ '../views/Bot/FileManager.vue') }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/Error/404.vue')
  }
]

export default new VueRouter({ routes, mode: 'history', base: '/' })
