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
    <mu-checkbox v-model="isCollection" @change="collectionChange" class="like" uncheckIcon="favorite_border" checkedIcon="favorite"/>
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
      component:'index',
      isCollection:false
    }
  },
  methods:{
    async getGoodsById(){
      let res = await this.api.getGoodsById(this.$route.params.id)
      this.goods = res.data
      if (this.goods) {
        await this.goods_isCollection()
        this.visible = true
      }else {
        alert('无商品详情,即将返回!')
        this.$router.go(-1)
      }
    },
    async goods_isCollection(){
      let res = await this.api.goods_isCollection(this.$route.params.id)
      if (res) {
        this.isCollection = res.data
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
    },
    async collectionChange(val){
      if (true) {
        await this.api.goods_collection(this.$route.params.id)
      }else {
        await this.api.goods_delCollections([{id:this.$route.params.id}])
      }
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
  .like{
    position: fixed;
    z-index: 1;
    right: calc(6% + 5px);
    bottom:133px;
    width: 30px;
    height: 30px;
  }
  .img-continer{
    background-size: cover;
    height: 45vh
  }
</style>
