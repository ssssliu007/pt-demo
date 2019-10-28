import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import form from '@/pages/form'


Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/form',
      name: 'form',
      component: form
    }
  ]
})

export default router