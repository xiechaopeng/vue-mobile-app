<template lang="html">
  <div>
    <div v-if="data" style="display:flex;padding:0 2px;margin-bottom:.5rem">
      <div style="width:25%;margin-right:.5rem">
        <img-div @click.native="toDetail(data)" style="border-radius:2px;box-shadow: 0 2px 5px rgba(0, 0, 0, .156863), 0 2px 5px rgba(0, 0, 0, .227451)" :imgUrl="data.images" height="65px">

        </img-div>
      </div>
      <div style="display:flex;flex-direction: column;justify-content:space-between;flex:1">
        <div v-text-overflow="2">
          <div @click="toDetail(data)" v-html="data.title.split('&')[0]">

          </div>
        </div>
        <div style="display:flex;justify-content:space-between;color:#ff5252">
          <div>
            ¥{{data.price||data.discount}}
          </div>
          <div>
            <!-- <i style="font-size:14px;margin-right:1rem" class="material-icons">favorite</i> -->
            <i @click="clickShop(data)" style="font-size:14px" class="material-icons">add_shopping_cart</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:Object,
    default(){
      return {}
    }
  },
  methods:{
    toDetail(item){
      this.$router.push('/detail/' + item.id)
    },
    clickShop(item){
      let temp = item
      temp.imgUrl = item.images
      this.$store.commit('openShoppingCart',temp)
    }
  }
}
</script>

<style lang="css">
</style>
