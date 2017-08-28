<template>
<div class="hello">
  <search-box inputColor="#41464b" inputBg="#fff" :bgOpacity="searchBoxBg" fixed></search-box>
  <scroll-continer marginBottom="56px" @scrollTopChange="scrollTopChange">
    <!-- <carousel :auto="3000">

    </carousel> -->
    <img v-if="imgList.length>0" style="height:200px;width:100%" :src="imgList[0].imgUrl">

    <div class="quick-nav">
      <div v-for="item,index in quickNav">
        <long-shadow-btn>
          <mu-icon :value="item.icon" />
        </long-shadow-btn>
        <div style="padding:5px 0;">{{item.span}}</div>
      </div>
    </div>
    <div class="activity" v-for="item,index in activity" v-if="item.type>1">
      <div class="header">
        <div class="line">
        </div>
        <div>
          <i class="material-icons icon">starts</i>
          <span class="text">{{item.title}}</span>
          <i class="material-icons icon">starts</i>
        </div>
        <div class="line">
        </div>
      </div>
      <div class="content">
        <div class="list" v-if="item.type==3">
          <goods-card :key="listIndex" v-for="list,listIndex in item.list"
          width="47%"
          height="110px"
          @clickImg="toDetail"
          :data="list"
          :imgUrl="list.images"
          :title="list.title.split('&')[0]">
          </goods-card>
        </div>
        <goods-card :key="listIndex" v-if="item.type==2 && listIndex <1" height="250px" v-for="list,listIndex in item.list"
        :data="list"
        :imgUrl="list.pic"
        hidTitle
        :subTitle="list.context">
          {{list}}
        </goods-card>
      </div>
    </div>
  </scroll-continer>
</div>
</template>

<script>
import searchBox from '@/components/searchBox'
import Carousel from 'vue-m-carousel'
export default {
  components: {
    searchBox,
    Carousel
  },
  data() {
    return {
      searchBoxBg: 0,
      imgList:[],
      quickNav: [{
        span: '最常购买',
        icon: 'history',
        bgColor: '',
        shadowColor: ''
      }, {
        span: '我的订单',
        icon: 'format_list_bulleted',
        bgColor: '',
        shadowColor: ''
      }, {
        span: '限量特价',
        icon: 'timer',
        bgColor: '',
        shadowColor: ''
      }, {
        span: '我的收藏',
        icon: 'favorite',
        bgColor: '',
        shadowColor: ''
      }],
      activity: []
    }
  },
  methods: {
    scrollTopChange(val) {
      if (val <= 95) {
        this.searchBoxBg = val / 100
      } else {
        this.searchBoxBg = 95 / 100
      }
    },
    async getIndexActivity(id) {
      let res = await this.api.getIndexActivity()
      console.log(res)
      this.activity = res.data.activity
    },
    toDetail(data){
      this.$router.push('/detail/'+data.id)
    },
    async getIndexData(){
      let res = await this.api.getIndexData()
      res.data[0].list.forEach((item)=>{
        this.imgList.push({
          imgUrl:item.pic
        })
      })
      console.log(this.imgList);
      this.activity = res.data
    }
  },
  mounted() {
    // this.getIndexActivity()
    this.getIndexData()
  }
}
</script>

<style lang="scss" scoped>
.quick-nav {
    display: flex;
    justify-content: space-around;
    margin: 1rem 0;
}
.activity {
    .header {
        margin-bottom: 1rem;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .line{
          border-top: 1px dashed #ccc;
          padding-bottom: 4px;
          width: 30%
        }
        .text {
            margin: 0 .5rem;
            font-size: 1rem;
        }
        .icon {
            font-size: 0.8rem;
            color: #ff5252;
            text-align: center;
            width: 1rem;
        }
    }
    .content {
        padding: 0 1%;
        .list{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
    }

}
</style>
