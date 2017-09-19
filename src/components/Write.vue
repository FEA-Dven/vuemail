<template>
  <div>
    <div class="writehead">
      <button class="defaultbtn" @click="back">返回</button>
      <button class="defaultbtn savebtn" @click="saveMail">保存</button>
      <button class="defaultbtn sendbtn" @click="sendMail">发送</button>
    </div>
    <div class="theme">
      <div class="themeItem sj">
        <div class="themeItemleft">
          收件人:
        </div>
        <div class="themeItemmid" @click="changeSjFocus">
          <div v-for="(item,index) in sjArr">
            <span class="mailname" :class="{'itemCheck':item.sjCheck}"  @click="userMethods(index,'sj')">{{item.username}}</span>
          </div>
          <input type="text" class="putUserInput" v-focus="sjFocus" v-model="sjUserInput" @keyup="putsjArr">
        </div>
        <div class="themeItemright">
          <img :src="[sjImg ? require('../assets/b_reduce.png') : require('../assets/b_add.png')]" class="adduserbtn" alt="" @click="changeSjImg">
        </div>
      </div>
      <div class="themeItem sj" v-if="hasSjUsercheck">
        <div class="usercheck">
            <span class="checkUsername">{{sjcuname}}</span>
            <span class="checkEmail">{{sjcuemail}}</span>
        </div>
        <button class="writeBtn" @click="cancelCheck('sj')">取消</button>
        <button class="writeBtn" :data-value="sjcuemail" @click="delcu($event,'sj')">删除</button>
      </div>

      <div class="cellcontainer" v-if="sjImg">
          <div v-for="(item,index) in List[0].user">
            <div class="sub-item" @click="sjarradd(index)" >{{item.username+'<'+item.email+'>'}}</div>
          </div>
        </div>
      <div class="themeItem cc">
        <div class="themeItemleft">
          抄送:
        </div>
        <div class="themeItemmid" @click="changeCcFocus">
          <div v-for="(item,index) in ccArr">
            <span class="mailname" :class="{'itemCheck':item.ccCheck}"  @click="userMethods(index,'cc')">{{item.username}}</span>
          </div>
          <input type="text" class="putUserInput" v-focus="ccFocus" v-model="ccUserInput" @keyup="putccArr">
        </div>
        <div class="themeItemright">
          <img :src="[ccImg ? require('../assets/b_reduce.png') : require('../assets/b_add.png')]" class="adduserbtn" alt="" @click="changeCcImg">
        </div>
      </div>
      <div class="themeItem cc" v-if="hasCcUsercheck">
        <div class="usercheck">
            <span class="checkUsername">{{cccuname}}</span>
            <span class="checkEmail">{{cccuemail}}</span>
        </div>
        <button class="writeBtn" @click="cancelCheck('cc')">取消</button>
        <button class="writeBtn" :data-value="cccuemail" @click="delcu($event,'cc')">删除</button>
      </div>
        <div class="cellcontainer" v-if="ccImg">
          <div v-for="(item,index) in List[0].user">
            <div class="sub-item" @click="ccarradd(index)" >{{item.username+'<'+item.email+'>'}}</div>
          </div>
        </div>
      <div class="themeItem bcc">
        <div class="themeItemleft">
          密送:
        </div>
        <div class="themeItemmid" @click="changeBccFocus">
          <div v-for="(item,index) in bccArr">
            <span class="mailname" :class="{'itemCheck':item.bccCheck}" @click="userMethods(index,'bcc')">{{item.username}}</span>
          </div>
          <input type="text" class="putUserInput" v-focus="bccFocus" v-model="bccUserInput" @keyup="putbccArr">
        </div>
        <div class="themeItemright">
          <img :src="[bccImg ? require('../assets/b_reduce.png') : require('../assets/b_add.png')]" class="adduserbtn" alt="" @click="changeBccImg">
        </div>
      </div>
      <div class="themeItem bcc" v-if="hasBccUsercheck">
        <div class="usercheck">
            <span class="checkUsername">{{bcccuname}}</span>
            <span class="checkEmail">{{bcccuemail}}</span>
        </div>
        <button class="writeBtn" @click="cancelCheck('bcc')">取消</button>
        <button class="writeBtn" :data-value="bcccuemail" @click="delcu($event,'bcc')">删除</button>
      </div>
        <div class="cellcontainer" v-if="bccImg">
           <div v-for="(item,index) in List[0].user">
            <div class="sub-item" @click="bccarradd(index)" >{{item.username+'<'+item.email+'>'}}</div>
          </div>
        </div>

      <div class="themeItem">
        <div class="themeItemleft">
          主题:
        </div>
        <input type="text" class="subject" @click="clearFocus" v-model="subject">
      </div>
      <textarea @click="clearFocus" class="textTheme" v-model="textTheme" placeholder="请输入邮件内容..."></textarea>
      
    </div>
      <div class="footer">
      <div class="oldmaildiv" v-if="hasOldMail"><span class="norfont">原邮件已自动附带</span><span class="editbtn" @click="edit">编辑</span></div>
      <uploader :options="options" class="uploader-example">
        <uploader-drop>
        <div class="uploader-btn-div">
          <uploader-btn>上传文件</uploader-btn>
        </div>
          <span class="zhushi">可将文件拖拽此处上传，每个文件不超过5M</span>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
      </div>
      <div class="blank"></div>
  </div>
</template>

<script>
import { Group, Cell,CellBox  } from 'vux'
import moment from 'moment'
export default {
  components: {
    Group,
    Cell,
    CellBox,
  },
  data () {
    return {
      hasOldMail:false,
      hasSjUsercheck:false,
      hasCcUsercheck:false,
      hasBccUsercheck:false,
      sjcuname:'',
      sjcuemail:'',
      cccuname:'',
      cccuemail:'',
      bcccuname:'',
      bcccuemail:'',
      filetitle:'文件上传',
      sjImg:false,
      ccImg:false,
      bccImg:false,
      sjqc:true,
      ccqc:true,
      bccqc:true,
      sjArr:[],
      ccArr:[],
      bccArr:[],
      subject:'',
      textTheme:'',
      file:'',
      sjUserInput:'',
      ccUserInput:'',
      bccUserInput:'',
      sjFocus:false,
      ccFocus:false,
      bccFocus:false,
      options: {
          target: 'http://127.0.0.1:2800/upload',
          testChunks: false
        },
        attrs: {
          accept: 'image/*'
        },
      MailInitInfo:"",
      UserList:""
    }
  },
  directives:{
    focus: {
        update:function(el,binding) {
          if(binding.value){
            el.focus()
          }
        }
    }
  },
  mounted(){
    this.getInitDraft()
    this.getUserList()
  },
  computed:{
    List(){
      var that = this
      var arr = [];
      var farr = [].concat(that.UserList.persons.fields);
      var garr = [].concat(that.UserList.groups);
      var allmuban={
        name:'所有成员',
        check:true,
        user:[]
      }
      farr.forEach((item,index)=>{
        var allusermuban={
          username:item[0],
          email:item[1],
          sjCheck:false,
          ccCheck:false,
          bccCheck:false
        }
        allmuban.user.push(allusermuban)
      })
      arr.unshift(allmuban)
      return arr
    }
  },
  methods:{
    sjarradd:function(value){
      this.sjFocus = false;
      this.ccFocus = false;
      this.bccFocus = false;
      this.sjqc = true
      var sy = value;
      var sjqcname = this.List[0].user[sy].username
      for(var i=0;i<this.sjArr.length;i++){
        if(sjqcname==this.sjArr[i].username){
          this.sjqc = false
         
        }
      }
      if(this.sjqc){
        this.sjArr.push(this.List[0].user[sy])
        this.sjImg = false
        this.sjFocus = true;
        this.ccFocus = false;
        this.bccFocus = false;
      }else{
        this.sjImg = false
      }
    },
    ccarradd:function(value){
      this.sjFocus = false;
      this.ccFocus = false;
      this.bccFocus = false;
     this.ccqc = true
      var sy = value;
      var ccqcname = this.List[0].user[sy].username
      for(var i=0;i<this.ccArr.length;i++){
        if(ccqcname==this.ccArr[i].username){
          this.ccqc = false
          
        }
      }
      if(this.ccqc){
        this.ccArr.push(this.List[0].user[sy])
        this.ccImg = false
        this.sjFocus = false;
         this.ccFocus = true;
         this.bccFocus = false
      }else{
        this.ccImg = false
      }
    },
    bccarradd:function(value){
      this.sjFocus = false;
      this.ccFocus = false;
      this.bccFocus = false;
     this.bccqc = true
      var sy = value;
      var bccqcname = this.List[0].user[sy].username
      for(var i=0;i<this.bccArr.length;i++){
        if(bccqcname==this.bccArr[i].username){
          this.bccqc = false
        }
      }
      if(this.bccqc){
        this.bccArr.push(this.List[0].user[sy])
        this.sjFocus = false;
        this.ccFocus = false;
        this.bccFocus = true;
        this.bccImg = false
      }else{
        this.bccImg = false
      }
    },
    changeSjImg:function(){
      this.sjImg = !this.sjImg;
    },
    changeCcImg:function(){
      this.ccImg = !this.ccImg;
    },
    changeBccImg:function(){
      this.bccImg = !this.bccImg;
    },
    back:function(){
      localStorage.removeItem('toNames');
      localStorage.removeItem('newtoNames');
      window.history.back();
    },
    clearFocus:function(){
      this.sjFocus = false;
      this.ccFocus = false;
      this.bccFocus  =false
    },
    putsjArr:function(){
      if(String(this.sjUserInput).indexOf(';')>0){
        var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        if(patt.test(this.sjUserInput.substr(0,this.sjUserInput.length-1))){
          this.judgeArr(this.sjArr,this.sjUserInput.substr(0,this.sjUserInput.length-1),'sj')
        }else{
          alert(this.sjUserInput.substr(0,this.sjUserInput.length-1)+'格式错误或不存在')
          this.sjUserInput = this.sjUserInput.substr(0,this.sjUserInput.length-1)
        }
      }
    },
    putccArr:function(){
      if(String(this.ccUserInput).indexOf(';')>0){
        var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        if(patt.test(this.ccUserInput.substr(0,this.ccUserInput.length-1))){
          this.judgeArr(this.ccArr,this.ccUserInput.substr(0,this.ccUserInput.length-1),'cc')
        }else{
          alert(this.ccUserInput.substr(0,this.ccUserInput.length-1)+'格式错误或不存在')
          this.ccUserInput = this.ccUserInput.substr(0,this.ccUserInput.length-1)
        }
      }
    },
    putbccArr:function(){
      if(String(this.bccUserInput).indexOf(';')>0){
        var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
        if(patt.test(this.bccUserInput.substr(0,this.bccUserInput.length-1))){
          this.judgeArr(this.bccArr,this.bccUserInput.substr(0,this.bccUserInput.length-1),'bcc')
        }else{
          alert(this.bccUserInput.substr(0,this.bccUserInput.length-1)+'格式错误或不存在')
          this.bccUserInput = this.bccUserInput.substr(0,this.bccUserInput.length-1)
        }
      }
    },
    getInitDraft:function(){
      var that = this
      var folderId = this.$route.query.folderid || ''
      var msgId = this.$route.query.msgid || ''
      var opr = this.$route.query.opr || ''
      var isoldmail = this.$route.query.oldmail || ''
      if(isoldmail=='true'){
        that.hasOldMail = true
      }
      var data = {
        folder_id:folderId,
        msg_id:msgId,
        opr:opr
      }
      if(opr=="reply_all"){
        this.subject = "回复:"+this.MailInitInfo.subject
      }else if(opr=="forward_attach"){
        this.subject = "转发 : "+this.MailInitInfo.subject
      }
      this.$http.post('http://127.0.0.1:2800/initmail',data,{emulateJSON:true}).then(function (res) {
         that.MailInitInfo = res.body
         localStorage.setItem('composeId',res.body.compose_id)
         if(opr=="reply_all"){
            that.subject = "回复:"+that.MailInitInfo.subject
          }else if(opr=="forward_attach"){
            that.subject = "转发 : "+that.MailInitInfo.subject
          }
       })
    },
    getUserList:function(){
      var that = this
      let data = {

      }
      this.$http.post('http://127.0.0.1:2800/getuserlist',data,{emulateJSON:true}).then(function (res) {
         that.UserList = res.body

         var arr = localStorage.getItem('toNames') || '';
          var newarr = localStorage.getItem('newtoNames') || '';
          if(arr!==''){
            var nameArr = JSON.parse(arr); 
            this.List[0].user.forEach((item)=>{
              for(var i=0;i<nameArr.length;i++){
                if(nameArr[i]==item.email){
                  that.sjArr.push(item)
                }
              }
            })
          }
          if(newarr!==''){
            var newnameArr = JSON.parse(newarr); 
            that.sjArr.push(newnameArr);
          }
       })
    },
    changeSjFocus:function(){
      if(this.sjFocus==true){
        this.sjFocus = false;
        this.sjFocus = true;
      }else{
        this.sjFocus = true;
        this.bccFocus = false;
        this.ccFocus = false
      }
    },
    changeCcFocus:function(){
      if(this.ccFocus==true){
        this.ccFocus = false;
        this.ccFocus = true;
      }else{
        this.sjFocus = false;
        this.bccFocus = false;
        this.ccFocus = true
      }
    },
    changeBccFocus:function(){
      if(this.bccFocus==true){
        this.bccFocus = false;
        this.bccFocus = true;
      }else{
        this.sjFocus = false;
        this.bccFocus = true;
        this.ccFocus = false
      }
    },
    judgeArr:function(arr,value,key){
      var that = this;
      var state = true;
      var isHas = false;
      that.sjFocus = false;
      that.ccFocus = false;
      that.bccFocus = false;
      if(arr.length!==0){
        arr.forEach((item)=>{
          if(value==item.email){
            isHas = true
          }
        })
      }
      if(isHas==false){
        that.List[0].user.forEach((item)=>{
        if(value==item.email){
          arr.push(item);
          state = false
        }
        })
        if(state){
          var umuban = {
            username:value,
            email:value,
            sjCheck:false,
            ccCheck:false,
            bccCheck:false
          }
          arr.push(umuban)
        }
        if(key=='sj'){
          that.sjUserInput='';
          that.sjFocus = true;
        }else if(key=='cc'){
          that.ccUserInput='';
          that.ccFocus = true;
        }else{
          that.bccUserInput='';
          that.bccFocus = true;
        }
      }else{
        if(key=='sj'){
          that.sjUserInput='';
          that.sjFocus = true;
        }else if(key=='cc'){
          that.ccUserInput='';
          that.ccFocus = true;
        }else{
          that.bccUserInput='';
          that.bccFocus = true;
        }
      }     
    },
    userMethods:function(index,key){
      var that = this;
      var sy = index;
      if(key=='sj'){
        that.hasSjUsercheck = true
        that.sjArr.forEach((item,index)=>{
          item.sjCheck = false;
          if(sy==index){
            item.sjCheck = true;
            that.sjcuname = item.username;
            that.sjcuemail  =item.email
          }
        })
      }else if(key=='cc'){
        that.hasCcUsercheck = true
        that.ccArr.forEach((item,index)=>{
          item.ccCheck = false;
          if(sy==index){
            item.ccCheck = true;
            that.cccuname = item.username;
            that.cccuemail  =item.email
          }
        })
      }else if(key=='bcc'){
        that.hasBccUsercheck = true
        that.bccArr.forEach((item,index)=>{
          item.bccCheck = false;
          if(sy==index){
            item.bccCheck = true;
            that.bcccuname = item.username;
            that.bcccuemail  =item.email
          }
        })
      }
    },
    sendMail:function(){
      var that = this;
      var patt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
      var yanzheng = true
      if(that.sjUserInput!==''){
        if(patt.test(that.sjUserInput)){
          this.judgeArr(this.sjArr,this.sjUserInput,'sj')
        }else{
          alert(this.sjUserInput+'格式错误或不存在')
          yanzheng = false
        }
      }
      if(that.ccUserInput!==''){
        if(patt.test(that.ccUserInput)){
          this.judgeArr(this.ccArr,this.ccUserInput,'cc')
        }else{
          alert(this.ccUserInput+'格式错误或不存在')
          yanzheng = false
        }
      }
      if(that.bccUserInput!==''){
        if(patt.test(that.bccUserInput)){
          this.judgeArr(this.bccArr,this.bccUserInput,'bcc')
        }else{
          alert(this.bccUserInput+'格式错误或不存在')
          yanzheng = false
        }
      }
      if(that.sjArr==''){
        alert('收件人不能为空')
      }else if(yanzheng===false){
        alert('格式错误发送失败')
      }else if(that.subject==''){
        alert('主题不能为空')
      }else{
        alert('发送成功')
      }
    },
    delcu:function(e,key){
      var that = this;
      var value = e.target.dataset.value
      if(key=='sj'){
        that.sjArr.forEach((item,index)=>{
          if(value==item.email){
            item.sjCheck = false;
            that.sjArr.splice(index,1);
            that.sjcuname = '';
            that.sjcuemail = '';
            that.hasSjUsercheck = false
          }
        })
      }else if(key=='cc'){
        that.ccArr.forEach((item,index)=>{
          if(value==item.email){
            item.ccCheck = false;
            that.ccArr.splice(index,1);
            that.cccuname = '';
            that.cccuemail = '';
            that.hasCcUsercheck = false
          }
        })
      }else if(key=='bcc'){
        that.bccArr.forEach((item,index)=>{
          if(value==item.email){
            item.bccCheck = false;
            that.bccArr.splice(index,1);
            that.bcccuname = '';
            that.bcccuemail = '';
            that.hasBccUsercheck = false
          }
        })
      }
    },
    cancelCheck:function(key){
      var that = this
      if(key=='sj'){
        that.hasSjUsercheck=false 
        that.sjArr.forEach((item)=>{
          item.sjCheck = false
        })
      }else if(key=='cc'){
        that.hasCcUsercheck=false
        that.ccArr.forEach((item)=>{
          item.ccCheck = false
        })
      }else if(key=='bcc'){
        that.hasBccUsercheck=false
        that.bccArr.forEach((item)=>{
          item.bccCheck = false
        })
      }
    },
    edit:function(){
      var that = this
      if(confirm("编辑会导致原邮件文字格式丢失，是否继续编辑")){
        that.hasOldMail = false
        let infohead = "---原始邮件--- \n"
        let sendtor = "发件人:"+"\""+that.MailInitInfo.from+"\""+"<"+that.MailInitInfo.from+">\n"
        let daytime = moment(that.MailInitInfo.schedule).format('d')
        let moontime = moment(that.MailInitInfo.schedule).format('M')
        let mntime = moment(that.MailInitInfo.schedule).format('a')
        if(mntime=="am"){
          mntime = '早上'
        }else{
          mntime = '下午'
        }
        if(daytime==0){
          daytime='星期日'
        }else if(daytime==1){
          daytime='星期一'
        }else if(daytime==2){
          daytime='星期二'
        }else if(daytime==3){
          daytime='星期三'
        }else if(daytime==4){
          daytime='星期四'
        }else if(daytime==5){
          daytime='星期五'
        }else if(daytime==6){
          daytime='星期六'
        }
        if(moontime==1){
          moontime='1'
        }else if(moontime==2){
          moontime='2'
        }else if(moontime==3){
          moontime='3'
        }else if(moontime==4){
          moontime='4'
        }else if(moontime==5){
          moontime='5'
        }else if(moontime==6){
          moontime='6'
        }else if(moontime==7){
          moontime='7'
        }else if(moontime==8){
          moontime='8'
        }else if(moontime==9){
          moontime='9'
        }else if(moontime==10){
          moontime='10'
        }else if(moontime==11){
          moontime='11'
        }else if(moontime==12){
          moontime='12'
        }
        let stime = moment(that.MailInitInfo.schedule).format("YYYY年"+moontime+"月"+'D日'+" "+daytime+" "+mntime+"h:mm")
        let sendtime = "发送时间:"+stime+'\n'
        let recipients = "收件人:";
        that.MailInitInfo.to.forEach((item)=>{
          recipients += "\""+item.name+"\""+"<"+item.email+">"+";"
        })
        recipients += '\n'
        let subject = "主题:"+that.MailInitInfo.subject+'\n'+'\n'
        let text = that.MailInitInfo.text.body;
        let str = '\n \n \n \n \n'+infohead+sendtor+sendtime+recipients+subject+text
        that.textTheme = str
      }
    },
    saveMail:function(){
      let that = this
      let savebcc = []
      that.bccArr.forEach((item)=>{
        let savebccmb = {
          email:'',
          name:''
        }
        savebccmb.email = item.email;
        savebccmb.name = item.username;
        savebcc.push(savebccmb)
      })
      
      let savecc = []
      that.ccArr.forEach((item)=>{
        let saveccmb = {
          email:'',
          name:''
        }
        saveccmb.email = item.email;
        saveccmb.name = item.username;
        savecc.push(saveccmb)
      })
      let savesj = []
      that.sjArr.forEach((item)=>{
        let savesjmb = {
          email:'',
          name:''
        }
        savesjmb.email = item.email;
        savesjmb.name = item.username;
        savesj.push(savesjmb)
      })
      let from = {
        email:localStorage.getItem('username'),
        name:localStorage.getItem('username')
      }
      let composeId = localStorage.getItem('composeId')
      let saveData = {
        bcc:savebcc,
        body:that.textTheme,
        cc:savecc,
        compose_id:composeId,
        from:from,
        html:false,
        priority:0,
        receipt:true,
        schedule:'10',
        subject:that.subject,
        to:savesj
      }
      console.log(saveData)
    }
  },



}
</script>

<style>
::-webkit-input-placeholder{
  font-size:14px;
}
.writehead{
  background-color:#fafafa;
  width:100%;
  float:left;
  height: 40px;
  padding:0 10px;
  box-sizing:border-box;
}
.savebtn{
  background-color: #1aad19;
  color:white;
  border-color:#1aad19;
}
.sendbtn{
  background-color: #0089ce;
  color:white;
  border-color:#0089ce;
  float:right;
  margin-right:5px;
}
.theme{
  width:100%;
  height:auto;
  float:left;
  padding:0 15px;
  padding-bottom:20px;
  box-sizing:border-box;
  border-top:1px solid #dadada;
  border-bottom:1px solid #dadada;
  background-color: white;
}
.themeItem{
  width:100%;
  height:auto;
  float:left;
  border-bottom:1px solid #dadada;
  padding:0 5px;
  box-sizing:border-box;
}
.themeItemleft{
  width:15%;
  height:50px;
  float:left;
  font-size:14px;
  line-height:50px;
}
.usercheck{
  width:200px;
  height:50px;
  float:left;
}
.checkUsername{
  width:100%;
  float:left;
  height: 20px;
  line-height:20px;
  margin-top:5px;
  font-size:14px;
}
.checkEmail{
  width:100%;
  float:left;
  height: 20px;
  line-height:20px;
  font-size:12px;
  color:#999;
}
.writeBtn{
  width:50px;
  height: 30px;
  background-color: #f9f9f9;
  color:black;
  line-height:30px;
  float:right;
  margin-top:10px;
  border:1px solid #d5d5d5;
  border-radius:6px;
  padding:0 10px;
  margin-left:10px;
  outline:none;
}
.themeItemmid{
  width:75%;
  height:auto;
  float:left;
  padding:0 15px;
  box-sizing:border-box;
  padding-bottom:10px;
}
.themeItemright{
  width:10%;
  height:50px;
  float:right;
}
.adduserbtn{
  float:right;
  width:24px;
  height: 24px;
  margin-top:13px;
  margin-right: 5px;
}
.cellcontainer{
  width:100%;
  background-color: white;
  float:left;
}
.sub-item{
  background-color: #f2f2f2;
  width:100%;
  float:left;
  padding:0 15px;
  box-sizing:border-box;
  border-bottom:1px solid #dadada;
  height: 30px;
  line-height:30px;
  font-size:14px;
}
.subject{
  height: 50px;
  border:none;
  padding:0 15px;
  outline:none;
  width:75%;
}
.textTheme{
  width:100%;
  height: 300px;
  float:left;
  margin-top:15px;
  resize:none;
  border:none;
  outline:none;
  font-size:16px;
}
.mailname{
  width:auto;
  height: 20px;
  line-height:20px;
  float:left;
  margin-left:6px;
  margin-right:6px;
  color:white;
  border-radius:8px;
  border:1px solid #0089ce;
  outline:none;
  background-color: #0089ce;
  font-size:12px;
  padding:0 10px;
  margin-top:15px;
}
.itemCheck{
  background-color: white;
  color:#0089ce;
  border:1px solid #0089ce;
}
.footer{
  width:100%;
  height: auto;
  background-color:#f2f2f2 ;
  float:left;
  border-bottom:1px solid #dadada;
}
.blank{
  float:left;
  width:100%;
  height: 100px;
}
.oldmaildiv{
  width:100%;
  float:left;
  height: 40px;
  background-color:#f2f2f2;
  line-height:40px;
  color:black;
  text-indent:15px;
  font-size:14px;
}
.norfont{
  float:left;
  width:auto;
  color:black;
  margin-top:0;
  height: 40px;
}
.editbtn{
  float:left;
  width:auto;
  margin-left:5px;
  color:#0089ce;
  margin-top:0;
  height: 40px;
}
.uploader-example {
    width: 100%;
    padding: 15px;
    font-size: 12px;
    box-shadow: 0 0px 10px rgba(0, 0, 0, .4);
    float:left;
    box-sizing:border-box;
}
.uploader-btn-div{
  width:25%;
  float:left;
}
.uploader-example .uploader-btn {
  margin-right: 4px;
  background-color: #0089ce;
  border-color:#0089ce;
  color:white;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
.uploader-file-icon{
  display:none !important;
}
.uploader-btn:hover{
  background-color: #0089ce !important;
}
.uploader-file-status{
  width:25% !important;
  text-indent: 10px !important;
}
.uploader-file-actions{
  width:15% !important;
}
.uploader-file-meta{
  width:1% !important;
} 

.zhushi{
  color:#000;
  width:75%;
  margin-top:5px;
  float:left;
  text-align:left;
}
.putUserInput{
  width:40%;
  height: 30px;
  float:left;
  outline:none;
  border:none;
  margin-top:10px;
}
</style>
