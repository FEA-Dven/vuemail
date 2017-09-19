<template>
  <div>
    <div class="header">
      <img class="inboxlogo" src="../assets/mylogo.png"  alt="">
    </div>
    <div class="headinfo">
      <img class="left" src="../assets/b_left.png" @click="back" alt="">
      <span class="foldername">设置</span>
    </div>
    <div class="userInfodiv">
        <div class="inputdiv">
          <span class="label">昵称</span>
          <input type="text" class="nickname" maxlength="32" v-model="nickName">
        </div>
        <div class="pretermitdiv">
          <span class="title">默认发信账号</span>
          <div class="myradiodiv">
            <span class="myradio"><span class="checkradio"></span></span>
            <span class="pretermitemail">{{email}}</span>
           
            
          </div>
           <div class="quitdiv">
              <span class="quitbtn" @click="logout">退出登录</span>
            </div>
        </div>
    </div>
    <div class="footer">
      <button class="settingBtn">保存</button>
      <button class="settingBtn">取消</button>
    </div>
  </div>
</template>

<script>
import { Badge, Group, Cell } from 'vux'


export default {
  name: 'inbox',
  components:{
    Badge,
    Group,
    Cell
  },
  computed:{  
    email(){
      return localStorage.getItem('username');
    },
  }, 
  mounted(){
    this.getUserInfo()
  },
  data () {
    return {
      nickName:'',
    }
  },
  methods:{
   back:function(){
    window.history.back();
   },
   getUserInfo:function(){
    this.nickName = localStorage.getItem('username')
   },
   logout:function(){
    localStorage.removeItem('username');
    this.$router.push('/log')
   }
  }
}
</script>

<style scoped>
.header{
  width:100%;
  height: 40px;
  border-bottom:1px solid #dadada;
  position:relative;
  text-align:center;
}
.inboxlogo{
  float:left;
  margin-top:11px;
  height: 23px; 
  width: 103px;
  margin-left:15px;
}
.headinfo{
  width:100%;
  height: 50px;
  border-bottom:1px solid #dadada;
  background-color: white;
}
.left{
  width:24px;
  height: 24px;
  float:left;
  margin-top:13px;
  margin-left:10px;
}
.foldername{
  float:left;
  width:auto;
  height: 50px;
  line-height:50px;
  margin-left:10px;
}
.userInfodiv{
  width:100%;
  padding:0 15px;
  box-sizing:border-box;
  padding-bottom:20px;
  background-color: white;
  float:left;
  border-bottom:1px solid #dadada;
}
.inputdiv{
  width:100%;
  height: 60px;
  float:left;
  background-color: white;
  margin-top:20px;
  border-bottom:1px solid #dadada;
}
.label{
  width:20%;
  height: 40px;
  line-height:40px;
  color:black;
  border:1px solid #dadada;
  float:left;
  text-align:center;
  border-right:none;
  border-top-left-radius:6px;
  border-bottom-left-radius:6px;
}
.nickname{
  width:78%;
  height: 42px;
  line-height:40px;
  padding:0 20px;
  box-sizing:border-box;
  border:1px solid #dadada;
  border-top-right-radius:6px;
  border-bottom-right-radius:6px;
  outline:none;
  float:left;
}
.pretermitdiv{
  width:100%;
  float:left;
}
.title{
  width:100%;
  height: 20px;
  line-height:20px;
  float:left;
  color:black;
  font-size:14px;
  margin-top:15px;
}
.myradiodiv{
  width:100%;
  height: 30px;
  float:left;
  margin-top: 15px;
}
.myradio{
  width:20px;
  height: 20px;
  float:left;
  border:1px solid #dadada;
  border-radius:50%;
  position:relative;
}
.checkradio{
  position:absolute;
  top:50%;
  left:50%;
  margin-top:-4px;
  margin-left:-4px;
  width:8px;
  height: 8px;
  background-color: #0089ce;
  border-radius:50%;
}
.pretermitemail{
  width:70%;
  float:left;
  height: 20px;
  margin-left:10px;
  color:black;
  font-size:14px;
  line-height:20px;
}
.footer{
  width:100%;
  background-color: #f2f2f2;
  height: 40px;
  border-bottom:1px solid #dadada;
}
.settingBtn{
  width:50px;
  height: 30px;
  background-color: #f9f9f9;
  color:black;
  line-height:30px;
  float:left;
  margin-top:5px;
  border:1px solid #d5d5d5;
  border-radius:6px;
  padding:0 10px;
  margin-left:10px;
  outline:none;
}
.quitdiv{
  width:100%;
  height: 40px;
  float:left;
  margin-top:10px;
}
.quitbtn{
  width:auto;
  height: 30px;
  background-color: #e64340;
  color:black;
  line-height:30px;
  float:left;
  margin-top:5px;
  border:1px solid #e64340;
  border-radius:6px;
  padding:0 10px;
  outline:none;
  color:white;
  padding:0 15px;
  font-size:14px;
}
</style>