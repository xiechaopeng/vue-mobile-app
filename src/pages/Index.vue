<template>
<div class="hello">
  <search-box inputColor="#41464b" inputBg="#fff" :bgOpacity="searchBoxBg" fixed></search-box>
  <scroll-continer marginBottom="56px" @scrollTopChange="scrollTopChange">
    <!-- <carousel :auto="3000">

    </carousel> -->
    <div class="swiper-container" v-if="imgList.length>0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item,index in imgList">
          <img-div @click.native="toDetail(item)" :imgUrl="item.imgUrl" height="150px"></img-div>
          <!-- <img style="height:150px;width:100%"  :src="item.imgUrl"> -->
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="quick-nav">
      <div v-for="item,index in quickNav">
        <long-shadow-btn :preset="item.preset">
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
          <goods-card :key="listIndex" v-for="list,listIndex in item.list" width="31%" height="90px" @clickImg="toDetail" :data="list" :imgUrl="list.images" :title="list.title.split('&')[0]">
          </goods-card>
        </div>
        <goods-card :key="listIndex" v-if="item.type==2 && listIndex <1" height="150px" v-for="list,listIndex in item.list" :data="list" :imgUrl="list.pic" hidTitle :subTitle="list.context">
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
      imgList: [],
      quickNav: [{
        span: '最常购买',
        icon: 'history',
        preset:'blue'
      }, {
        span: '我的订单',
        icon: 'format_list_bulleted',
        preset:'brown'
      }, {
        span: '限量特价',
        icon: 'timer',
        preset:'green'
      }, {
        span: '我的收藏',
        icon: 'favorite',
        preset:'red'
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
    toDetail(data) {
      this.$router.push('/detail/' + data.id)
    },
    async getIndexData() {
      let res = await this.api.getIndexData()
      res.data[0].list.forEach((item) => {
        let temp = item
        temp.imgUrl = item.pic
        this.imgList.push(temp)
      })
      this.activity = res.data
    }
  },
  async mounted() {
    // this.getIndexActivity()
    await this.getIndexData()
    this.$nextTick(function() {
      // DOM 现在更新了
      // `this` 绑定到当前实例
      let mySwiper = new Swiper('.swiper-container', {
        autoplay: 3000,
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination'
      })
    })

  }
}
</script>

<style lang="scss" scoped>
.quick-nav {
    display: flex;
    justify-content: space-around;
    margin: .8rem 0;
}
.activity {
    .header {
        margin-bottom: 1rem;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .line {
            border-top: 1px dashed #ccc;
            padding-bottom: 4px;
            width: 30%;
        }
        .text {
            margin: 0 0.5rem;
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
        .list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
    }

}
</style>
