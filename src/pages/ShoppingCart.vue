<template lang="html">
  <div>
    <mu-popup position="top" popupClass="topPopup" :overlay="false" :open="topPopup">
      {{popupText}}
    </mu-popup>
    <my-header bgColor="#ff5252" textColor="#fff" :headerBg="0.95" :title="'菜篮（ '+cartCount+' ）'"></my-header>
    <scroll-continer marginBottom="112px" marginTop="48px">
      <div style="padding:0 2% " v-if="!item.hide" v-for="item,index in shoppingCartList">
        <div class="shoppingCarItem">
          <mu-paper class="img" :zDepth="2" :style="{'background-image':'url('+item.imgUrl+')'}">
          </mu-paper>
          <div class="content">
            <div class="flex">
              <div class="title">{{item.title}}</div>
              <div class="control">
                <i @click="changeCount('del',item,index)" class="material-icons icon">remove_circle</i>
                <input type="text" v-model="item.count">
                <i @click="changeCount('add',item,index)" class="material-icons icon">add_circle</i>
              </div>
            </div>
            <div class="flex grey">
              <div class="item">
                <div class="price">
                  ¥{{item.price}}
                </div>
                <div>
                  库存：{{item.stock || 0}}
                </div>
              </div>
              <div class="item control-item">
                <div @click="del(index)" class="del">删除</div>
                <mu-checkbox :nativeValue="''+item.id" @change="checkChange" v-model="checkList"/>
              </div>
            </div>
          </div>
        </div>
        <mu-divider/>
      </div>
      <div v-if="cartCount==0" class="shopping-none">
        <h2>菜篮子空空如也</h2>
        <img src="http://www.z4a.net/images/2017/09/03/cailan.cdb4344.jpg" alt="">
        <div>一定要做一个有<span style="color:#ff5252;font-size:1.1rem">梦想</span>的菜篮子↖(▔＾▔)↗ </div>
        <div>像楼上一样<span style="color:#ff5252;font-size:1.1rem">充实</span>自己↖(▔▽▔)↗ </div>
        <mu-raised-button label="满足你!" @click.native="$router.push('/')" secondary/>
      </div>
    </scroll-continer>
    <mu-divider/>
    <div class="shoppingCart-bottom">
      <mu-checkbox @change="allCheckChange(checkList.length)" :value="checkList.length==cartCount" :label="'已选'+checkList.length+'个'"/>
      <div class="price">
        <span>
          总计：¥
        </span>
        <span class="totalPrice">{{totalPrice}}</span>
      </div>
      <button @click="order" class="btn" type="button" name="button">
        去结算
      </button>
    </div>
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
      visible:false,
      allCheck:true,
      topPopup:false,
      popupText:'popupText',
      checkList:[]
    }
  },
  methods:{
    checkChange(val){
      this.allCheck = this.shoppingCartList.length == val.length
    },
    allCheckChange(checkListlength){
      if (this.shoppingCartList.length==checkListlength) {
        this.checkList = []
      }else {
        this.checkList = []
        this.shoppingCartList.forEach((item)=>{
          if (!item.hide) {
            this.checkList.push(''+item.id)
          }
        })
      }
    },
    changeCount(type,item,index){
      let newCount = item.count
      if (type=='add') {
        newCount++
      }
      if (type=='del') {
        if (item.count>1) {
          newCount--
        }else {
          // this.topPopup = true
          // this.popupText = '请至少购买一件、或者点击删除QAQ'
          // setTimeout(() => { this.topPopup = false }, 2000)
          alert('请至少购买一件、或者点击删除QAQ')
        }
      }
      this.$store.commit('shoppingCartListChangeCount',{
        index:index,
        count:newCount
      })
    },
    order(){
      if (this.checkList.length>0) {
        if (localStorage.token) {
          this.$store.commit('setCheckList',this.checkList)
          this.$router.push('/order')
        }else {
          // this.topPopup = true
          // this.popupText = '请先登录再进行此操作'
          // setTimeout(() => { this.topPopup = false }, 2000)
          alert('请先登录再进行此操作')
          this.$router.push('/user/login')
        }
      }else {
        // this.topPopup = true
        // this.popupText = '没有选择任何商品哦'
        // setTimeout(() => { this.topPopup = false }, 2000)
        alert('没有选择任何商品哦')
      }
    },
    del(index){
      this.checkList.splice(index,1)
      this.$store.commit('popShoppingCartList',index)
    }
  },
  computed:{
    shoppingCartList(){
      return this.$store.state.shoppingCartList
    },
    cartCount(){
      let count = 0
      let shoppingCartList = this.$store.state.shoppingCartList
      shoppingCartList.forEach((item)=>{
        if (!item.hide) {
          count++
        }
      })
      return count
    },
    totalPrice(){
      let shoppingCartList = this.$store.state.shoppingCartList
      let totalPrice = 0
      shoppingCartList.forEach((item)=>{
        this.checkList.forEach((id)=>{
          if (id==item.id && !item.hide) {
            totalPrice+= item.count*item.price
          }
        })
      })
      return totalPrice
    }
  },
  mounted(){
    this.allCheckChange()
  }

}
</script>

<style lang="scss" scoped>
  .shoppingCarItem{
    display: flex;
    justify-content: space-between;
    // border-bottom: 1px solid #ccc;
    padding: 10px 0;
    .img{
      width: 30%;
      height: 70px;
      background-size: cover;
    }
    .content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 65%;
      .grey{
        color: #aaa;
        font-size: .8rem
      }
      .price{
        color: #ff5252;
        font-size: 1rem;

      }
      .del{
        color: #ff5252;
      }
      .flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          flex: 1
        }
        .item{
          width: 60%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .control-item{
          width: 30%
        }
        .control{
          display: flex;
          align-items: center;
          margin-right: .5rem;
          input{
            width: 40px;
            text-align: center;
            border: 1px solid #41464b;
            margin: 0 5px;
          }
          .icon{
            font-size: 1.1rem;
            color:#41464b;
          }
        }
      }
    }
  }
  .shoppingCart-bottom{
    height: 56px;
    display: flex;
    // position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    .price{
      color: #ff5252;
      display: flex;
      align-items: center;
    }
    .totalPrice{
      font-size: 1.5rem
    }
    .btn{
      border: none;
      height: 56px;
      width: 40%;
      background-color: #ff5252;
      color: #fff;
      font-size: 1rem
    }
  }
  .shopping-none{
    padding: 0% 5%;
    text-align: center;
    div{
      margin-bottom: 1rem;
    }
    img{
      width: 100%;
      border-radius: 4px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, .156863), 0 3px 10px rgba(0, 0, 0, .227451);
      margin-bottom: 1rem;
    }
  }
</style>
