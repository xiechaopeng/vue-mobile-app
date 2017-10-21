<template lang="html">
  <div>
    <my-header :headerBg="1" title="确认订单"></my-header>
    <scroll-continer marginBottom="112px" marginTop="48px">
      <div style="padding:0 2% " v-for="item,index in checkList" v-if="index<=(showMore?checkList.length:0)">
        <div class="shoppingCarItem">
          <mu-paper class="img" :zDepth="2" :style="{'background-image':'url('+item.imgUrl+')'}">
          </mu-paper>
          <div class="content">
            <div class="flex">
              <span v-html="item.title.split('&')[0]"></span>
            </div>
            <div class="flex grey">
              <div class="item">
                <div class="price">
                  <span style="font-size:12px">
                    小计
                  </span>¥{{item.price*item.count}}
                </div>
                <div style="font-size:12px">
                  共{{item.count || 0}}件
                </div>
              </div>
            </div>
          </div>
        </div>
        <mu-divider/>
        <div @click="showMore=true" style="color:#aaa;font-size:12px;padding:5px 0;display:flex" v-if="index==0 && checkList.length>1 && !showMore">
          <span>等{{checkList.length-1}}件商品</span>
          <i class="bottom-arrow"></i>
        </div>
        <div @click="showMore=false" style="color:#aaa;font-size:12px;padding:5px 0;display:flex" v-if="index==checkList.length-1 && showMore">
          <span>收起商品列表</span>
          <i class="top-arrow"></i>
        </div>
      </div>
      <div style="padding:0 2%;font-size:13px;margin-top:.5rem">
        <div style="color:#aaa">
          {{orderShipping.receiverName||'未设置联系人'}} - {{orderShipping.receiverPhone||'未设置联系方式'}}
        </div>
        <div style="margin-bottom:.5rem;display:flex;justify-content:space-between">
          <div style="height:16px;flex:1" v-text-overflow >送至：{{orderShipping.receiverAddress||'未设置收货地址'}}</div>
          <span v-if="orderShipping.receiverAddress" style="color:#aaa;margin-left:.5rem">切换</span>
          <span @click="$router.push('/addAddress')" v-else style="color:#aaa;margin-left:.5rem">添加</span>
        </div>
        <mu-divider/>
      </div>
      <div style="padding:0 2%;font-size:14px;margin-top:.5rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;">
          <div>
            付款方式
          </div>
          <div>
            <mu-checkbox label="在线支付" v-model="saleOrder.paymentTypeFlag"/>
          </div>
        </div>
        <mu-divider/>
      </div>
      <div style="padding:0 2%;font-size:14px;margin-top:.5rem">
        <div>
          留言备注
        </div>
        <div>
          <mu-text-field v-model="saleOrder.buyerMessage" style="font-size:14px" hintText="还有点什么吩咐~" multiLine :rows="3" :rowsMax="6" fullWidth/>
        </div>
      </div>
      <div style="padding:0 2%;font-size:12px;display:flex;justify-content:space-between;align-items:center">
          <div v-for="item,index in tags" style="display:flex;justify-content:space-between;align-items:center">
            <mu-icon :size="16" :value="item.icon" :color="item.color" slot="icon"/>
            &nbsp;{{item.text}}
          </div>
      </div>
    </scroll-continer>
    <mu-divider/>
    <div class="shoppingCart-bottom">
      <div class="price">
        <span>
          总计：¥
        </span>
        <span class="totalPrice">{{totalPrice+saleOrder.delivery}}</span>
        <span style="font-size:12px;margin-left:0.5rem">
          含配送费：¥{{saleOrder.delivery}}
        </span>
      </div>
      <button @click="submit" class="btn" type="button" name="button">
        立刻付款
      </button>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components: {
    myHeader
  },
  data(){
    return {
      showMore:false,
      saleOrder:{
        payment:'',
        paymentType:1,
        paymentTypeFlag:true,
        delivery:10,
        buyerMessage:''
      },
      tags:[
        {
          text:'极速发货',
          icon:'flight_takeoff',
          color:'red'
        },
        {
          text:'准时送达',
          icon:'timer',
          color:'red'
        },
        {
          text:'骑手专送',
          icon:'drive_eta',
          color:'red'
        },
        {
          text:'售后无忧',
          icon:'perm_phone_msg',
          color:'red'
        }
      ]
    }
  },
  computed: {
    checkList() {
      return this.$store.state.checkList
    },
    totalPrice() {
      let checkList = this.$store.state.checkList
      let totalPrice = 0
      checkList.forEach((item) => {
        totalPrice += item.count * item.price
      })
      this.saleOrder.payment = totalPrice
      return totalPrice
    },
    address(){
      let address = this.$store.state.address
      return address
    },
    orderShipping(){
      let address = this.$store.state.address
      let defaultAddress = ''
      address.forEach((item)=>{
        if (item.default) {
          defaultAddress = item
        }
      })
      if (address.length == 1) {
        defaultAddress = address[0]
      }
      let orderShipping = {
        receiverAddress:defaultAddress.detail,
        receiverName:defaultAddress.user,
        receiverPhone:defaultAddress.phone
      }
      return orderShipping
    }
  },
  methods:{
    async submit(){
      if (this.orderShipping.receiverAddress && this.orderShipping.receiverPhone) {
        this.saleOrder.paymentType = this.saleOrder.paymentTypeFlag?1:0
        let orderDetails = []
        this.checkList.forEach((item)=>{
          orderDetails.push({
            productId:item.id,
            image:item.imgUrl,
            num:item.count,
            title:item.title,
            totalFee:item.price*item.count
          })
        })
        let req = {
          orderShipping:this.orderShipping,
          saleOrder:this.saleOrder,
          orderDetails:orderDetails
        }
        req.openId = localStorage.openid
        let res = await this.api.order(req)
        if (res) {
          this.$store.commit('order',this.checkList)
          this.$store.commit('setCheckList',[])
          // let {appId,timeStamp,nonceStr,signType,paySign} = res.data
          // let wxpackage = res.data.package
          this.pay({
            appId:res.data.appId,
            timeStamp:res.data.timeStamp,
            nonceStr:res.data.nonceStr,
            signType:res.data.signType,
            paySign:res.data.paySign,
            package:res.data.package
          })
          // this.$router.replace(`/orderSuccess?appId=${appId}&timeStamp=${timeStamp}&nonceStr=${nonceStr}&package=${wxpackage}&signType=${signType}&paySign=${paySign}`)
        }
      }else {
        alert('请至少填写收货地址和联系方式')
      }
    },
    async getAddress(){
      let res = await this.api.getUserAddress()
      this.$store.commit('setAddress',res.data)
    },
    pay(rq) {
      let _this = this
      function onBridgeReady() {
        let timeStamp = Number(Date.parse(new Date()))/1000
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": rq.appId, //公众号名称，由商户传入
            "timeStamp": rq.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr": rq.nonceStr, //随机串
            "package": rq.package,
            "signType": rq.signType, //微信签名方式：
            "paySign": rq.paySign //微信签名
          },
          function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              _this.$router.replace('/orderSuccess')
            } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady()
      }
    }
  },
  mounted(){
    if (this.address.length==0&&localStorage.token) {
      this.getAddress()
    }
  }

}
</script>

<style lang="scss" scoped>
.bottom-arrow {
    height: 16px;
    width: 16px;
    display: block;
    position: relative;
}
.bottom-arrow:before{
    content: '';
    height: 0;
    width: 0;
    display: block;
    border: 5px transparent solid;
    border-bottom-width: 0;
    border-top-color: #aaa;
    position: absolute;
    top: 5px;
    left: 5px;
}
.top-arrow {
    height: 16px;
    width: 16px;
    display: block;
    position: relative;
}
.top-arrow:before{
    content: '';
    height: 0;
    width: 0;
    display: block;
    border: 5px transparent solid;
    border-top-width: 0;
    border-bottom-color: #aaa;
    position: absolute;
    top: 5px;
    left: 5px;
}
.shoppingCarItem {
    display: flex;
    justify-content: space-between;
    // border-bottom: 1px solid #ccc;
    padding: 10px 0;
    .img {
        width: 30%;
        height: 70px;
        background-size: cover;
    }
    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 65%;
        .grey {
            color: #aaa;
            font-size: 0.8rem;
        }
        .price {
            color: #ff5252;
            font-size: 1rem;

        }
        .del {
            color: #ff5252;
        }
        .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                flex: 1;
            }
            .item {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .control-item {
                width: 30%;

            }
            .control {
                display: flex;
                align-items: center;
                margin-right: 0.5rem;
                input {
                    width: 40px;
                    text-align: center;
                    border: 1px solid #41464b;
                    margin: 0 5px;
                }
                .icon {
                    font-size: 1.1rem;
                    color: #41464b;
                }
            }
        }
    }
}
.shoppingCart-bottom {
    height: 56px;
    display: flex;
    // position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    padding-left: 1%;
    .price {
        color: #ff5252;
        display: flex;
        align-items: center;
    }
    .totalPrice {
        font-size: 1.5rem;
    }
    .btn {
        border: none;
        height: 56px;
        width: 40%;
        background-color: #ff5252;
        color: #fff;
        font-size: 1rem;
    }
}
</style>
