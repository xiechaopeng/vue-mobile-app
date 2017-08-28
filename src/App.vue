<template>
<div id="app">
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
  <bottom-nav v-if="activePath!='/login' && activePath!='/reg'" fixed></bottom-nav>
  <shopping-cart-sheet></shopping-cart-sheet>
</div>
</template>

<script>
import bottomNav from '@/components/bottomNav'
import shoppingCartSheet from '@/components/shoppingCartSheet'
export default {
  name: 'app',
  components:{
    bottomNav,
    shoppingCartSheet
  },
  computed:{
    activePath(){
      if (this.$route.matched[0]) {
        return this.$route.matched[0].path
      }
      return '/'
    }
  }
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}

</style>
