<template lang="html">
  <div>
    <h1>分类{{$route.path}}</h1>
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

<style lang="css">
</style>
