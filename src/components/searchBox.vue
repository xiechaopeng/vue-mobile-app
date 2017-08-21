<template lang="html">
  <div class="g-search" :class="{fixed}" :style="style">
    <div class="position">
      <mu-flat-button primary>
        <mu-icon :size="16" value="location_on" />
        <div>{{location}}</div>
      </mu-flat-button>
    </div>
    <div class="search-box">
      <input type="text" placeholder="搜索你想要的食材" />
    </div>
    <div>
      <mu-icon-button>
        <mu-icon :size="20" value="search" />
      </mu-icon-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    bgOpacity:{
      type: Number,
      default: 0
    }
  },
  computed:{
    style(){
      if (this.bgOpacity>=0.95) {
        return {
          boxShadow:'2px 2px 2px rgba(0,0,0,.2)',
          backgroundColor:`rgba(255,255,255,${this.bgOpacity})`
        }
      }
      return {
        backgroundColor:`rgba(255,255,255,${this.bgOpacity})`
      }
    }
  },
  data() {
    return {
      location: '贵港',
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed{
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 1
}

.g-search {
    display: flex;
    align-items: center;
    // transition: all .4s;
    .search-box {
        width: calc(100% - 88px - 48px);
        input {
            border: none;
            width: 100%;
            outline: none;
            background-color: rgba(0,0,0,.2);
            padding-left: 10px;
            line-height: 24px;
            border-radius: 30px;
            color: #424242;
        }
    }
}
</style>
