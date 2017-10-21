<template lang="html">
  <div class="login">
    <my-header fixed></my-header>
    <mu-paper :zDepth="2">
      <img-div height="30vh" radius="4px" imgUrl="http://www.z4a.net/images/2017/08/21/10257650d45.jpg">
        <div class="g-login">
          <span class="slogen" style="">让采购 更愉悦</span>
          <div class="g-login-btn" style="">
            <div class="base c-login" :class="{active:submitType=='login'}" @click="submitType='login'">登录</div>
            <div class="base c-line">|</div>
            <div class="base c-reg"  :class="{active:submitType=='reg'}" @click="submitType='reg'">注册</div>
          </div>
        </div>
      </img-div>
    </mu-paper>
    <br>
    <mu-text-field v-model="user.username" :errorText="phoneErrText" @blur="checkPhone" hintText="手机号" fullWidth />
    <div v-if="submitType=='reg'" style="display:flex">
      <mu-text-field :errorText="codeErrText" v-model="user.identifyingCode" hintText="验证码" fullWidth />
      <mu-flat-button style="margin-top:10px" v-if="codeTimeOut>0" :label="codeTimeOut+'s后可重发'" labelPosition="before" icon="message" secondary/>
      <mu-flat-button style="margin-top:10px" v-else @click="getCode" label="获取验证码" labelPosition="before" icon="message" secondary/>
    </div>
    <mu-text-field v-model="user.password" :errorText="pswErrText" v-if="submitType=='login'" hintText="密码" type="password" fullWidth />
    <mu-text-field v-model="user.password" :errorText="pswErrText" v-if="submitType=='reg'" hintText="密码" fullWidth />
    <mu-raised-button v-if="submitType=='login'" label="登录" @click.native="login" secondary fullWidth/>
    <mu-raised-button v-if="submitType=='reg'" label="注册" @click.native="reg" secondary fullWidth/>
    <div style="font-size:.8rem;color:#bbb;text-align:center;margin:1rem 0">
      <span style="float:left" @click="dialog=true">忘记密码?</span>
      {{userSlogen[submitType]}}
      <span v-if="submitType=='login'" @click="submitType='reg'" style="float:right">我想注册</span>
      <span v-if="submitType=='reg'" @click="submitType='login'" style="float:right">我想登录</span>
    </div>
    <!-- <div style="position:fixed;width:100%;z-index:1;bottom:0;padding-bottom:1rem">
      <div style="font-size:.8rem;color:#bbb;text-align:center;margin:1rem 0">
        使用第三方账号
      </div>
      <div style="display:flex;justify-content:space-around;font-size:.7rem">
        <mu-float-button mini secondary>
          微信
        </mu-float-button>
        <mu-float-button mini secondary>
          QQ
        </mu-float-button>
        <mu-float-button mini secondary>
          微博
        </mu-float-button>
      </div>
    </div> -->
    <mu-dialog :open="dialog" title="" @close="close">
      <div style="position:relative">
        <div style="position:absolute;right:0;top:0;z-index:1" @click="close">
          <mu-float-button style="width:30px;height:30px;font-size:12px;background:#fff;color:#ff5252" mini>
            <mu-icon :size="14" value="close"/>
          </mu-float-button>
        </div>
        <mu-text-field label="手机号" hintText="输入手机号" :errorText="phoneErrText" @blur="checkPhone"  v-model="user.username" fullWidth/><br/>
        <div style="display:flex">
          <mu-text-field :errorText="codeErrText" v-model="user.identifyingCode" hintText="验证码" fullWidth />
          <mu-flat-button style="margin-top:10px" v-if="codeTimeOut>0" :label="codeTimeOut+'s后可重发'" labelPosition="before" icon="message" secondary/>
          <mu-flat-button style="margin-top:10px" v-else @click="getCode" label="获取验证码" labelPosition="before" icon="message" secondary/>
        </div>
        <mu-text-field type="password" v-model="user.password" :errorText="pswErrText" label="设置新密码" hintText="输入新密码"/><br/>
        <mu-raised-button slot="actions" @click.native="forgot" secondary fullWidth label="确认"/>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import md5 from 'js-md5'
import myHeader from '@/components/header'
export default {
  components: {
    myHeader
  },
  data() {
    return {
      submitType: 'login',
      userSlogen: {
        login: '享品质生活',
        reg: '从这里开始 愉悦的采购'
      },
      phoneErrText:'',
      pswErrText:'',
      codeErrText:'',
      user: {
        username: '',
        identifyingCode: '',
        password: ''
      },
      codeTimeOut:0,
      dialog:false
    }
  },
  watch:{
    submitType(val){
      this.phoneErrText=''
      this.pswErrText=''
      this.codeErrTetx=''
      this.user.password = ''
    },
    codeTimeOut(val){
      if (val!=0) {
        setTimeout(()=>{
          this.codeTimeOut--
        },1000)
      }
    }
  },
  mounted() {
    this.submitType = this.$route.params.type
  },
  methods: {
    close(){
      this.dialog = false
      this.clearErr()
    },
    async forgot(){
      if (this.user.username != '' && this.user.password != '' && this.user.identifyingCode !='') {
        let res = await this.api.forgot({
          username:this.user.username,
          password:md5(this.user.password),
          identifyingCode:this.user.identifyingCode
        })
        if (res) {
          alert('密码修改成功,请使用新密码登录')
          this.user.password = ''
          this.user.identifyingCode = ''
          this.clearErr()
        }
        this.dialog = false
      }else {
        this.textField()
      }
    },
    clearErr(){
      this.phoneErrText = ''
      this.pswErrText = ''
      this.codeErrText = ''
    },
    textField(){
      if (this.user.username == '') {
        this.phoneErrText = '手机号是必填的'
      }
      if (this.user.password == '') {
        this.pswErrText = '密码是必填的'
      }
      if (this.user.identifyingCode=='') {
        this.codeErrText = '验证码是必填的'
      }
    },
    checkPhone() {
      let phone = this.user.username
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        this.phoneErrText = '请输入正确的手机号'
        return false;
      } else {
        this.phoneErrText = ''
        return true
      }
    },
    async login() {
      if (this.user.username != '' && this.user.password != '') {
        localStorage.removeItem('token')
        let res = await this.api.login({
          username:this.user.username,
          password:md5(this.user.password)
        })
        if (res) {
          localStorage.setItem('token',res.data)
          this.$router.replace('/face')
        }
      } else {
        this.textField()
      }
    },
    async reg() {
      if (this.user.username != '' && this.user.password != '' && this.user.identifyingCode!='' &&this.checkPhone()) {
        let usernameVisible = await this.api.checkUsername(this.user.username)
        if (usernameVisible) {
          let res = await this.api.reg({
            username:this.user.username,
            password:md5(this.user.password),
            identifyingCode:this.user.identifyingCode
          })
          if (res) {
            this.user.password = ''
            this.submitType = 'login'
          }
        }

      } else {
        this.textField()
      }
    },
    async getCode() {
      if (this.checkPhone()&&this.username!=''&&this.identifyingCode!='') {
        let res = this.api.getCode(this.user.username)
        if (res) {
          this.codeTimeOut = 60
        }else {
          this.codeErrText = '验证码获取失败'
        }
      }else{
        if (this.user.username=='') {
          this.phoneErrText = '手机号是必填的'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.login {
    height: 100vh;
    padding: 0 1%;
    overflow: hidden;
}
.g-login {
    line-height: 30vh;
    height: 30vh;
    text-align: center;
    color: rgba(255,255,255,.8);
    position: relative;
    .slogen {
        font-size: 2rem;
        font-weight: 500;
    }
    .g-login-btn {
        line-height: 1;
        position: absolute;
        bottom: -5px;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: center;
        font-size: 1rem;
        color: #fff;
        .base {
            padding: 10px 0;
        }
        .c-login {}
        .c-line {
            margin: 0 2rem;
        }
        .c-reg {}
        .active {
            border-bottom: 2px solid #ff5252;
        }
    }
}
</style>
