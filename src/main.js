// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui'

import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

Vue.use(MuseUI)

import scrollContiner from './layout/scrollContiner'
import longShadowBtn from './components/longShadowBtn'

Vue.component('scrollContiner',scrollContiner)
Vue.component('longShadowBtn',longShadowBtn)

//导入axios所有接口
Vue.prototype.api = require('./api').default

//开发环境下导入mock假数据处理模块
if (process.env.NODE_ENV=='development') {
  require('./mock')
}


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
