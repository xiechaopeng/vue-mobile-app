<template lang="html">
  <div class="header" :class="{fixed:fixed}"
  :style="{color:textColor,background:bgColor?bgColor:'rgba(255,255,255,'+headerBg+')',boxShadow:headerBg>=0.95?'2px 2px 2px rgba(0,0,0,.2)':''}">
    <slot name="left">
      <mu-icon-button style="z-index:2" @click.native="$router.go(-1)"  icon="keyboard_arrow_left"/>
    </slot>
    <slot name="title"><span style="font-size:1rem" v-if="title && headerBg>=0.95">{{title}}</span></slot>
    <slot name="right">
      <div style="opacity:0">
        <mu-icon-button style="z-index:2" icon="more_horiz"/>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    headerBg:{
      type:Number,
      default:0
    },
    fixed:{
      type:Boolean,
      default:false
    },
    bgColor:{
      type:String,
      default:''
    },
    textColor:{
      type:String,
      default:'#7e848c'
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #7e848c;
  .active{
    border-bottom: 2px solid #7e848c
  }
}
.fixed{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 4;
}
</style>
