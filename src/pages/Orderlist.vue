<template lang="html">
  <div>
    <my-header title="订单列表" :headerBg="1">
      <div slot="title" style="position:relative;display:flex;align-items:center;width:100%;justify-content: center">
        <div @click="open=!open" style="position:absolute;left:0;height:100%;top:0;width:100%;text-align:center;display:flex;align-items:center;justify-content: center">
          {{getTitle()}}
          <i class="material-icons">arrow_drop_down</i>
        </div>
        <mu-icon-menu icon="" :open="open" :value="openIndex" @change="handleChange" @open="handleOpen" @close="handleClose">
          <mu-menu-item :key="index" :value="item.type" :title="item.text" v-for="item,index in typeTitle" />
        </mu-icon-menu>
      </div>
    </my-header>
    <scroll-continer marginBottom="56px" marginTop="48px">
      <div style="padding:2% 1%">
        <div style="margin-bottom:.5rem" v-if="orderlist.length>0" v-for="item,index in orderlist">
          <template v-if="item">
            <list-card @cancelOrder="cancelOrder" :data="item"></list-card>
          </template>
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
    <mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topTipVisible">
      <div>
        <mu-icon class="cancel-loading"value="cached"/>
      </div>
      <div>
        {{topTip}}
      </div>
    </mu-popup>
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
      openIndex: -1,
      typeTitle: [{
        type: -1,
        text: '全部的'
      }, {
        type: 2,
        text: '已支付'
      }, {
        type: 1,
        text: '待付款'
      }, {
        type: 7,
        text: '已完成'
      }],
      orderlist: [],
      topTipVisible:false,
      topTip: '取消订单中...'
    }
  },
  computed: {
    type() {
      this.openIndex = Number(this.$route.params.type)
      return Number(this.$route.params.type)
    }
  },
  methods: {
    getTitle() {
      let text = ''
      this.typeTitle.forEach((item) => {
        if (item.type == this.openIndex) {
          text = item.text
        }
      })
      return text + '订单'
    },
    async cancelOrder(id) {
      this.topTipVisible = true
      await this.api.cancelOrder(id)
      this.getOrderlist(this.type)
      this.topTipVisible = false
    },
    handleOpen() {
      this.open = true
    },
    handleClose() {
      this.open = false
    },
    handleChange(val) {
      this.openIndex = val
      this.getOrderlist(this.openIndex)
    },
    async getOrderlist(type) {
      let res = await this.api.getOrderlist(type)
      this.orderlist = []
      res.data.forEach((item) => {
        if (item.status != 9) {
          this.orderlist.push({
            title: item.firTitle,
            type: item.status,
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
    this.getOrderlist(this.type)
  }
}
</script>

<style lang="css">
.popup-top{
  /*opacity: .8;*/
  background: #fff;
  width: 100%;
  text-align: center;
  height: 48px;
  /*line-height: 48px;*/

}
.cancel-loading{
  animation:rotating 1.5s linear infinite
}
@keyframes rotating{
  from{transform:rotate(0)}
  to{transform:rotate(360deg)}
}

</style>
