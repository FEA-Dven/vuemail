<template>
  <div>
   <div class="header">
      <img class="inboxlogo" src="../assets/mylogo.png"  alt="">
    </div>
    <div class="headmethods">
      <img src="../assets/b_left.png" class="backbtn" alt="" @click="back">
      <img src="../assets/b_slh.png" class="slhbtn" alt="" @click="moreAction">
      <img src="../assets/b_delete.png" class="shanchubtn" @click="delMail">
      <img src="../assets/b_reply.png" class="relaybtn" alt="" @click="relayMail">
    </div>
     <div class="detail">
        <div class="title">{{infosubject}}</div>
        <div class="simple" :class="{'hide':isShowDetail}">
            <span class="sendpeople">{{infofrom.name}}</span>
            <span class="fordetail" @click="showDetail">详情</span>
            <span class="time">{{infosendtime}}</span> 
        </div>
        <div class="nosimple" :class="{'hide':!isShowDetail}">
            <div class="sendtordiv">
                <div class="note">发件人</div>
                <div class="info">
                    <span class="name" ><span style="float:left;">{{infofrom.name}}&nbsp;</span><span class="address">&lt;{{infofrom.email}}&gt;;&nbsp;</span></span>
                          
                    <span class="forsimple" @click="closeDetail">隐藏</span>          
                </div>
            </div>
            <div class="getdiv">
                <div class="note">收件人</div>
                <div class="info" >
                  <div v-for="item in infoto">
                    <span class="name"><span style="float:left">{{item.name}}&nbsp;</span> <span class="address">&lt;{{item.email}}&gt;;</span></span>
                  </div>
                </div>
            </div>
            <div class="ccdiv">
                <div class="note">抄送</div>
                <div class="info">
                  <div v-for="item in infocc">
                    <span class="name"><span style="float:left">{{item.name}}&nbsp;</span><span class="address">&lt;{{item.email}}&gt;;&nbsp;</span></span>
                  </div>
                </div>
            </div>
            <div class="timediv">
                <div class="note">时间</div>
                <div class="info">
                   <span class="d_time">{{infosendtime}}</span>
                </div>
            </div>
        </div>
        
        
    </div> 
    <!-- 主题内容 -->
    <div class="theme" v-html="mailBody">
    </div>
    <div class="textdiv">
        <textarea name=""  class="content" v-model="replyInfo" :placeholder="placeholderName"></textarea>
        <button  class="reply" @click="reply">回复</button>
    </div>
    <span class="footfont">
        Copyright&copy;2017 Tencent Inc.All Rights Reserved.
    </span>
    <div class="blank"></div>
    <actionsheet v-model="showaction" :menus="menus1" @on-click-menu="operate"></actionsheet>
    <actionsheet v-model="showfolder" :menus="folders" @on-click-menu="sfolder"></actionsheet>
    <toast v-model="showToast" type="text" :time="500" is-show-mask :text="this.toastText" :position="showPosition"></toast>
  </div>
</template>

<script>
import { Actionsheet,Toast } from 'vux'
export default {
  name: 'inbox',
  components:{
    Actionsheet,
    Toast
  },
  computed:{
    placeholderName(){
      return '回复'+this.infofrom.name+':'
    }
  },
  mounted(){
    this.getMailInfo()
  },
  data:function(){
    return {
      isShowDetail:false,
      showaction:false,
      showToast:false,
      replyInfo:'',
      showPosition:'middle',
      toastText:'',
      menus1: {
        menu1: '回复',
        menu2: '转发',
        menu3:'删除',
        menu4:'标为未读',
        menu5:'移动到...'
      },
      MailInfo:"",
      infosubject:'',
      infofrom:'',
      infosendtime:'',
      infoto:'',
      infocc:'',
      mailBody:'',
      folders:{},
      showfolder:false
    }
  },
  methods:{
    sfolder:function(e,key){
      var that = this 
      var folderid = that.$route.query.folderid
      var msgid = that.$route.query.msgid
      var ftd = e;
      var url = "http://127.0.0.1:2800/msg_move" 
      let data = {
        folder_id_target:ftd,
        msg:{
          folder_id:folderid,
          msg_id:msgid,
        }
      }
      that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
        if(res.body=='success'){
          that.toastText = '移动邮件成功'
          that.showToast = true
        }
      })    
    },
    showDetail:function(){
      this.isShowDetail = true
    },
    closeDetail:function(){
      this.isShowDetail = false
    },
    back(){
      window.history.back();
    },
    moreAction:function(){
      this.showaction = true;
    },
    relayMail:function(){
        let folderid = this.$route.query.folderid;
        let msgid = this.$route.query.msgid;
        let opr = 'reply_all';
        let umuban = {
          username:this.MailInfo.msg.from.name,
          email:this.MailInfo.msg.from.email,
          sjCheck:false,
          ccCheck:false,
          bccCheck:false
        }
        let tonames = JSON.stringify(umuban)
        localStorage.setItem('newtoNames',tonames)
        this.$router.push("write?oldmail=true&folderid="+folderid+"&msgid="+msgid+"&opr="+opr)
    },
    delMail:function(){
      var that = this
      var folderid = that.$route.query.folderid
      var msgid = that.$route.query.msgid
      var foldername = this.$route.query.foldername
      var url = 'http://127.0.0.1:2800/msg_delete_actual'
        let data = {
          msg:{
            folder_id:folderid,
            msg_id:msgid,
          }
        }
        that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
          if(res.body=='success'){
              that.toastText = '删除邮件成功'
              that.showToast = true
              setTimeout(function(){
                that.$router.push("/maillist?category=folder&folderid="+folderid+"&page=1&perpage=10&sort=time_desc&foldername="+foldername)
              },500)
          }
        })
    },
    operate:function(key){
      var that = this
      var folderid = that.$route.query.folderid
      var msgid = that.$route.query.msgid
      if(key=='menu1'){
        let umuban = {
          username:this.MailInfo.msg.from.name,
          email:this.MailInfo.msg.from.email,
          sjCheck:false,
          ccCheck:false,
          bccCheck:false
        }
        let tonames = JSON.stringify(umuban)
        localStorage.setItem('newtoNames',tonames)
        let opr = 'reply_all';
         this.$router.push("write?oldmail=true&folderid="+folderid+"&msgid="+msgid+"&opr="+opr)
      }else if(key=='menu2'){
        let umuban = {
          username:this.MailInfo.msg.from.name,
          email:this.MailInfo.msg.from.email,
          sjCheck:false,
          ccCheck:false,
          bccCheck:false
        }
        let tonames = JSON.stringify(umuban)
        localStorage.setItem('newtoNames',tonames)
        let opr = 'forward_attach';
        this.$router.push("write?oldmail=true&folderid="+folderid+"&msgid="+msgid+"&opr="+opr)
      }else if(key=='menu3'){
        let foldername = this.$route.query.foldername
        let url = 'http://127.0.0.1:2800/msg_delete_actual'
        let data = {
          msg:{
            folder_id:folderid,
            msg_id:msgid,
          }
        }
        that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
          if(res.body=='success'){
              that.toastText = '删除邮件成功'
              that.showToast = true
              setTimeout(function(){
                  that.$router.push("/maillist?category=folder&folderid="+folderid+"&page=1&perpage=10&sort=time_desc&foldername="+foldername)
              },500)
          }
        })
      }else if(key=='menu4'){
        let url = 'http://127.0.0.1:2800/set_read'
        let data = {
          msg:{
            folder_id:folderid,
            msg_id:msgid,
          },
          read:false
        }
        that.$http.post(url,data,{emulateJSON:true}).then((res)=>{
          if(res.body=='success'){
              that.toastText = '设置未读成功'
              that.showToast = true
          }
        })
      }else{
        this.showfolder = true
      }
    },
    getMailInfo:function(){
      let that = this
      let category = this.$route.query.category
      let folderid = this.$route.query.folderid;
      let msgid = this.$route.query.msgid;
      let data = {
        folderid:folderid,
        msgid:msgid,
        category:category
      }
      this.$http.post('http://127.0.0.1:2800/getmailinfo',data,{emulateJSON:true}).then((res)=>{
        that.MailInfo = res.body
        that.infosubject = res.body.msg.subject;
        that.infofrom = res.body.msg.from;
        that.infosendtime = res.body.msg.date_sent;
        that.infoto = res.body.msg.to;
        that.infocc = res.body.msg.cc;
        that.mailBody = res.body.html.body
      })

      this.$http.post('http://127.0.0.1:2800/getfolders',{},{emulateJSON:true}).then((res)=>{
        res.body.forEach((item,index)=>{
         that.folders[item.id] = item.name
        })
      })
    },
    reply:function(){
      console.log(this.replyInfo)
    }
  }
}
</script>

<style scoped>
.headinfo{
  width:100%;
  height: 50px;
  border-bottom:1px solid #dadada;
}
.header{
    background-color: #fafafa;
    height: 40px;
    width:100%;
    border-bottom:1px solid #dadada;
    float:left;  
}
.backbtn{
  width:30px;
  height:30px;
  float:left;
  margin-top:15px;
}
.shanchubtn{
  width:26px;
  height:26px;
  float:right;
  margin-top:17px;
  margin-right:20px;
}
.relaybtn{
  width:26px;
  height:26px;
  float:right;
  margin-top:17px;
  margin-right:20px;
}
.slhbtn{
  width:30px;
  height:30px;
  float:right;
  margin-top:15px;
  margin-right:20px;
}
.header>img{
   
    height: 25px;
}
.headmethods{
  width:100%;
  height: 60px;
  float:left;
  border-bottom:1px solid #dadada;
  padding:0 10px;
  box-sizing:border-box;
}
.detail{
    height:auto;
    width:100%;
    float:left;
    padding:0 15px;
    box-sizing:border-box;
    background-color: white;
}
.title{
    margin-top:10px;
    color:#000;
    font-size:16px;
    float:left;
    width:100%;
    font-weight:600;
}
.sendpeople{
    color:#0089ce;
    font-weight:600;
    float:left;
    margin-top:10px;
    font-size:14px;
}
.simple{
    width:100%;
    height:auto;

}
.nosimple{
    width:100%;
    height:auto;
}
.sendtordiv{
    width:100%;
    float:left;
    margin-top:10px;
}
.note{
    float:left;
    width:20%;
    height:20px;
    line-height:20px;
    font-size:14px;
}
.sendtordiv{
    float:left;
    width:100%;
    position:relative;
}
.getdiv{
    float:left;
    width:100%;
}
.timediv{
    float:left;
    width:100%;
}
.ccdiv{
    float:left;
    width:100%;
}
.info{
    float:left;
    width:72%;
    word-break:break-all;
}
.name{
    float:left;
    width:auto;
    font-size:14px;
}
.address{
    float:left;
    width:auto;
    color:#a0a8c0;
    font-size:12px;
    margin-top:2px;
    
}
.time{
    color:#a0a8c0;
    float:right;
    font-size:12px;
    margin-top:12px;
    margin-right: 5px;
}
.d_time{
    color:#a0a8c0;
    float:left;
    font-size:12px;
    margin-top:2px;
}
.fordetail{
    color:#0089ce;
    float:right;
    margin-top:10px;
    font-size:14px;
    cursor:pointer;
}
.forsimple{
    color:#0089ce;
    font-size:14px;
    cursor:pointer;
    position:absolute;
    right:0px;
    top:0px;
}
.theme{
    box-sizing:border-box;
    padding:0 15px;
    border-bottom:1px solid #dadada;
    float:left;
    width:100%;
}
.textdiv{
    background-color: #f2f2f2;
    height:180px;
    width:100%;
    box-sizing:border-box;
    padding:0 15px;
    float:left;
    margin-top:50px;
}
.content{
    resize:none;
    width:100%;
    height:60px;
    margin-top:50px;
    float:left;
    border-radius:7px;
    outline:none;
    padding:15px 15px;
    box-sizing:border-box;
    font-size:14px;
} 
.reply{
    background-color: #0089ce;
    border-radius:7px;
    width:50px;
    height: 30px;
    color:white;
    line-height:30px;
    border:1px solid #0089ce;
    float:right;
    margin-top:15px;
    margin-right: 10px;
    font-size:12px;
    text-align:center;
    cursor:pointer;
    outline:none;
}
.footfont{
    text-align:center;
    color:#a0a8c0;
    float:left;
    width:100%;
    font-size:12px;
    margin-top:20px;
}
.logo{
    margin-top:5px;
}
.hide{
  display:none;
}
.blank{
  width:100%;
  float:left;
  height: 100px;
}
</style>