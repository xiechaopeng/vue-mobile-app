<template lang="html">
  <div>
    <my-header :headerBg="1" :title="title[type]"></my-header>
    <scroll-continer style="padding:0 1%" marginTop="48px" marginBottom="56px">
      <div style="margin-top:1rem">
        <div v-for="item,index in goods" style="margin-top:.5rem">
          <goods-item :type="type" :data="item"></goods-item>
          <mu-divider/>
          <div v-if="index == goods.length-1" style="color:#ccc;text-align:center;font-size:12px;margin:.5rem 0">
            到底了(⊙o⊙)哦一共{{goods.length}}个结果
          </div>
        </div>
      </div>

    </scroll-continer>
  </div>
</template>

<script>
import myHeader from '@/components/header'
import goodsItem from '@/components/goodsItem'
export default {
  components:{
    myHeader,goodsItem
  },
  data(){
    return {
      goods:[],
      title:['经常购买','限量特价','我的收藏']
    }
  },
  computed:{
    type(){
      return this.$route.params.type
    }
  },
  methods:{
    async getGoodList(){
      if (this.type==0) {
        let res = await this.api.getOften()
        this.goods = res.data || []
      }
      if (this.type==1) {
        let res = await this.api.getDiscount()
        this.goods = res.data.items || []
      }
      if (this.type==2) {
        let res = await this.api.getCollections()
        this.goods = res.data || []
      }
    }
  },
  mounted(){
    this.getGoodList()
  }
}
</script>

<style lang="css">
</style>
