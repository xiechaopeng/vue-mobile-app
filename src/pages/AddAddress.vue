<template lang="html">
  <div>
    <my-header :headerBg="1" title="添加收货地址"></my-header>
    <scroll-continer style="padding:0 1%" marginTop="48px" marginBottom="56px">
      <br>
      <template v-for="item,index in address">
        <div v-if="item.type=='check'" style="margin-bottom:2rem">
          <mu-switch labelLeft :label="item.label"/>
          <br>
        </div>
        <mu-text-field :errorText="item.errText" :disabled="item.sheet || item.disable" @click.native="inputClick(item,index)" v-else fullWidth v-model="item[item.props]" :hintText="item.label"/>
      </template>
      <mu-raised-button @click="addAddress" label="确认添加" class="add-address-btn" fullWidth secondary/>
    </scroll-continer>
    <mu-bottom-sheet :open="bottomSheet">
      <div class="address-select">
        <mu-list v-if="addressIndex==2">
          <template v-for="item,key in city">
            <mu-list-item  @click.native="cityKey=key">
              <div :style="{color:cityKey==key?'#ff5252':''}">{{key}}</div>
            </mu-list-item>
            <mu-divider/>
          </template>
        </mu-list>
        <mu-list v-if="addressIndex==2">
          <template v-for="item,index in city[cityKey]">
            <mu-list-item @click.native="cityIndex=index">
              <div :style="{color:index==cityIndex?'#ff5252':''}">{{item}}</div>
            </mu-list-item>
            <mu-divider/>
          </template>
        </mu-list>
        <mu-list v-if="addressIndex==3">
          <template v-for="item,key in district">
            <mu-list-item  @click.native="districtKey=key">
              <div :style="{color:districtKey==key?'#ff5252':''}">{{key}}</div>
            </mu-list-item>
            <mu-divider/>
          </template>
        </mu-list>
        <mu-list v-if="addressIndex==3">
          <template v-for="item,index in district[districtKey]">
            <mu-list-item @click.native="districtIndex=index">
              <div :style="{color:index==districtIndex?'#ff5252':''}">{{item}}</div>
            </mu-list-item>
            <mu-divider/>
          </template>
        </mu-list>
      </div>
      <mu-raised-button @click="selectAddress" secondary label="确认选择" fullWidth/>
    </mu-bottom-sheet>
  </div>
</template>

<script>
import myHeader from '@/components/header'
const city = require('./city')
const district = require('./district')
export default {
  components: {
    myHeader
  },
  data() {
    return {
      bottomSheet:false,
      city:'',
      cityKey:'重庆',
      cityIndex:0,
      district:{},
      districtKey:'渝北区',
      districtIndex:0,
      addressIndex:0,
      address: [{
          recname: '',
          props: 'recname',
          errText: '',
          label: '联系人'
        },
        {
          recphone: '',
          props: 'recphone',
          errText: '',
          label: '联系电话'
        },
        {
          area: '',
          props: 'area',
          errText: '',
          label: '市、区',
          // disable:true
          sheet:true
        },
        {
          street: '',
          props: 'street',
          errText: '',
          label: '街道',
          // disable:true,
          sheet:true
        },
        {
          address: '',
          props: 'address',
          errText: '',
          label: '详细地址'
        },
        {
          acquiescenceFlag: false,
          props: 'acquiescenceFlag',
          errText: '',
          type: 'check',
          label: '设为默认'
        }
      ]
    }
  },
  methods:{
    selectAddress(){
      let addressItem = this.address[this.addressIndex]
      if (this.addressIndex==2) {
        let cityKey = this.cityKey, cityIndex = this.cityIndex
        addressItem[addressItem.props] = cityKey+'-'+this.city[cityKey][cityIndex]
      }
      if (this.addressIndex==3) {
        let districtKey = this.districtKey, districtIndex = this.districtIndex
        addressItem[addressItem.props] = this.district[districtKey][districtIndex]
      }
      this.bottomSheet = false
    },
    async inputClick(item,index){
      if (item.sheet && !item.disable) {
        this.addressIndex = index
        if (index==2) {
          this.bottomSheet = true
          let res = await this.api.getArea()
          let area = []
          res.data.forEach((item)=>{
            area.push(item.area)
          })
          this.city = {
            '重庆':area
          }
        }
        if (index==3) {
          if (this.city) {
            this.bottomSheet = true
            let res = await this.api.getStreetByArea(this.city[this.cityKey][this.cityIndex])
            let area = []
            res.data.forEach((item)=>{
              area.push(item.street)
            })
            let temp = {}
            this.district = {}
            this.district[this.city[this.cityKey][this.cityIndex]] = area
          }else {
            alert('请先选择市、区')
          }
        }
      }
    },
    addAddress(){
      if (localStorage.token) {
        let nullCount = 0,data={}
        this.address.forEach((item)=>{
          data[item.props] = item[item.props]
          if (item.props=='acquiescenceFlag') {
            data['acquiescence'] = item[item.props]?"1":"0"
          }else{
            if (item[item.props]=='') {
              nullCount++
              item.errText = item.label + '为必填项'
            }else {
              item.errText = ''
            }
          }
        })
        if (nullCount==0) {
          data.area = data.area.split('-')[1]
          let res = this.api.addAddress(data)
          if (res) {
            this.$router.replace('/face')
          }
        }
      }else {
        alert('请先登录')
      }

    }
  }
}
</script>

<style lang="css">
.add-address-btn{
  margin-top: 2rem
}
.address-select{
  -webkit-overflow-scrolling: touch;
  height: 40vh;
  width: 100%;
  overflow: auto;
  display: flex;
}
</style>
