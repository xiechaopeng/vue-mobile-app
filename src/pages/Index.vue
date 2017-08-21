<template>
<div class="hello">
  <search-box :bgOpacity="searchBoxBg" fixed></search-box>
  <scroll-continer marginBottom="56px" @scrollTopChange="scrollTopChange">
    <img src="../assets/index.png" style="width:100%">
    <div class="quick-nav">
      <div v-for="item,index in quickNav">
        <long-shadow-btn>
          <mu-icon :value="item.icon" />
        </long-shadow-btn>
        <div style="padding:5px 0;">{{item.span}}</div>
      </div>
    </div>
    <div class="activity" v-for="item,index in activity">
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
        <div class="list" v-if="item.type==0">
          <goods-card :key="listIndex" v-for="list,listIndex in item.list"
          width="47%"
          height="110px"
          @clickImg="toDetail"
          :data="list">
          </goods-card>
        </div>
        <goods-card v-if="item.type==1" height="250px" :data="item" hidTitle :subTitle="item.desc">

        </goods-card>
      </div>
    </div>
  </scroll-continer>
</div>
</template>

<script>
import searchBox from '@/components/searchBox'
export default {
  components: {
    searchBox
  },
  data() {
    return {
      searchBoxBg: 0,
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
    }
  },
  mounted() {
    this.getIndexActivity()
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
