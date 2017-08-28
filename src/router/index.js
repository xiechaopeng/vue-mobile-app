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
      redirect:'/classify/index',
      component: resolve => require(['@/pages/Classify'], resolve),
      children:[
        {
          path:'index',
          component: resolve => require(['@/pages/classify/index'], resolve),
        },
        {
          path:'detail',
          component: resolve => require(['@/pages/classify/detail'], resolve),
        }
      ]
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
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: resolve => require(['@/pages/Detail'], resolve),
    },
    {
      path: '/user/:type',
      name: 'user',
      component: resolve => require(['@/pages/User'], resolve),
    },
    {
      path: '/orderlist/:type',
      name: 'orderlist',
      component: resolve => require(['@/pages/Orderlist'], resolve),
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: resolve => require(['@/pages/AddAddress'], resolve),
    }
  ]
})
