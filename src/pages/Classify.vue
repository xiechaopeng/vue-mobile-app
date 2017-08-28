<template lang="html">
  <div>
    <my-header :headerBg="1" title="商品分类"></my-header>
    <scroll-continer marginBottom="56px" marginTop="48px">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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
