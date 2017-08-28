<template lang="html">
  <div class="img-div" :style="{height:height,'background-image':'url('+imgUrl+')','border-radius':radius}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    height:{
      type:String,
      default:'100px'
    },
    imgUrl:{
      type:String,
      default:''
    },
    radius:{
      type:String,
      default:'0px'
    }
  }
}
</script>

<style lang="css" scoped>
.img-div{
  background-size: cover;
  position: relative;
}
</style>
