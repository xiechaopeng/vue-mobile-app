<template lang="html">
  <mu-bottom-sheet  :open="bottomSheet" @close="closeBottomSheet">
    <div class="shopping-cat">
      <div style="text-align:center">
        <div style="font-size:1rem">购买商品</div>
        <div style="color:#ccc;font-size:.8rem;font-weight:300">shopping</div>
        <mu-divider/>
      </div>
      <div class="main">
        <mu-paper class="img" :zDepth="2" :style="{'background-image':'url('+goodsData.imgUrl+')'}">
        </mu-paper>
        <div class="content">
          <div class="header" v-if="goodsData.title">
            {{goodsData.title.split('&')[0]}}
          </div>
          <div class="price">
            ¥{{goodsData.price}}
          </div>
          <div class="stock">
            库存：{{goodsData.stock || 0}}
          </div>
          <div class="count">
            <span>
              数量：
            </span>
            <!-- <mu-icon-button> -->
            <i @click="countDel" class="material-icons icon">remove_circle</i>
            <!-- </mu-icon-button> -->
            <input type="text" v-model="count">
            <!-- <mu-icon-button> -->
            <i @click="countAdd" class="material-icons icon">add_circle</i>
            <!-- </mu-icon-button> -->
          </div>
        </div>
      </div>
      <mu-raised-button @click.native="intoShoppingCart" secondary :label="count*goodsData.price>0?'甩进菜篮（ '+count*goodsData.price+'元 ）':'甩进菜篮'" fullWidth/>
    </div>
    <mu-popup position="top" popupClass="topPopup" :overlay="false" :open="topPopup">
      {{popupText}}
    </mu-popup>
  </mu-bottom-sheet>
</template>

<script>
export default {
  data() {
    return {
      bottomSheet: false,
      count:0,
      topPopup:false,
      popupText:''
    }
  },
  computed: {
    goodsData() {
      let shoppingCartSheetItem = this.$store.state.shoppingCartSheetItem
      this.bottomSheet = this.$store.state.shoppingCartSheetOpen
      return shoppingCartSheetItem
    },
  },
  methods: {
    closeBottomSheet() {
      this.count = 0
      this.$store.commit('closeShoppingCart')
    },
    countAdd(){
      this.count++
    },
    countDel(){
      if (this.count>0) {
        this.count--
      }
    },
    intoShoppingCart(){
      if (this.count<1) {
        this.topPopup = true
        this.popupText = '购买数量不能为0'
        setTimeout(() => { this.topPopup = false }, 2000)
      }else{
        let payload = this.goodsData
        payload.count = this.count
        payload.check = true
        this.$store.commit('pushShoppingCartList',payload)
        this.closeBottomSheet()
      }
    }
  }
}
</script>

<style lang="scss">
.shopping-cat {
    padding: 5% 2%;
    img {
        width: 100%;
    }
    .main {
        display: flex;
        justify-content: space-between;
        margin: 1rem 0;
        .img {
            width: 45%;
            background-size: cover;
            height: 150px;
        }
        .content {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 0.8rem;
            color: #aaa;
            .price{
              color: #ff5252;
              font-size: 1.5rem;
            }
            .header {
                font-size: 1rem;
                font-weight: 500;
                color: #41464b;
            }
            .count {
                color: #ff5252;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon{
                  font-size: 1rem;
                  padding-bottom: 2px;
                }
                input{
                  width: 60px;
                  // line-height: 30px;
                  border: 1px solid #ff5252;
                  padding: 0;
                  text-align: center;
                }
            }
        }
    }
}
.topPopup{
  width: 100%;
  text-align: center;
  padding: .5rem 0;
  background-color: #ff5252;
  color: #fff
}
</style>
