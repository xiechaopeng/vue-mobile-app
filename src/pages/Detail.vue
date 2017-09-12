<template lang="html">
  <div >
    <my-header fixed :headerBg="headerBg" title="商品详情"></my-header>
    <scroll-continer v-if="visible" marginBottom="56px" @scrollTopChange="scrollTopChange">
      <div class="img-continer" :style="{'background-image':'url('+goods.images+')'}">

      </div>
      <mu-tabs :value="activeIndex" @change="handleTabChange">
        <mu-tab :value="index" :title="item" :key="index" v-for="item,index in nav"/>
      </mu-tabs>
      <transition name="fade" mode="out-in">
        <component :is="component" :data="goods"></component>
      </transition>
    </scroll-continer>
    <mu-float-button @click.native="shoppingCart" secondary icon="add_shopping_cart" class="add"/>
  </div>
</template>

<script>
import index from './detail/index'
import detail from './detail/detail'
import review from './detail/review'
import myHeader from '@/components/header'
export default {
  components:{
    index,detail,review,myHeader
  },
  data(){
    return {
      visible:false,
      activeIndex:0,
      nav:['商品','详情','评论'],
      headerBg:0,
      goods:'',
      component:'index'
    }
  },
  methods:{
    async getGoodsById(){
      let res = await this.api.getGoodsById(this.$route.params.id)
      this.goods = res.data
      if (this.goods) {
        this.visible = true
      }else {
        alert('无商品详情,即将返回!')
        this.$router.go(-1)
      }
    },
    scrollTopChange(val){
      if (val <= 95) {
        this.headerBg = val / 100
      } else {
        this.headerBg = 95 / 100
      }
    },
    handleTabChange(val){
      this.activeIndex = val
      let path = ['index','detail','review']
      this.component = path[val]
    },
    shoppingCart(){
      this.$store.commit('openShoppingCart',{
        imgUrl:this.goods.images,
        title:this.goods.title.split('&')[0],
        price:this.goods.price,
        stock:this.goods.stock,
        id:this.goods.id
      })
    }
  },
  mounted(){
    this.getGoodsById()
  }
}
</script>

<style lang="scss" scoped>
  .add{
    position: fixed;
    z-index: 1;
    right: 6%;
    bottom: 80px;
    width: 48px;
    height: 48px;
  }
  .img-continer{
    background-size: cover;
    height: 45vh
  }
</style>
