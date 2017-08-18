<template lang="html">
  <mu-paper :class="{'bottom-nav':fixed}" :zDepth="1">
    <mu-bottom-nav @change="bottomNavChange">
      <mu-bottom-nav-item v-for="item,index in bottomNav"
      class="bottom-item"
      :style="{color:item.path==activePath?activeColor:''}"
      :value="index"
      :title="item.span"
      :icon="item.icon"
      :key="index" />
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
export default {
  props:{
    fixed:{
      type:Boolean,
      default:false
    },
    activeColor:{
      type:String,
      default:'#ff5252'
    }
  },
  data() {
    return {
      bottomNavIndex: 0,
      bottomNav: [{
        span: '首页',
        icon: 'loyalty',
        path:'/index'
      }, {
        span: '分类',
        icon: 'format_list_bulleted',
        path:'/classify'
      }, {
        span: '菜篮',
        icon: 'shopping_basket',
        path:'/shoppingCart'
      }, {
        span: '我的',
        icon: 'face',
        path:'/face'
      }]
    }
  },
  computed:{
    activePath(){
      if (this.$route.matched[0]) {
        return this.$route.matched[0].path
      }
      return '/'
    }
  },
  methods: {
    bottomNavChange(index) {
      this.bottomNavIndex = index
      this.$router.push(this.bottomNav[index].path)
    }
  }
}
</script>

<style lang="css" scoped>
.bottom-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1
}
.bottom-item {
  transition: .2s;
}
</style>
