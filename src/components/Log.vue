<template>
  <div>
    <div class="logo">
      <img src="../assets/mylogo.png" height="47" width="207" alt="">
    </div>
    <div class="logform">
      <input :class="{'check': userCheck}" v-model="username" @focus="changeUserCheck" class="myinput" type="text" placeholder="请输入账号"/>
      <input :class="{'check': passCheck}" v-model="password" @focus="changePassCheck" class="myinput" type="password" placeholder="请输入密码">
      
      <button class="logbtn" @click="loggin">登录</button>
     
    </div>
    
  </div>
</template>

<script>
import { XButton} from 'vux'



export default {
  name: 'hello',
  components:{
    XButton
  },
  computed:{
  },  
  data () {
    return {
      userCheck:false,
      passCheck:false,
      username:'',
      password:'',
      openid:''
    }
  },
  methods:{
    changeUserCheck:function(){
      this.userCheck = true;
      this.passCheck = false;
    },
    changePassCheck:function(){
      this.userCheck = false;
      this.passCheck = true; 
    },
    loggin:function(){
      var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
      if(patt.test(this.username)){
        let data = {
          username:this.username,
          password:this.password,
        }
        this.$http.post('http://127.0.0.1:2800/user',data,{emulateJSON:true}).then((res)=>{
          let username = res.body.username;
          localStorage.setItem('username',username);
          this.$router.push('/inbox')
        })
      }else{
        alert(this.username+'格式不正确')
      }
      
    }
  }
}
</script>
<style scoped>
.logo{
  text-align:center;
  float:left;
  margin-top:130px;
  width:100%;
}
.logform{
  width:100%;
  padding:0 20px;
  box-sizing:border-box;

}
  .myinput{
    width:100%;
    border:none;
    border-bottom:1px solid #dadada;
    padding:0 30px;
    box-sizing:border-box;
    outline:none;
    height: 50px;
    line-height:50px;
    font-size:16px;
    margin-top:40px; 
    background-color: transparent;
  }
  .myinput.check{
    border-bottom:1px solid #0089ce;
  }
.logbtn{
  background-color: #0089ce;
  margin-top:60px;
  width:100%;
  height: 40px;
  line-height:40px;
  border:none;
  border-radius:7px;
  color:white;
  font-size:16px;
  outline:none;
}

</style>
