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
        <div style="margin-top:2rem">
          <mu-raised-button @click="$router.replace('/')" label="返回首页"/>
        </div>
        <div style="margin-top:2rem">
          <mu-raised-button @click="$router.replace('/orderlist/0')" label="查看订单" secondary/>
        </div>
      </div>
    </scroll-continer>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components:{
    myHeader
  }
}
</script>

<style lang="css">
</style>
