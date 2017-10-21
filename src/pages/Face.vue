<template lang="html">
  <div class="g-face">
    <my-header :headerBg="headerBg" fixed title="个人中心"></my-header>
    <scroll-continer marginBottom="56px" @scrollTopChange="scrollTopChange">
      <mu-paper :zDepth="2">
        <img-div height="180px" radius="4px" imgUrl="http://www.z4a.net/images/2017/08/21/face_bg.jpg">
          <mu-paper class="user-cover" circle :zDepth="2">
            <img-div height="70px" :imgUrl="userCover">
              <input @change="coverChange" type="file" class="user-cover-file"/>
            </img-div>
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
          <span @click="$router.push('/orderlist/-1')">
            所有订单
          </span>
          <i class="material-icons icon">chevron_right</i>
        </div>
      </div>
      <div class="g-main">
        <template v-for="item,index in orderlist" v-if="index<3">
          <mu-paper @click.native="$router.push('/orderlist/'+item.type)" class="order-card" :zDepth="2" :style="{backgroundColor:item.bgColor,color:item.textColor||'#fff'}">
            <div class="item">
              <div class="count">
                {{item.count}}
              </div>
              <div class="span">
                {{item.msg}}
              </div>
            </div>
          </mu-paper>
        </template>
      </div>
      <!-- <div class="user-div">
        <div class="title">
          <div>;</div>
          <span>售后</span>
        </div>
        <div class="more">
          <span @click="$router.push('/orderlist/0')">
            所有订单
          </span>
          <i class="material-icons icon">chevron_right</i>
        </div>
      </div> -->
      <div class="g-main">
        <template v-for="item,index in orderlist" v-if="index>2">
          <mu-paper @click.native="$router.push('/orderlist/'+item.type)" class="order-card" :zDepth="2" :style="{backgroundColor:item.bgColor,color:item.textColor||'#fff'}">
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
        <div class="more" @click="$router.push('/address')">
          <span>
            编辑
          </span>
          <i class="material-icons icon">chevron_right</i>
        </div>
      </div>
      <div class="g-main">
        <mu-paper  :zDepth="2" style="width:100%">
          <div v-if="address==''" @click="$router.push('/addAddress')">还没有地址,点击添加吧~</div>
          <div v-else>
            <div v-text-overflow class="address-card">
              {{address.detail}}
              {{address.user}}
              <!-- {{address.phone}} -->
              <span class="default">{{address.default?'默认':'首址'}}</span>
            </div>
          </div>
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
  components: {
    myHeader
  },
  data() {
    return {
      user: [],
      userid: '',
      headerBg: 0,
      userCover: 'http://www.z4a.net/images/2017/08/21/face_bg.jpg',
      userName: '',
      userDesc: '',
      toDayCount: 0,
      readyPayCount: 0,
      finishCount: 0,
      orderlist:[{
        type:2,
        msg:'已支付',
        bgColor:'#66bb6a',
        count:0
      },{
        type:1,
        msg:'待付款',
        bgColor:'#ef5350',
        count:0
      },{
        type:7,//日期订单
        msg:'已完成',
        bgColor:'#3f51b5',
        count:0
      }]
    }
  },
  computed: {
    address() {
      let address = this.$store.state.address
      let defaultAddress = ''
      address.forEach((item) => {
        if (item.default) {
          defaultAddress = item
        }
      })
      if (address.length == 1) {
        defaultAddress = address[0]
      }
      return defaultAddress
    }
  },
  methods: {
    async getUserInfo() {
      let res = await this.api.getUserInfo()
      if (res) {
        this.userCover = res.data.profilePicture || 'http://www.z4a.net/images/2017/08/21/face_bg.jpg'
        this.userName = res.data.nickname || res.data.username
        this.userDesc = res.data.desc || '彪悍人生不需要简述'
        return true
      }else {
        return false

      }
    },
    async getAddress() {
      let res = await this.api.getUserAddress()
      if (res) {
        this.$store.commit('setAddress', res.data)
        return true
      }else {
        return false
      }
    },
    scrollTopChange(val) {
      if (val <= 95) {
        this.headerBg = val / 100
      } else {
        this.headerBg = 95 / 100
      }
    },
    async logout() {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
        this.$store.commit('setAddress', [])
        this.$store.commit('setOrderlist', [])
        this.$router.replace('/')
        await this.api.logout()
      }
    },
    async getOrderlist(type) {
      let orderlist = []
      let res = await this.api.getOrderlist(type)
      res.data.forEach((item) => {
        orderlist.push({
          title: item.firTitle,
          type: type,
          id: item.id,
          time: item.createTime,
          price: item.productNum,
          count: item.productNum,
          titleCount: item.firNum
        })
      })
      this.$store.commit('setOrderlist', orderlist)
    },
    coverChange(e) {
      let _this = this
      let file = e.target
      if (file.files && file.files[0]) {
        let reader = new FileReader();
        reader.onload = function(evt) {
          _this.userCover = evt.target.result
        }
        reader.readAsDataURL(file.files[0]);
      } else {
        _this.userCover = file.value
      }
    },
    async getOrderlistCount(){
      let res = await this.api.getOrderlistCount()
      if (res) {
        let data = res.data
        res.data.forEach((item)=>{
          let status = Number(item.status)
          if (status==1) {
            this.orderlist[1].count = item.num
          }
          if (status==7) {
            this.orderlist[2].count = item.num
          }
          if (status==2) {
            this.orderlist[0].count = item.num
          }
        })
      }
    }
  },
  async mounted() {
    if (localStorage.getItem('token')) {
      if (this.userid == '') {
        if (await this.getUserInfo()) {
          if (await this.getAddress()) {
            await this.getOrderlistCount()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.g-face {
    padding: 1%;
    .user-cover {
        width: 70px;
        height: 70px;
        position: absolute;
        bottom: -35px;
        left: calc(50% - 35px);
        z-index: 1;
        overflow: hidden;
        // margin-bottom: 35px;
    }
    .user-name {
        margin-top: 3rem;
        text-align: center;
    }
    .user-desc {
        color: #bbb;
        text-align: center;
        font-size: 0.7rem;
        margin: 0.5rem 0;
    }
    .user-div {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 15px;
        margin-bottom: 1rem;
        margin-top: 0.5rem;
        .title {
            display: flex;
            div {
                border-left: 3px solid #ff5252;
                height: 15px;
                color: #fff;
                margin-top: 2px;
                margin-right: 0.5rem;
            }
        }
        .more {
            color: #ccc;
            display: flex;
            align-items: flex-end;
            .icon {
                font-size: 1.3rem;
            }
        }
    }
    .g-main {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding: 1%;
        flex-wrap: wrap;
        .order-card {
            width: 30%;
            height: 80px;
            position: relative;
            .item {
                height: 80px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: 0 10px;
                .count {
                    font-size: 2rem;
                }
                .span {
                    text-align: right;
                    font-size: 0.8rem;
                }
            }
        }
        .address-card {
            width: 100%;
            height: 30px;
            line-height: 30px;
            padding: 0 2%;
            // padding-left: 5%;
            display: flex;
            justify-content: space-between;
            .default {
                &:last-child {
                    color: #bbb;
                }
            }
        }
    }
}
.user-cover-file {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>
