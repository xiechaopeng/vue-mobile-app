<template lang="html">
  <div class="goos-card" :style="{width:width}">
    <div @click="clickImg" class="main" :style="{borderRadius:radius,boxShadow:boxShadow,height:height,'background-image':'url('+imgUrl +')'}">
      <slot name="subTitle">
        <div class="sub-title" v-if="subTitle">
          <span>{{subTitle}}</span>
        </div>
      </slot>
    </div>
    <slot name="title">
      <div class="title" v-if="data.title && !hidTitle">
        <span v-if="data.price" class="price">¥{{data.price}}</span>
        <span class="text">
          {{title}}
        </span>
        <i @click="clickShop" v-if="data.price" class="material-icons add">add_shopping_cart</i>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props:{
    width:{
      type:String,
      default:'100%'
    },
    height:{
      type:String,
      default:'200px'
    },
    subTitle:{
      type:String,
      default:''
    },
    hidTitle:{
      type:Boolean,
      default:false
    },
    data:{
      type:Object,
      default(){
        return {}
      }
    },
    imgUrl:{
      type:String,
      default:''
    },
    title:{
      type:String,
      default:''
    },
    boxShadow:{
      type:String,
      default:'0 3px 10px rgba(0, 0, 0, .156863), 0 3px 10px rgba(0, 0, 0, .227451)'
    },
    radius:{
      type:String,
      default:'4px'
    }
  },
  methods:{
    clickImg(){
      this.$emit('clickImg',this.data)
    },
    clickShop(){
      this.$emit('clickShop',this.data)
      let temp = this.data
      temp.imgUrl = this.data.images
      this.$store.commit('openShoppingCart',temp)
    }
  }
}
</script>

<style lang="scss" scoped>
  .goos-card{
    margin-bottom: .7rem;
    .main{
      position: relative;
      background-size: cover;
      box-shadow: 0 3px 10px rgba(0, 0, 0, .156863), 0 3px 10px rgba(0, 0, 0, .227451);
      border-radius: 4px;
      .sub-title{
        position: absolute;
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding:10px;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,.54);
        color: rgba(255, 255, 255, 0.54);
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        font-size: .8rem;
        .icon{
          font-size: .98rem;
        }
      }
    }
    .title{
      width: 100%;
      // text-align: center;
      margin-top: .5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price{
        color:#ff5252;
        font-size: .7rem;
        white-space: nowrap;
      }
      .text{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0 .5rem;
        flex: 1
      }
      .add{
        color:#ff5252;
        font-size: .8rem;
      }
    }

  }
</style>
