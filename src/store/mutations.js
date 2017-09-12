import Vue from 'vue'

var objDeepCopy = function (source) {
    var sourceCopy = source instanceof Array ? [] : {};
    for (var item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
    }
    return sourceCopy;
}

export default {
  openShoppingCart: (state, payload) => {
    state.shoppingCartSheetItem = payload
    state.shoppingCartSheetOpen = true
  },
  closeShoppingCart: (state) => {
    state.shoppingCartSheetOpen = false
  },
  pushShoppingCartList: (state, payload) => {
    let pushFlag = true
    state.shoppingCartList.forEach((item) => {
      if (item.id == payload.id) {
        item.count = item.count + payload.count
        pushFlag = false
      }
    })
    if (pushFlag) {
      state.shoppingCartList.push(payload)
    }
    console.log(state.shoppingCartList);
  },
  popShoppingCartList: (state, index) => {
    state.shoppingCartList.splice(index, 1)
  },
  shoppingCartListChangeCount: (state, {
    index,
    count
  }) => {
    let temp = state.shoppingCartList[index]
    temp.count = count
    state.shoppingCartList.splice(index, 1, temp)
  },
  deleteAddress:(state, payload)=>{
    state.address.forEach((item,index)=>{
      if (item.id==payload) {
        state.address.splice(index,1)
      }
    })
  },
  setAddress: (state, payload) => {
    state.address = []
    payload.forEach((item) => {
      let temp = item
      temp.detail = item.address
      temp.user = item.recname
      temp.phone = item.recphone
      temp.default = item.acquiescence == 1
      state.address.push(temp)
    })
  },
  setCheckList: (state, payload) => {
    let checkList = []
    state.shoppingCartList.forEach((item) => {
      payload.forEach((id) => {
        if (id == item.id && !item.hide) {
          checkList.push(item)
        }
      })
    })
    state.checkList = checkList
  },
  order: (state, checkList) => {
    state.shoppingCartList.forEach((item, index) => {
      checkList.forEach((checkListItem, checkListIndex) => {
        if (checkListItem.id == item.id) {
          let temp = item
          temp.hide = true
          state.shoppingCartList.splice(index,1,temp)
        }
      })
    })
    // state.shoppingCartList = temp
  },
  setOrderlist: (state, payload) => {
    state.orderlist.forEach((item0) => {
      item0.list = []
      payload.forEach((item1) => {
        if (item0.type == item1.type) {
          item0.list.push(item1)
        }
      })
    })
  }
}
