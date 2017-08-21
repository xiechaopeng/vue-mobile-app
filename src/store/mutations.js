import Vue from 'vue'

export default {
  openShoppingCart: (state, payload) => {
    state.shoppingCartSheetItem = payload
    state.shoppingCartSheetOpen = true
  },
  closeShoppingCart: (state) => {
    state.shoppingCartSheetOpen = false
  },
  pushShoppingCartList:(state,payload)=>{
    let pushFlag = true
    state.shoppingCartList.forEach((item)=>{
      if (item.id == payload.id) {
        item.count = item.count + payload.count
        pushFlag = false
      }
    })
    if (pushFlag) {
      state.shoppingCartList.push(payload)
    }
  },
  popShoppingCartList:(state,index)=>{
    state.shoppingCartList.splice(index,1)
  },
  shoppingCartListCheck:(state,{index,flag})=>{
    let temp = state.shoppingCartList[index]
    temp.check = flag
    state.shoppingCartList.splice(index,1,temp)
  },
  shoppingCartListAllCheck:(state,flag)=>{
    state.shoppingCartList.forEach((item,index)=>{
      let temp = item
      item.check = flag
      state.shoppingCartList.splice(index,1,temp)
    })
  },
  shoppingCartListChangeCount:(state,{index,count})=>{
    let temp = state.shoppingCartList[index]
    temp.count = count
    state.shoppingCartList.splice(index,1,temp)
  }
}
