import Router from 'vue-router'
import Vue from 'vue'
import Home from '../application/Home'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        redirect: '/recommend'
      },
      {
        path: '/recommend',
        component: () => import('../application/Recommend')
      },
      {
        path: '/singers',
        component: () => import('../application/Singers')
      },
      {
        path: '/rank',
        component: () => import('../application/Rank')
      },
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})
