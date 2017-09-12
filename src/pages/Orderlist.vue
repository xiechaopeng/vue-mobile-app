<template lang="html">
  <div>
    <my-header title="订单列表" :headerBg="1">
      <div slot="title" style="position:relative;display:flex;align-items:center;width:100%;justify-content: center">
        <div @click="open=!open" style="position:absolute;left:0;height:100%;top:0;width:100%;text-align:center;display:flex;align-items:center;justify-content: center">
          {{typeTitle[openIndex]}}订单
          <i class="material-icons">arrow_drop_down</i>
        </div>
        <mu-icon-menu icon="" :open="open" :value="openIndex" @change="handleChange" @open="handleOpen" @close="handleClose">
          <mu-menu-item :key="index" :value="index" :title="''+item" v-for="item,index in typeTitle" />
        </mu-icon-menu>
      </div>
    </my-header>
    <scroll-continer marginBottom="56px" marginTop="48px">
      <div style="padding:2% 1%">
        <div style="margin-bottom:.5rem" v-if="orderlist.length>0" v-for="item,index in orderlist">
          <list-card @cancelOrder="cancelOrder" :data="item"></list-card>
        </div>
        <div v-if="orderlist.length==0" style="text-align:center">
          <br>
          <mu-raised-button label="目前暂无订单!!" secondary/>
          <br><br>
          <span style="color:#ccc">
            客官 不点点?_?
          </span>
        </div>
      </div>
      <!-- <img-div height="150px" imgUrl="http://www.z4a.net/images/2017/08/27/894768fcef.jpg"></img-div> -->
    </scroll-continer>
  </div>
</template>

<script>
import myHeader from '@/components/header'
import listCard from '@/components/listCard'
export default {
  components: {
    myHeader,
    listCard
  },
  data() {
    return {
      open: false,
      openIndex: 0,
      typeTitle: ['所有的', '待发货', '待付款', '今日的', '待确认', '待评价', '已完成'],
      orderlist: []
    }
  },
  computed: {
    type() {
      this.openIndex = Number(this.$route.params.type)
      return Number(this.$route.params.type)
    }
  },
  methods: {
    async cancelOrder(id){
      await this.api.cancelOrder(id)
      let type = [-1, 2, 1, -1, 2, 2, 7]
      this.getOrderlist(type[this.type])
    },
    handleOpen() {
      this.open = true
    },
    handleClose() {
      this.open = false
    },
    handleChange(val) {
      this.openIndex = val
      let type = [-1, 2, 1, -1, 2, 2, 7]
      this.getOrderlist(type[val])
    },
    async getOrderlist(type) {
      let res = await this.api.getOrderlist(type)
      this.orderlist = []
      let status = {
        1: 1,
        2: 0,
        3: 2,
        4: 2,
        5: 2,
        7: 3
      }
      res.data.forEach((item) => {
        if (item.status != 9) {
          this.orderlist.push({
            title: item.firTitle,
            type: status[item.status],
            id: item.id,
            time: item.createTime,
            price: item.productNum,
            count: item.productNum,
            titleCount: item.firNum
          })
        }
      })
    }
  },
  mounted() {
    let type = [-1, 2, 1, -1, 2, 2, 7]
    this.getOrderlist(type[this.type])
  }
}
</script>

<style lang="css">
</style>
