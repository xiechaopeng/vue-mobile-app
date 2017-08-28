<template lang="html">
  <div class="g-face">
    <my-header :headerBg="headerBg" fixed title="个人中心"></my-header>
    <scroll-continer marginBottom="56px" @scrollTopChange="scrollTopChange">
      <mu-paper :zDepth="2">
        <img-div height="180px" radius="4px" imgUrl="http://www.z4a.net/images/2017/08/21/face_bg.jpg">
          <mu-paper class="user-cover" circle :zDepth="2">
            <img-div height="70px" :imgUrl="userCover"></img-div>
          </mu-paper>
        </img-div>
      </mu-paper>
      <div class="user-name" v-if="userName">
        {{userName||'目前是一个懵懂的吃瓜群众'}}
      </div>
      <div class="user-name" v-else>
        <span @click="$router.push('user/login')">登录</span> | <span @click="$router.push('user/reg')">注册</span>
      </div>
      <div class="user-desc">
        {{userDesc}}
      </div>
      <div class="user-div">
        <div class="title">
          <div>;</div>
          <span>我的订单</span>
        </div>
        <div class="more">
          <span @click="$router.push('/orderlist/all')">
            所有订单
          </span>
          <i class="material-icons icon">chevron_right</i>
        </div>
      </div>
      <div class="g-main">
        <template v-for="item,index in orderlist" v-if="index<3">
          <mu-paper class="order-card" :zDepth="2" :style="{backgroundColor:item.bgColor,color:item.textColor||'#fff'}">
            <div class="item">
              <div class="count">
                {{item.list.length}}
              </div>
              <div class="span">
                {{item.msg[item.dateType] || item.msg}}
              </div>
            </div>
          </mu-paper>
        </template>
      </div>
      <div class="user-div">
        <div class="title">
          <div>;</div>
          <span>售后</span>
        </div>
        <div class="more">
          <span>
            所有
          </span>
          <i class="material-icons icon">chevron_right</i>
        </div>
      </div>
      <div class="g-main">
        <template v-for="item,index in orderlist" v-if="index>2">
          <mu-paper class="order-card" :zDepth="2" :style="{backgroundColor:item.bgColor,color:item.textColor||'#fff'}">
            <div class="item">
              <div class="count">
                {{item.list.length}}
              </div>
              <div class="span">
                {{item.msg[item.dateType] || item.msg}}
              </div>
            </div>
          </mu-paper>
        </template>
      </div>
      <div class="user-div">
        <div class="title">
          <div>;</div>
          <span>收货地址</span>
        </div>
        <div class="more">
          <span>
            编辑
          </span>
          <i class="material-icons icon">chevron_right</i>
        </div>
      </div>
      <div class="g-main">
        <mu-paper class="address-card" :zDepth="2">
          <div v-if="address==''" @click="$router.push('/addAddress')">还没有地址,点击添加吧~</div>
          <div v-if="address">{{address.detail}}</div>
          <div v-if="address">{{address.user}}</div>
          <div v-if="address">{{address.phone}}</div>
          <div class="default">{{address.default?'默认':'首址'}}</div>
        </mu-paper>
      </div>
      <div style="padding:0 1%">
        <mu-divider/>
      </div>
      <div style="padding:0 1%;margin-top:1rem">
        <mu-raised-button @click="logout" label="退出登陆" fullWidth secondary/>
      </div>
      <div style="height:20px">

      </div>
    </scroll-continer>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components:{
    myHeader
  },
  data(){
    return {
      user:[],
      userid:'',
      headerBg:0,
      userCover:'',
      userName:'',
      userDesc:'',
      toDayCount:0,
      readyPayCount:0,
      finishCount:0,
    }
  },
  computed:{
    address(){
      let address = this.$store.state.address
      let defaultAddress = ''
      address.forEach((item)=>{
        if (item.default) {
          defaultAddress = item
        }
      })
      if (address.length == 1) {
        defaultAddress = address[0]
      }
      return defaultAddress
    },
    orderlist(){
      return this.$store.state.orderlist
    }
  },
  methods:{
    async getUserInfo(){
      let res = await this.api.getUserInfo()
      this.userCover = res.data.profilePicture || ''
      this.userName =  res.data.nickname || res.data.username
      this.userDesc = res.data.desc || '彪悍人生不需要简述'
    },
    async getAddress(){
      let res = await this.api.getUserAddress()
      this.$store.commit('setAddress',res.data)
    },
    scrollTopChange(val){
      if (val <= 95) {
        this.headerBg = val / 100
      } else {
        this.headerBg = 95 / 100
      }
    },
    logout(){
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
        this.$router.replace('/')
      }
    }
  },
  async mounted(){
    if (localStorage.getItem('token')) {
      if (this.userid=='') {
        await this.getUserInfo()
        await this.getAddress()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.g-face{
  padding: 1%;
  .user-cover{
    width: 70px;
    height: 70px;
    position: absolute;
    bottom: -35px;
    left: calc(50% - 35px);
    z-index: 1;
    overflow: hidden;
    // margin-bottom: 35px;
  }
  .user-name{
    margin-top: 3rem;
    text-align: center;
  }
  .user-desc{
    color: #bbb;
    text-align: center;
    font-size: .7rem;
    margin: .5rem 0
  }
  .user-div{
    display: flex;
    justify-content: space-between;
    align-items:flex-end;
    height: 15px;
    margin-bottom: 1rem;
    margin-top: .5rem;
    .title{
      display: flex;
      div{
        border-left: 3px solid #ff5252;
        height: 15px;
        color: #fff;
        margin-top: 2px;
        margin-right: .5rem
      }
    }
    .more{
      color: #ccc;
      display: flex;
      align-items:flex-end;
      .icon{
        font-size: 1.3rem;
      }
    }
  }
  .g-main{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding: 1%;
    flex-wrap: wrap;
    .order-card{
      width: 30%;
      height: 80px;
      position: relative;
      .item{
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 10px;
        .count{
          font-size: 2rem;
        }
        .span{
          text-align: right;
          font-size: .8rem
        }
      }
    }
    .address-card{
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 2%;
      // padding-left: 5%;
      display: flex;
      justify-content: space-between;
      .default{
        &:last-child{
          color: #bbb
        }
      }
    }
  }
}
</style>
