import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _57062649 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _a2cc1754 = () => interopDefault(import('../pages/room/_id.vue' /* webpackChunkName: "pages/room/_id" */))
const _e542f99c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _57062649,
    name: "login"
  }, {
    path: "/room/:id?",
    component: _a2cc1754,
    name: "room-id"
  }, {
    path: "/",
    component: _e542f99c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
