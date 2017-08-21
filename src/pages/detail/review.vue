<template lang="html">
  <div class="g-review" v-if="visible">
    <div class="review" v-for="item,index in data">
      <div class="g-user">
        <mu-paper class="user" circle
        :zDepth="2"
        :style="{'background-image':'url('+item.user.coverUrl+')'}">
        </mu-paper>
      </div>
      <div class="content">
        <span class="userName">
          {{item.user.name}}:
        </span>{{item.content}}
        <div class="createTime">
          <span>
            {{item.createTime}}
          </span>
          <div class="rate">
            <i class="material-icons icon" v-for="n in item.rate">star</i>
            <i class="material-icons icon" v-for="n in 5-item.rate">star_border</i>
          </div>
        </div>
      </div>
    </div>
    <mu-pagination style="justify-content:center;margin-top:1rem" :total="data.length" :current="1">
    </mu-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      visible:false,
      data:''
    }
  },
  methods:{
    async getGoodsReview(){
      let res = await this.api.getGoodsReview(this.$route.params.id)
      this.data = res.data
      this.visible = true
    }
  },
  mounted(){
    this.getGoodsReview()
  }
}
</script>

<style lang="scss" scoped>
.g-review{
  padding: 3%;
  .review{
    display: flex;
    padding: 10px 0;
    border-top: 1px dashed #ccc;
    justify-content: space-between;
    .g-user{
      .user{
        width: 50px;
        height: 50px;
        background-size: cover;
      }
    }
    .content{
      text-indent: 5%;
      font-size: .75rem;
      width:calc(100% - 60px);
      color: #474a4f;
      .userName{
        color: #2196f3
      }
      .createTime{
        text-indent: 0;
        margin-top: .5rem;
        color: #bbb;
        display: flex;
        justify-content: space-between;
        .rate{

          .icon{
            font-size: .7rem;
            color: #ff5252
          }
        }
      }
    }
  }
}
</style>
