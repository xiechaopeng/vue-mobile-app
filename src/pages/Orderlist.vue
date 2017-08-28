<template lang="html">
  <div>
    <my-header title="订单列表" fixed></my-header>
    <scroll-continer marginBottom="56px">
      <!-- <img-div height="150px" imgUrl="http://www.z4a.net/images/2017/08/27/894768fcef.jpg"></img-div> -->
    </scroll-continer>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components:{
    myHeader
  },
  computed:{
    type(){
      let typeTitle = ['所有订单','待发货','待付款','','待确认收货','待评价','已完成']
      return this.$route.params.type
    }
  }
}
</script>

<style lang="css">
</style>
