<template lang="html">
  <div>
    <!-- <transition name="fade" mode="out-in">
      <div class="classify-detail">
        <mu-paper :zDepth="1">
          <img-div height="150px" radius="3px" :imgUrl="rq.imgUrl">
          </img-div>
        </mu-paper>
      </div>
    </transition> -->
    <div class="detail-list">
      <div class="left-nav">
        <scroll-continer marginTop="(48px)" marginBottom="56px">
          <mu-list >
            <template v-for="item,index in list">
              <mu-list-item v-if="index==activeList" @click.native="getGoodsByClassId(item,index)"
              :style="{'border-left':'2px solid #ff5252'}" :title="item.name"/>
              <mu-list-item v-else @click.native="getGoodsByClassId(item,index)"
              :style="{'border-left':'1px solid rgba(0,0,0,.12)'}" :title="item.name"/>
              <mu-divider v-if="index !== list.length-1"/>
            </template>
          </mu-list>
        </scroll-continer>
      </div>
      <div style="flex:1">
        <scroll-continer marginTop="(48px)" marginBottom="56px">
          <div class="right-detail">
            <template v-for="item,index in goods">
              <goods-card radius="2px" boxShadow="0 1px 5px rgba(0, 0, 0, .156863), 0 1px 5px rgba(0, 0, 0, .227451)" @clickImg="toDetail" width="48%" height="100px" :data="item" :title="item.title.split('&')[0]" :imgUrl="item.images"></goods-card>
            </template>
          </div>
        </scroll-continer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fixedList:false,
      list:[],
      activeList:0,
      goods:[],
      scrollTop:0,
    }
  },
  computed:{
    rq(){
      return this.$route.query
    }
  },
  methods:{
    async getSecondCatgory(){
      let id = this.rq.id
      let res = await this.api.getCatgory(id)
      this.list = res.data
    },
    async getGoodsByClassId(item,index){
      this.activeList = index
      let res = await this.api.getGoodsByClassId(item.id)
      this.goods = res.data
      console.log(res);
    },
    toDetail(data){
      this.$router.push('/detail/'+data.id)
    },
    scrollTopChange(val){
      if (val>150) {
        this.fixedList = true
      }
    }
  },
  async mounted(){
    await this.getSecondCatgory()
    this.getGoodsByClassId(this.list[0],0)
  }
}
</script>

<style lang="scss">
.classify-detail{
  padding: 0 1%;
  margin-top: .5rem;
  border-radius: 3px;
  background: #fff;
}
.detail-list{
  display: flex;
  .left-nav{
    width: 100px;
    padding-left: 1%;
    margin-right: 1%;
  }
  .right-detail{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 1rem;
    padding-left: 1%;
    padding-right: 1%;
  }
}
.mu-item{
  padding: 5px;
  padding-right: 0
}
.mu-item-title{
  font-size: .8rem
}
</style>
