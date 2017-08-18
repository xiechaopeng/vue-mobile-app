import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/Index'], resolve)
    },
    {
      path: '/classify',
      name: 'classify',
      component: resolve => require(['@/pages/Classify'], resolve)
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: resolve => require(['@/pages/ShoppingCart'], resolve)
    },
    {
      path: '/face',
      name: 'face',
      component: resolve => require(['@/pages/Face'], resolve)
    }
  ]
})
