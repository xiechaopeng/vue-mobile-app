<template>
<div class="hello">
  <search-box :bgOpacity="searchBoxBg" fixed></search-box>
  <scroll-continer marginBottom="56px" @scrollTopChange="scrollTopChange">
    <img src="../assets/index.png" style="width:100%">
    <div class="quick-nav">
      <div v-for="item,index in quickNav">
        <long-shadow-btn>
          <mu-icon :value="item.icon"/>
        </long-shadow-btn>
        <div>{{item.span}}</div>
      </div>
    </div>
    <h1 v-for="n in 20">test</h1>
  </scroll-continer>
</div>
</template>

<script>
import searchBox from '@/components/searchBox'
export default {
  components:{
    searchBox
  },
  data(){
    return {
      searchBoxBg:0,
      quickNav:[{
        span:'最常购买',
        icon:'history',
        bgColor:'',
        shadowColor:''
      },{
        span:'我的订单',
        icon:'format_list_bulleted',
        bgColor:'',
        shadowColor:''
      },{
        span:'限量特价',
        icon:'timer',
        bgColor:'',
        shadowColor:''
      },{
        span:'我的收藏',
        icon:'favorite',
        bgColor:'',
        shadowColor:''
      }]
    }
  },
  methods:{
    scrollTopChange(val){
      if (val<=95) {
        this.searchBoxBg = val/100
      }else {
        this.searchBoxBg = 95/100
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.quick-nav{
  display: flex;
  justify-content: space-around;

}
</style>
