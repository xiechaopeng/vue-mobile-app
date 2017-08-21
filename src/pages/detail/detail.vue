<template lang="html">
  <div class="detail" v-html="data">
  </div>
</template>

<script>
export default {
  data(){
    return {
      data:''
    }
  },
  methods:{
    async getGoodsDetailById(){
      let res = await this.api.getGoodsDetailById(this.$route.params.id)
      let html = res.data.productDescription
      this.data =html.split('<p>')[1].split('</p>')[0]
    }
  },
  mounted(){
    this.getGoodsDetailById()
  }
}
</script>

<style lang="scss">
  .detail {
    img{
      width: 100% !important
    }
  }
</style>
