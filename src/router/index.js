import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Classify from '@/pages/Classify'
import ClassifyIndex from '@/pages/classify/index'
import ClassifyDetail from '@/pages/classify/detail'
import ShoppingCart from '@/pages/ShoppingCart'
import Face from '@/pages/Face'
import Detail from '@/pages/Detail'
import User from '@/pages/User'
import Orderlist from '@/pages/Orderlist'
import Address from '@/pages/Address'
import AddAddress from '@/pages/AddAddress'
import Order from '@/pages/Order'
import OrderSuccess from '@/pages/OrderSuccess'
import Search from '@/pages/Search'
import nofound from '@/pages/404'
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
      component: Index
    },
    {
      path: '/classify',
      name: 'classify',
      redirect:'/classify/index',
      component: Classify,
      children:[
        {
          path:'index',
          component: ClassifyIndex
        },
        {
          path:'detail',
          component: ClassifyDetail
        }
      ]
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },
    {
      path: '/face',
      name: 'face',
      component: Face
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/user/:type',
      name: 'user',
      component: User
    },
    {
      path: '/orderlist/:type',
      name: 'orderlist',
      component: Orderlist
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: AddAddress
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path:'/orderSuccess',
      name: 'orderSuccess',
      component: OrderSuccess
    },
    {
      path:'/search',
      name:'search',
      component: Search
    },
    { path: '*', component: nofound }
  ]
})
