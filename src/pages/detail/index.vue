<template lang="html">
  <div class="index">
    <div class="header">{{title}}</div>
    <div class="unit">
      1{{unit}}
    </div>
    <div>
      {{desc}}
    </div>
    <div class="g-price">
      <div class="price">
        ¥
        <span>
          {{data.price}}
        </span>
      </div>
      <span>准时达</span>
      <i class="material-icons tag">av_timer</i>
      <span>销量：{{data.sales}}</span>
    </div>
    <div>
      库存剩余:{{data.stock}}
    </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  data(){
    return {
      title:'',
      unit:'',
      desc:''
    }
  },
  mounted(){
    this.title = this.data.title.split('&')[0]
    this.unit = this.data.title.split('&')[1]
    this.desc = this.data.title.split('&')[2]
  }
}
</script>

<style lang="scss" scoped>
  .index{
    height: calc(100vh - 45vh - 48px - 56px);
    background: #474a4f;
    color: rgba(255, 255, 255, 0.7);
    padding: 3%;
    div{
      margin-bottom: .7rem
    }
    .header{
      color: #fff;
      font-size: 1.3rem;
      font-weight: 500;
    }
    .g-price{
      display: flex;
      align-items:center;
      .price{
        color: #ff5252;
        font-size: 1rem;
        span{
          font-size: 2.5rem;
          font-weight: 500;
        }
      }
      div{
        padding-right: 1rem;
      }
      .tag{
        font-size: 1rem;
        padding-right: 1rem;
        padding-bottom: 3px;
      }
    }
  }
</style>
