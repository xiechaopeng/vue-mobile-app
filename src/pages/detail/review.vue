<template lang="html">
  <div class="g-review" v-if="visible">
    <div class="review" v-for="item,index in data.items">
      <div class="g-user">
        <mu-paper class="user" circle
        :zDepth="2"
        :style="{'background-image':'url('+item.user.profilePicture+')'}">
        </mu-paper>
      </div>
      <div class="content">
        <div>
          <span class="userName">
            {{item.user.username}}:
          </span>
          {{item.productReviews.productReviews}}
        </div>
        <div class="createTime">
          <span>
            {{item.productReviews.updated}}
          </span>
          <div class="rate">
            <i class="material-icons icon" v-for="n in item.productReviews.rate">star</i>
            <i class="material-icons icon" v-for="n in 5-item.productReviews.rate">star_border</i>
          </div>
        </div>
      </div>
    </div>
    <mu-pagination style="justify-content:center;margin-top:1rem" :total="data.totalPage" :current="data.currentPage">
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
      let res = await this.api.getGoodsReview({
        id:this.$route.params.id,
        currentPage:"1",
        pageSize:"5"
      })
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
      font-size: .75rem;
      width:calc(100% - 60px);
      color: #474a4f;
      min-height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
