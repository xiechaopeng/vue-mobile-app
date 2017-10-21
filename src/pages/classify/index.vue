<template lang="html">
      <div class="g-classify">
        <mu-paper :zDepth="2" :key="index" class="classify-card" v-for="item,index in classifyList">
            <img-div @click.native="toDetail(item,index)" radius="3px" :imgUrl="imgList[index]">
              <div class="header">
                {{item.name}}
              </div>
            </img-div>
        </mu-paper>
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
      }],
      classifyList:[],
      imgList:['http://www.z4a.net/images/2017/08/24/jiushui.jpg',
    'http://www.z4a.net/images/2017/08/24/liang.jpg',
  'http://www.z4a.net/images/2017/08/24/lingshi.jpg',
'http://www.z4a.net/images/2017/08/24/baihuo.jpg',
'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503589520858&di=273836c507469e12bd7109b8a2ca9a88&imgtype=0&src=http%3A%2F%2Fpic.qjimage.com%2Fmhrf008%2Fhigh%2Fmhrf-cpmh-106651f07.jpg',
'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=1121546933,167999058&fm=202&mola=new&crop=v1',
'http://www.z4a.net/images/2017/08/19/zhurou.jpg']
    }
  },
  methods:{
    changeClassify(val,index){
      this.classifyIndex = index
    },
    async getCatgory(){
      let res = await this.api.getCatgory(0)
      this.classifyList=res.data
    },

    toDetail(item,index){
      this.$router.push('/classify/detail?id='+item.id+'&name='+item.name+'&imgUrl='+this.imgList[index])
    }
  },
  mounted(){
    this.getCatgory()
  }
}
</script>

<style lang="scss" scoped>
  .g-classify{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 1rem;
    .classify-card{
      width: 48%;
      margin-bottom: 1rem;
      .header{
        text-align: center;
        background-color: rgba(0,0,0,.4);
        color: rgba(255,255,255,.8);
        position: absolute;
        width: 100%;
        height: 100%;
        top:0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 3px;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
</style>
