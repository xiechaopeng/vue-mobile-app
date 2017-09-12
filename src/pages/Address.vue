<template lang="html">
  <div>
    <my-header :headerBg="1" title="我的地址">
      <div slot="right">
        <mu-icon-button @click.native="$router.push('/addAddress')" icon="add"/>
      </div>
    </my-header>
    <scroll-continer marginTop="48px" marginBottom="56px">
      <div style="padding:1% 2%">
        <div class="page-address-card" v-for="item,index in address">
          <div style="flex:1">
            <div style="font-size:16px;font-weight:500">
              <mu-icon color="#ff5252" :size="14" value="face"/>{{item.user}}
            </div>
            <div style="margin:.3rem 0" class="ellipsis">
              <mu-icon color="#ff5252" :size="14" value="location_on"/>{{item.detail}}
            </div>
            <div>
              <mu-icon color="#ff5252" :size="14" value="phone"/>{{item.phone}}
            </div>
          </div>
          <div style="text-align:right;display:flex;flex-direction: column;justify-content: space-between;">
            <div @click="dialog=true;addressItem=item">
              <mu-float-button style="margin:0" icon="chevron_right" mini secondary/>
            </div>
            <div style="text-align:center" @click="deleteAddress(item,index)">
              <span style="font-size:12px;color:#aaa;color:#ff5252">删除</span>
            </div>
          </div>
        </div>
        <div v-if="address.length==0" style="text-align:center;margin-top:2rem">
          <mu-raised-button @click.native="$router.push('/addAddress')" label="添加地址" secondary/>
          <div style="font-size:12px;color:#ccc;margin-top:1rem">
            暂无地址,可点击添加哦
          </div>
        </div>
      </div>
    </scroll-continer>
    <mu-dialog :open="dialog" title="" @close="close">
      <div v-if="addressItem" style="position:relative">
        <div style="position:absolute;right:0;top:0;z-index:1" @click="close">
          <mu-float-button style="width:30px;height:30px;font-size:12px;background:#fff;color:#ff5252" mini>
            <mu-icon :size="14" value="close"/>
          </mu-float-button>
        </div>
        <mu-text-field label="收货人" hintText="提示文字" fullWidth v-model="addressItem.user"/><br/>
        <mu-text-field label="地址" hintText="提示文字" fullWidth v-model="addressItem.detail"/><br/>
        <mu-text-field label="手机号" hintText="提示文字" fullWidth v-model="addressItem.phone"/><br/>
        <div style="display:flex;justify-content:space-between;font-size:12px;align-items:center">
          <span >设置为默认地址</span>
          <mu-switch v-model="addressItem.default"/>
        </div>
      </div>
      <mu-raised-button slot="actions" secondary @click="update" fullWidth label="确认修改"/>
    </mu-dialog>
  </div>
</template>

<script>
import myHeader from '@/components/header'
export default {
  components: {
    myHeader
  },
  computed:{
    address() {
      let address = this.$store.state.address
      return address
    }
  },
  data(){
    return {
      dialog:false,
      addressItem:''
    }
  },
  methods:{
    close(){
      this.dialog = false
    },
    async update(){
      if (this.addressItem.default) {
        this.addressItem.acquiescence = 1
      }
      let res = await this.api.updateAddress(this.addressItem)
      this.dialog = false
    },
    async deleteAddress(item,index){
      let res = await this.api.deleteAddress(item.id)
      this.$store.commit('deleteAddress',item.id)
    }
  }
}
</script>

<style lang="scss">
  .page-address-card{
    border-radius: 3px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    padding: 1% 2%;
    padding-top: 1.5%;
    margin: 1rem 0;
    display: flex;
    height: 85px;
    justify-content: space-between;
  }
  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
</style>
