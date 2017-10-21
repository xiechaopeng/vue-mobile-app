<template lang="html">
  <div>
    <my-header :headerBg="1" title="成功下单"></my-header>
    <scroll-continer marginBottom="56px" marginTop="48px">
      <div style="text-align:center;margin-top:2rem">
        <mu-icon :size="30" value="favorite" color="#ff5252" slot="icon"/>
        <h2>下单成功</h2>
        <span style="color:#aaa">
          谢谢你这么好看 还在这shopping~ 比心ღ( ´･ᴗ･` )
        </span>
        <!-- <div style="margin-top:2rem">
          <mu-raised-button @click="pay" label="立即付款" secondary/>
        </div> -->
        <div style="margin-top:2rem">
          <mu-raised-button @click="$router.replace('/')" label="返回首页"/>
        </div>
      </div>
    </scroll-continer>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components: {
    myHeader
  },
  computed:{
    rq(){
      return this.$route.query
    }
  },
  methods: {
    pay() {
      let rq = this.rq
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
              _this.$router.replace('/index')
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
  }
}
</script>

<style lang="css">
</style>
