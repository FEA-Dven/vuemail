<template>
  <div class="box">
     <div class="header">
      <img class="inboxlogo" src="../assets/mylogo.png"  alt="">
      <div class="searchdiv">
        <img :src="[isSearch ? require('../assets/b_cha.png') : require('../assets/search.png')]" class="searchpic" alt="" @click="czMail">
        <input type="text" class="searchInput" id="searchInput" v-model="fminput">
      </div>
    </div>
    <div class="headinfo">
      <img class="left" src="../assets/b_left.png" @click="back" alt="">
      <span class="foldername">{{SelectFolderName}}</span>
    </div>
    <div class="box">
      <checker v-model="demo1" type="checkbox" default-item-class="demo1-item" :max="5" selected-item-class="demo1-item-selected">
      <div v-for="(item, index) in theMailList">
        <div class="maillist" :class="{'s_maillist':item.check}">
          <div class="kgdiv">
          <checker-item :value="item" :key="index" @on-item-click="changeCheck" :class="{'demo1-item-selected':item.check}">   
          </checker-item>
          </div>
          <div class="mailtheme" @click="getMailInfo" :data-msgid="item.msg_id">
            <div class="sendtor" :class="{'b_sendtor':!item.attr.read}">{{item.from.name}}</div>
            <div class="title">{{item.subject}}</div>
            <div class="zhuti">{{item.date_sent}}</div>
          </div>
        </div>
      </div>
      </checker>
      <div class="maillistfooter">
        <span class="allSelect" :class="{'check':allselect}" @click="AllSelect"></span>
        <span class="s_length">{{SmailLength}}</span>
        <img src="../assets/h_close.png" class="closebtn" @click="clear" :class="{'hide':!clearSelect}" alt="">
        <button class="defaultbtn" @click="unRead">标为未读</button>
        <button class="defaultbtn" @click="Delmail">删除</button>
        <button class="defaultbtn" @click="showAction"><img class="slh" src="../assets/h_slh.png" alt=""></button>
        <div class="pagecount" :class="{'pagecounttwo':clearSelect}">
          <img class="imgleft" @click="pageTurnLeft" src="../assets/h_left.png" alt="">
          <span class="pageinfo">{{nowPage}}&nbsp;/&nbsp;{{totalPage}}</span>
          <img class="imgright" @click="pageTurnRight" src="../assets/h_right.png" alt="">
        </div>
        
      </div>
      <br>
      <span></span>
      <br>
      
    </div>
    <div class="thisblank"></div>
  <actionsheet v-model="showaction" :menus="menus1" @on-click-menu="operate"></actionsheet>
  <actionsheet v-model="showfolder" :menus="folders" @on-click-menu="sfolder"></actionsheet>
  <toast v-model="showToast" type="text" :time="500" is-show-mask :text="this.toastText" :position="showPosition"></toast>
  </div>
</template>

<script>
import { Badge, Group, Cell, Checker, CheckerItem,Actionsheet,Toast } from 'vux'
export default {
  components: {
    Badge,
    Group,
    Cell,
    Checker,
    CheckerItem,
    Actionsheet,
    Toast
  },
  computed:{
    SelectFolderName(){
      return this.$route.query.foldername
    },
    theMailList(){
      if(this.nowPage==1){
        var start = 0
      }else{
        var start = (this.nowPage-1)*5;
      }
      var end = start+5
      return this.MailList.slice(start,end);
    },
    SmailLength(){
      if(this.demo1.length=='0'){
        return ;
      }else{
        return this.demo1.length
      }
    },
    totalPage(){
      let tp = parseInt(this.MailList.length/5)
      if(this.MailList.length%5!==0){
        return tp+1
      }else{
        return tp
      }
    },
    clearSelect:{
      get(){
        if(this.demo1.length>0){
          return true
        }else{
          return false
        }
      },
      set(){

      }
    }
  },
  mounted(){
    this.getMailList()
  },
  data:function(){
    return {
      showToast:false,
      allselect:false,
      showaction:false,
      showfolder:false,
      isSearch:false,
      fminput:'',
      toastText:'',
      showPosition:'middle',
      MailList:"",
      demo1:[],
      menus1: {
        menu1: '标为已读',
        menu2: '移动到'
      },
      folders:{},
      nowPage:1,
    }
  },
  methods:{
     getMailList(){
      var that = this
      let id = this.$route.query.folderid
      let page = this.$route.query.page
      let perpage = this.$route.query.perpage
      let sort = this.$route.query.sort
      let data = {
        id:id,
        page:page,
        perpage:perpage,
        sort:sort
      }
      this.$http.post('http://127.0.0.1:2800/getmaillist',data,{emulateJSON:true}).then((res)=>{
        that.MailList = res.body;
        that.MailList.forEach((item)=>{
          item.check = false;
        })
      })
      this.$http.post('http://127.0.0.1:2800/getfolders',{},{emulateJSON:true}).then((res)=>{
        res.body.forEach((item,index)=>{
         that.folders[item.id] = item.name
        })
      })
    },
    czMail:function(){
      var that = this
      that.demo1.splice(0,that.demo1.length)
      if(that.isSearch){
        let id = this.$route.query.folderid
        let page = this.$route.query.page
        let perpage = this.$route.query.perpage
        let sort = this.$route.query.sort
        let data = {
          id:id,
          page:page,
          perpage:perpage,
          sort:sort
        }
        this.$http.post('http://127.0.0.1:2800/getmaillist',data,{emulateJSON:true}).then((res)=>{
          that.MailList = res.body;
          that.MailList.forEach((item)=>{
            item.check = false;
          })
          that.fminput = '';
          that.isSearch = false
        })
      }else{
        var fmname = that.fminput
        that.MailList.forEach((item)=>{
          if(fmname == item.from.email || fmname == item.from.name){
            that.MailList.splice(0,that.MailList.length);
            that.MailList.push(item);
            that.isSearch = true
          }else{
            
          }
        })
      }
    },
    back:function(){
      this.$router.push("/inbox")
    },
    AllSelect:function(){
      var that = this
      that.allselect = !that.allselect
      if(that.allselect==true){
        that.theMailList.forEach(function(item){
          if(item.check==false){
            that.demo1.push(item)
          }
          item.check = true
        })
      }else{
        that.theMailList.forEach(function(item){
          item.check = false
          that.demo1.splice(0,that.demo1.length)
        })
      }
    },
    changeCheck:function(e){
      e.check = !e.check;
      var that = this
      if(this.demo1.length!==this.theMailList.length){
        this.allselect = false
      }else{
        this.allselect = true
      }
    },
    unRead:function(){
    var that = this
    var folderid = that.$route.query.folderid
    var url = 'http://127.0.0.1:2800/set_read'
      if(that.demo1.length<1){
        alert('请选择邮件');
      }else{
        that.demo1.forEach(function(item){
            item.attr.read = false
            let data = {
              msg:{
                folder_id:folderid,
                msg_id:item.msg_id,
              },
              read:false
            }
            that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
              if(res.body=='success'){
                  that.toastText = '设置未读成功'
                  that.showToast = true
              }
            })
        })
      }
    },
    Delmail:function(){
      var that = this
      var folderid = that.$route.query.folderid
      var url = 'http://127.0.0.1:2800/msg_delete_actual'
      if(this.demo1.length<1){
        alert('请选择邮件');
      }else{
        that.demo1.forEach(function(item){
            let data = {
              msg:{
                folder_id:folderid,
                msg_id:item.msg_id,
              }
            }
            that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
              if(res.body=='success'){
                  that.toastText = '删除邮件成功'
                  that.showToast = true
              }
            })
        })
      }
    },
    showAction:function(){
      this.showaction = true;
    },
    operate:function(key){
    var that = this
    var folderid = that.$route.query.folderid
    var url = 'http://127.0.0.1:2800/set_read'
      if(key=='menu1'){
        if(that.demo1.length<1){
          alert('请选择邮件');
        }else{

          that.demo1.forEach(function(item){
            item.attr.read = true
            let data = {
              msg:{
                folder_id:folderid,
                msg_id:item.msg_id,
              },
              read:true
            }
            that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
              if(res.body=='success'){
                that.toastText = '设置已读成功'
                that.showToast = true
              }
            })
          })
        }
      }else if(key=='menu2'){
        if(that.demo1.length<1){
          alert('请选择邮件');
        }else{
          that.showfolder = true
        }
      }
    },
    sfolder:function(e,key){
      var that = this 
      var folderid = that.$route.query.folderid
      var ftd = e;
      var url = "http://127.0.0.1:2800/msg_move" 
      that.demo1.forEach(function(item){
        let data = {
          folder_id_target:ftd,
          msg:{
            folder_id:folderid,
            msg_id:item.msg_id,
          }
        }
        that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
          if(res.body=='success'){
            that.toastText = '移动邮件成功'
            that.showToast = true
          }
        })
      })       
    },
    pageTurnLeft:function(){
      var that = this
      if(that.nowPage==1){
        console.log(1)
      }else{
        that.theMailList.forEach(function(item){
          item.check = false
          that.demo1.splice(0,that.demo1.length)
        })
        this.allselect = false
        that.nowPage--;
      }
    },
    pageTurnRight:function(){
      var that = this
      if(that.nowPage==that.totalPage){

      }else{
        that.theMailList.forEach(function(item){
          item.check = false
          that.demo1.splice(0,that.demo1.length)
        })
        this.allselect = false
        that.nowPage++;
      }
      
    },
    getMailInfo(e){
      let folderid = this.$route.query.folderid;
      let msgid = e.currentTarget.dataset.msgid;
      let foldername = this.$route.query.foldername
      this.$router.push("mailinfo?folderid="+folderid+"&msgid="+msgid+"&foldername="+foldername)
    },
    clear:function(){
      var that = this;
      that.clearSelect = true;
      that.allselect = false;
      that.demo1.splice(0,that.demo1.length);
      that.theMailList.forEach((item)=>{
        item.check = false
      })
    }
  }
}
</script>

<style >
.box{
  position:relative;
}
.searchdiv{
  float:right;
  margin-right:15px;
  height: 40px;
  box-sizing:border-box;
  width:140px;
}
.searchpic{
  width:18px;
  height: 18px;
  position:absolute;
  right:18px;
  top:50%;
  margin-top:-9px;
}
.searchInput{
  width:100%;
  padding:0 25px;
  box-sizing:border-box;
  height: 24px;
  border:1px solid #ccc;
  border-radius:7px;
  line-height:24px;
  margin-top:8px;
  outline:none;
}
.headinfo{
  width:100%;
  height: 50px;
  border-bottom:1px solid #dadada;
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
.kgdiv{
  width:10%;
  margin-left:2%;
  height:80px;
  float:left;
}
.mailtheme{
  float:left;
  height: 80px;
  width:85%;
  margin-left:1%;
}
.demo1-item {
  border: 1px solid #ccc;
  width:16px;
  height: 16px;
  border-radius:50%;
  margin-top:5px;
  float:left;
}
.demo1-item-selected {
  border: 1px solid #0089ce;
  background-color: #0089ce;
}
.maillist{
  width:100%;
  height: 80px;
  float:left;
  border-bottom:1px solid #dadada;
  background-color: white;
}
.s_maillist{
  background-color: #ebf6ff;
}
.sendtor{
  float:left;
   width:100%;
  height: 25px;
  line-height:25px;
  display:block;
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis;
  color:#000000;
  font-size:16px;
}
.b_sendtor{
  color:#0089ce;
}
.title{
  float:left;
  width:100%;
  height: 25px;
  line-height:25px;
  display:block;
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis;
  font-size:16px;
}
.zhuti{
  float:left;
  width:100%;
  height: 25px;
  line-height:25px;
  display:block;
  white-space:nowrap; 
  overflow:hidden; 
  text-overflow:ellipsis;
  font-size:14px;
  color:#ccc;
}
.maillistfooter{
  height: 40px;
  width:100%;
  background-color: #f2f2f2;
  float:left;
  border-bottom:1px solid #dadada;
}
.allSelect{
  width:16px;
  height: 16px;
  margin-top:10px;
  margin-left: 10px;
  float:left;
  border-radius:50%;
  border:1px solid #ccc;
  background-color: white;
}
.s_length{
  width:10px;
  height: 16px;
  margin-top:12px;
  margin-left: 10px;
  float:left;
  color:#000;
  line-height:16px;
}
.check{
  background-color: #0089ce;
  border:1px solid #0089ce;
}
.closebtn{
  width:18px;
  height: 18px;
  float:left;
  margin-top:11px;
  margin-left: 5px;
}
.defaultbtn{
  width:auto;
  height: 24px;
  float:left;
  border:1px solid #d5d5d5;
  border-radius:6px;
  background-color: white;
  color:#000;
  line-height:24px;
  outline:none;
  margin-top:8px;
  margin-left:10px;
  font-size:12px;
  padding:0 8px;
}
.slh{
  width:16px;
  height: 16px;
  line-height:24px;
  margin-top:4px;
}
.pagecount{
  height: 30px;
  margin-top:5px;
  width:80px;
  margin-left:40px;
  float:left;
}
.pagecounttwo{
  margin-left:10px;
}
.pageinfo{
  width:auto;
  margin-top:5px;
  height: 20px;
  float:left;
  line-height:20px;
  font-size:12px;
  margin-left:5px;
}
.imgleft{
  float:left;
  width:20px;
  height: 20px;
  margin-top:5px;
}
.imgright{
  float:left;
  width:20px;
  height: 20px;
  margin-top:5px;
  margin-left: 5px;
}
.hide{
  display:none;
}
.thisblank{
  width:100%;
  float:left;
  height: 150px;
  background-color: transparent;
}

</style>
