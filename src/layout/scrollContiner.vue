<template lang="html">
  <div class="g-sc"
  :style="{height:'calc(100vh - '+marginTop+' - '+marginBottom+')'}">
    <div class="sc" v-scroll>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    marginTop:{
      type:String,
      default:'0px'
    },
    marginBottom:{
      type:String,
      default:'0px'
    }
  },
  methods:{
    scrollTopChange(val){
      this.$emit('scrollTopChange',val)
    }
  },
  directives: {
    scroll(el,binding,vnode){
      el.addEventListener('scroll', (e)=>{
        vnode.context.scrollTopChange(e.target.scrollTop)
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .g-sc{
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .sc{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
