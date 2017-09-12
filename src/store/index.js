import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      shoppingCartSheetOpen:false,
      shoppingCartSheetItem:{},
      shoppingCartList:[],
      checkList:[],
      categoryList:[],
      orderlist:[{
        type:1,
        msg:'待发货',
        list:[],
        bgColor:'#66bb6a'
      },{
        type:2,
        msg:'待付款',
        list:[],
        bgColor:'#ef5350'
      },{
        type:3,//日期订单
        dateType:0,
        msg:['今日的','近1周','近1月','近3月'],
        list:[],
        bgColor:'#ffb300'
      },{
        type:4,
        msg:'待确认',
        list:[],
        bgColor:'#039be5'
      },{
        type:5,
        msg:'待评价',
        list:[],
        bgColor:'#00bcd4'
      },{
        type:6,
        msg:'已完成',
        list:[],
        bgColor:'#3f51b5'
      }],
      address:[
        // {
        //   phone:18983847794,
        //   detail:'重庆市南岸区崇文路2号',
        //   user:'谢超鹏',
        //   default:false
        // }
      ]
    },
    actions,
    mutations,
    getters
  })
}
