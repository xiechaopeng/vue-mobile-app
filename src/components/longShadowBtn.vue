<template lang="html">
  <mu-float-button :style="style">
    <slot></slot>
  </mu-float-button>
</template>

<script>
export default {
  props: {
    size: {
      type: Number || String,
      default: 50
    },
    bgColor: {
      type: String,
      default: '#1B9AF7'
    },
    shadowColor: {
      type: String,
      default: '#0880d7'
    },
    preset: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      let textShadow = [],
        shadowColor = this.shadowColor,
        bgColor = this.bgColor
      let preset = {
        blue: {
          shadowColor: '#0880d7',
          bgColor: '#1B9AF7'
        },
        red:{
          shadowColor: '#ff1022',
          bgColor: '#ff5c69'
        },
        green:{
          shadowColor: '#8bc220',
          bgColor: '#b9e563'
        },
        brown:{
          shadowColor: '#e59501',
          bgColor: '#FEAE1B'
        }
      }
      if (preset[this.preset]) {
        shadowColor = preset[this.preset].shadowColor
        bgColor = preset[this.preset].bgColor
      }
      for (var i = 0; i < Number(this.size) / 2; i++) {
        textShadow.push(`${i}px ${i}px ${shadowColor}`)
      }
      return {
        overflow: 'hidden',
        height: this.size + 'px',
        width: this.size + 'px',
        textShadow: textShadow.join(','),
        background: bgColor
      }
    }
  }
}
</script>

<style lang="css">
</style>
