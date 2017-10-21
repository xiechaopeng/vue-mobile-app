<template lang="html">
  <div>
    <my-header :headerBg="1" bgColor="#ff5252" textColor="#fff">
      <mu-icon-button v-if="result.length==0" slot="left" style="z-index:2" @click.native="$router.go(-1)"  icon="keyboard_arrow_left"/>
      <mu-icon-button v-if="result.length>0" slot="left" style="z-index:2" @click.native="result=[]"  icon="keyboard_arrow_left"/>
      <div slot="title" style="flex:1;position:relative">
        <div v-if="searchStr" @click="searchStr='';result=[]" style="text-align:center;height:16px;width:16px;position:absolute;right:8px;z-index:2;top:8px;border-radius:50%;background:#ebebeb">
          <mu-icon style="color:#ccc" :size="14" value="close"/>
        </div>
        <input v-model="searchStr" autofocus type="text" placeholder="搜索内容..." class="search-input"/>
      </div>
      <mu-icon-button @click.native="search" slot="right" style="z-index:2" icon="search"/>
    </my-header>
    <scroll-continer style="padding:0 1%" marginTop="48px" marginBottom="56px">
      <div v-if="noResult" style="margin-top:1rem;text-align:center">
        {{noResult}}
      </div>
      <div v-if="result.length==0">
        <div style="margin-top:1rem;display:flex;justify-content:space-between">
          <div>
            <mu-flat-button primary>
              <mu-icon :size="16" value="access_time" style="margin-bottom:2px"/>历史搜索
            </mu-flat-button>
          </div>
          <div @click="clearHistory">
            <mu-flat-button primary>
              清除记录<mu-icon :size="16" value="delete_sweep" style="margin-bottom:2px"/>
            </mu-flat-button>
          </div>
        </div>
        <mu-divider/>
        <div style="display:flex;flex-wrap:wrap">
          <div style="margin-top:.5rem;width:50%;display:flex;align-items:center" v-for="item,index in historySearch">
            <div style="height:10px;width:2px;background:#ff5252;margin-bottom:2px;margin-right:1rem">

            </div>
            <div @click="historySearchClick(item)">
              {{item}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="result.length>0" style="margin-top:1rem">
        <div  v-for="item,index in result">
          <div class="search-card" style="display:flex;padding:0 2px;margin-bottom:.5rem">
            <div style="width:25%;margin-right:.5rem">
              <img-div @click.native="toDetail(item)" style="border-radius:2px;box-shadow: 0 2px 5px rgba(0, 0, 0, .156863), 0 2px 5px rgba(0, 0, 0, .227451)" :imgUrl="item.images" height="65px">

              </img-div>
            </div>
            <div style="display:flex;flex-direction: column;justify-content:space-between;flex:1">
              <div v-text-overflow="2">
                <div @click="toDetail(item)" v-html="item.title.split('&')[0]">

                </div>
              </div>
              <div style="display:flex;justify-content:space-between;color:#ff5252">
                <div>
                  ¥{{item.price}}
                </div>
                <div>
                  <i style="font-size:14px;margin-right:1rem" class="material-icons">favorite</i>
                  <i @click="clickShop(item)" style="font-size:14px" class="material-icons">add_shopping_cart</i>
                </div>
              </div>
            </div>
          </div>
          <mu-divider/>
          <div v-if="index == result.length-1" style="color:#ccc;text-align:center;font-size:12px;margin:.5rem 0">
            到底了(⊙o⊙)哦一共{{result.length}}个结果
          </div>
        </div>
      </div>
    </scroll-continer>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components: {
    myHeader
  },
  data(){
    return {
      searchStr:'',
      result:[],
      noResult:'',
      historySearch:[]
    }
  },
  methods:{
    getHistorySearch(){
      let history = []
      if (localStorage.historySearch) {
        history = JSON.parse(localStorage.historySearch)
      }
      this.historySearch = history
    },
    clearHistory(){
      localStorage.removeItem('historySearch')
      this.historySearch = []
    },
    historySearchClick(str){
      this.searchStr = str
      this.search()
    },
    toDetail(item){
      this.$router.push('/detail/' + item.id)
    },
    clickShop(item){
      let temp = item
      temp.imgUrl = item.images
      this.$store.commit('openShoppingCart',temp)
    },
    async search(){
      if (this.searchStr) {
        let res = await this.api.search(this.searchStr)
        if (res.data.items.length>0) {
          let history = []
          if (localStorage.historySearch) {
            history = JSON.parse(localStorage.historySearch)
            let pushFlag = true
            history.forEach((item)=>{
              if (item==this.searchStr) {
                pushFlag = false
              }
            })
            if (pushFlag) {
              history.push(this.searchStr)
            }
          }else {
            history.push(this.searchStr)
          }
          localStorage.historySearch = JSON.stringify(history)
          this.result = res.data.items
          this.getHistorySearch()
        }else {
          this.result = []
          this.noResult = '没有搜索到结果,换个关键字?'
        }
      }
    }
  },
  mounted(){
    this.getHistorySearch()
  }
}
</script>

<style lang="scss" scoped>
.search-input{
  border: 1px solid #ebebeb;
  width: 100%;
  outline: none;
  padding-left: .5rem;
  padding-right: 1.5rem;
  border-radius: 2px;
  height: 30px;
  border-radius: 30px;
  &:focus{
    border: 1px solid #ff5252;
  }
}
.search-card{
  display: flex;

}
</style>
