import Vue from 'vue'
import App from './App'
import router from './router'
import { createStore } from './store'
const store = createStore()

import MuseUI from 'muse-ui'

import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

Vue.use(MuseUI)

//通用组件
import scrollContiner from './layout/scrollContiner'
import longShadowBtn from './components/longShadowBtn'
import goodsCard from './components/goodsCard'
import imgDiv from './components/imgDiv'

Vue.component('scrollContiner',scrollContiner)
Vue.component('longShadowBtn',longShadowBtn)
Vue.component('goodsCard',goodsCard)
Vue.component('imgDiv',imgDiv)

//自定义全局指令
import textOverflow from './directive/directive'

//导入axios所有接口
Vue.prototype.api = require('./api').default

//开发环境下导入mock假数据处理模块
// if (process.env.NODE_ENV=='development') {
//   require('./mock')
// }


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
