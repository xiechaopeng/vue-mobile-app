<template lang="html">
  <div class="list-card">
    <div class="list-card-item">
      <div style="color:#616161;padding-left:.5rem" :style="{'border-left':'2px solid '+type[data.type].bgColor}">
        订单号:{{data.id}}
      </div>
      <div class="list-card-type" :style="{background:type[data.type].bgColor}">
        {{type[data.type].text}}
      </div>
    </div>
    <mu-divider/>
    <div class="list-card-item">
      <div class="list-card-item-title">
        {{data.title.split('&')[0]}}&nbsp;&nbsp;
      </div>
      <div>
        &nbsp;&nbsp;&times;{{data.titleCount}}
      </div>
    </div>
    <div v-if="data.count>1" style="color:#aaa">
      等{{data.count-1}}件商品
    </div>
    <div class="list-card-item">
      <div style="color:#bbb">
        {{data.time}}
      </div>
      <div style="color:#ff5252">
        共：¥ {{data.price}}
      </div>
    </div>
    <mu-divider/>
    <div class="list-card-item">
      <div class="list-card-control">
        <button @click="cancelOrder(data.id)" class="btn-del" type="button" v-if="data.type==0 || data.type==1">取消订单</button>
        <button @click="" class="btn-del" type="button" v-else>删除订单</button>
      </div>
      <div class="list-card-control">
        <button type="button" :style="{border: '1px solid '+type[data.type].bgColor,color: type[data.type].bgColor}">
          {{type[data.type].btn}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default(){
        return {
          title:'这个是测试的订单标题啊,实在是编不下去了',
          type:0,
          id:'001',
          time:'2017-09-01 14:00',
          price:'28',
          count:12,
          message:'这是是买家留言,麻烦认真看啊',
          tip:'不同类型的订单出现不同的提示吧',
          titleCount:2
        }
      }
    }
  },
  data(){
    return {
      type:[{
        text:'待发货',
        bgColor:'#ccc',
        color:'',
        btn:'提醒发货'
      },{
        text:'待付款',
        bgColor:'#ff5252',
        color:'',
        btn:'立即付款'
      },{
        text:'待确认',
        bgColor:'#ff9800',
        color:'',
        btn:'确认收货'
      },{
        text:'已完成',
        bgColor:'#ff5722',
        color:'',
        btn:'立即评价'
      }],
    }
  },
  methods:{
    cancelOrder(id){
      this.$emit('cancelOrder',id)
    }
  }
}
</script>

<style lang="scss">
.list-card{
  width: 100%;
  // height: 70px;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 218ms;
  padding: 5px 10px;
  font-size: .7rem;
  .list-card-item{
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    .list-card-item-title{
      display: flex;
    }
    .list-card-item-price{
      margin-left: 1rem;
      color: #ff5252
    }
    .list-card-tip{
      flex: 1
    }
  }
}
.list-card-type{
  height: 18px;
  background: #ccc;
  border-radius: 9px;
  width: 50px;
  text-align: center;
  color: #fff
}
.list-card-control{
  display: flex;
  justify-content: space-between;
  button{
    outline: none;
    border: none;
    background: none;
    border-radius: 4px;

  }
  .btn-del{
    border: 1px solid #ff5252;
    color: #ff5252
  }

  .btn-notify{
    border: 1px solid #aaa;
    color: #aaa
  }
  .btn-pay{
    border: 1px solid #ff5722;
    color: #ff5722
  }
}
</style>
