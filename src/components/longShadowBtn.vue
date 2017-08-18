<template lang="html">
  <mu-float-button :style="style">
    <slot></slot>
  </mu-float-button>
</template>

<script>
export default {
  props:{
    size:{
      type:Number || String,
      default:50
    },
    bgColor:{
      type:String,
      default:'#1B9AF7'
    },
    shadowColor:{
      type:String,
      default:'#0880d7'
    }
  },
  computed:{
    style(){
      let textShadow = []
      for (var i = 0; i < Number(this.size)/2; i++) {
        textShadow.push(`${i}px ${i}px ${this.shadowColor}`)
      }
      return {
        overflow:'hidden',
        height:this.size+'px',
        width:this.size+'px',
        textShadow:textShadow.join(','),
        backgroundColor:this.bgColor
      }
    }
  }
}
</script>

<style lang="css">
</style>
