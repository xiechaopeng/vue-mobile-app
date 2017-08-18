<template lang="html">
  <div>
    <div class="classify-search">
      <input type="text" name="" value="">

    </div>
    <div class="classify">
      <div class="g-left">
        <div class="g-list">
          <div class="item" v-for="item,index in classify"
          :class="{active:classifyIndex==index}"
          @click="changeClassify(item,index)">
            {{item.title}}
          </div>
          <div class="item" v-for="item,index in classify">
            {{item.title}}
          </div>
        </div>
      </div>
      <div class="g-right">
        <mu-paper class="item" :key="n" v-for="n in 30">
          西红柿
          <img src="https://hbimg.b0.upaiyun.com/195a11863d6b6de6e45742b22ce5617954d7026310782f-ZB2uyr_fw658" alt="">
        </mu-paper>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      classifyIndex:0,
      classify:[{
        title:'瓜果蔬菜',
        img:'',
        child:[{
          title:'茎叶菜',
          img:''
        }]
      },{
        title:'禽畜鲜肉',
        img:'',
      },{
        title:'禽畜冻肉',
        img:'',
      },{
        title:'五谷制品',
        img:'',
      },{
        title:'调味其他',
        img:'',
      },{
        title:'品牌干货',
        img:'',
      },{
        title:'米面粮油',
        img:'',
      },{
        title:'冻肉制品',
        img:'',
      },{
        title:'水发腌货',
        img:'',
      },{
        title:'禽蛋品类',
        img:'',
      },{
        title:'酒水饮料',
        img:'',
      },{
        title:'用品用具',
        img:'',
      }]
    }
  },
  methods:{
    changeClassify(val,index){
      this.classifyIndex = index
    }
  }
}
</script>

<style lang="scss">
  .classify-search{
    padding: 5px;
    box-shadow: 1px 0px 2px rgba(0,0,0,.2);
    margin-bottom: 5px;
    input{
      width: 100%;
      outline: none;
      // border: none;
      border: 0.08rem solid #bbb;
      border-radius: 2px;
      line-height: 30px
    }
  }
  .classify{
    display: flex;
    justify-content: space-around;
    .g-left{
      width: 35%;
      height: calc(100vh - 100px);
      overflow: hidden;
      position: relative;
      .g-list{
        overflow: auto;
        position: absolute;
        width: 100%;
        height: 100%;
        // transition: all .2s;
        .item{
          line-height: 48px;
          text-align: center;
          background: #f5f5f5;
          &.active{
            background: #fff;
            border-left: 3px solid #ff5252;
          }
        }
      }
    }
    .g-right{
      width: 60%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      height: calc(100vh - 100px);
      overflow: hidden;
      position: relative;
      .right{

      }
      .item{
        width: 48%;
        height: 48px;
        line-height:48px;
        text-align: center;
        margin-bottom: 1rem;
        overflow: hidden;
        position: relative;
        background: none;
        img{
          position: absolute;
          width: 100%;
          left: 0;
          top: 0;
          z-index: -1;
        }
      }
    }
  }
</style>
