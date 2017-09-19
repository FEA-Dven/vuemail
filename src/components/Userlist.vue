<template>
  <div class="box">
     <div class="header">
      <img class="inboxlogo" src="../assets/mylogo.png"  alt="" >
      <div class="searchdiv">
        <img src="../assets/search.png" class="searchpic" alt="" @click="findUser" >
        <input type="text" class="searchInput" id="searchInput" v-model="findInput">
      </div>
    </div>
    <div class="grouptitle">群组:</div>
    <group>
     <div v-for="(item,index) in mylist" class="listdiv">
     <div @click="groupCheck(index)">
      <cell :title="item.name" :key="item.index" >
        <div class="badge-value" slot="value">
          <img :src="[item.check ? require('../assets/h_down.png') : require('../assets/h_right.png')]" class="groupImg">
          <badge :text="item.user.length"></badge>
        </div>
      </cell>
      </div>
      </div>
    </group>
    <div class="grouptitle">{{grouptitle}}:</div>
    <div class="checkerdiv">
    <checker v-model="demo1" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <div v-for="(item, index) in showUserInfo">
        <div class="userlist" :class="{'s_userlist':item.check}">
          <div class="kgdiv">
          <checker-item :value="item" :key="index" @on-item-click="changeCheck" :class="{'demo1-item-selected':item.check}">   
          </checker-item>
          </div>
          <div class="usertheme">
            <div class="username">{{item.username}}</div>
            <div class="email">{{item.email}}</div>
          </div> 
        </div>
      </div>
      </checker>
      </div>
       <div class="footer">
        <span class="allSelect" :class="{'check':allselect}" @click="AllSelect"></span>
        <span class="s_length" :class="{'hide':existUser}">已选中{{UserLength}}人</span>
        <img src="../assets/h_close.png" class="closebtn" @click="clear" :class="{'hide':!clearSelect}" alt="">
        <button class="defaultbtn" @click="writeLetter">写邮件</button>
      </div>
      <div></div>
      <div class="blank"></div>
  </div> 
</template>

<script>
import {  Badge, Group, Cell, Checker, CheckerItem,Actionsheet,Toast } from 'vux'
export default {
	components: {
	  Cell,
	  Badge,
	  Group,
	  Checker,
	  CheckerItem,
	  Actionsheet,
	  Toast
	},
	mounted(){
      this.getUser()
  	},
  	computed:{
  		UserLength:{
  			get(){
  				return this.demo1.length
  			},
  			set(){

  			}
  		},
  		existUser:{
  			get(){
  				if(this.demo1.length>0){
  					return false
  				}else{
  					return true
  				}
  			},
  			set(){

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
	    },
	    grouptitle:{
	    	get(){
	    		for(var i=0;i<this.mylist.length;i++){
	    			if(this.mylist[i].check){
	    				return this.mylist[i].name
	    			}
	    		}
	    	},
	    	set(){

	    	}
	    },
	    showUserInfo:{
	    	get(){
	    		for(var i=0;i<this.mylist.length;i++){
		    		if(this.mylist[i].check){
		    			return this.mylist[i].user
		    		}
	    		}
	    	},
	    	set(){

	    	}
	    	
	    	
	    }
  	},
	data () {
	  return {
	  	demo1:[],
	  	allselect:false,
	  	mylist:'',
	  	findInput:'',
	  	OnlyOnceFind:false,
	  }
	},
	methods: {
	  findUser(){
	  	var that = this
      console.log(that.mylist)
	  	var findArr = []
  		var fmuban = {
  			check:true,
  			name:'查找成员',
  			user:[],
  		}
	  	var username = that.findInput
	  	var farr = [].concat(that.mylist[0].user);
	  	farr.forEach((item)=>{
	  		if(username==item.username||username==item.email){
	  			var finduser = {
  					username:item.username,
            email:item.email,
  					check:false,
          }
				fmuban.user.push(finduser)
	  		}
	  	})
	  	that.demo1.splice(0,that.demo1.length)
    	that.allselect = false
	  	if(fmuban.user.length!==0){
	  		that.mylist.forEach((item)=>{
			 	item.check = false;
			 })
		  	if(that.OnlyOnceFind){
		  		that.mylist.splice(that.mylist.length-1,1)
		  		that.mylist.push(fmuban);
		  	}else{
		  		that.mylist.push(fmuban);
		  		that.OnlyOnceFind = true
		  	}
	  	}else{
	  		alert('您好,没有此用户')
	  	}
	  	
	  },
	  getUser(){
      var that = this
	  	let url = 'http://127.0.0.1:2800/getuserlist';
	  	let data = {
	  		
	  	}	
	  	this.$http.post('http://127.0.0.1:2800/getuserlist',data,{emulateJSON:true}).then(function (res) {
          var arr = [];
          var farr = [].concat(res.body.persons.fields);
          var garr = [].concat(res.body.groups);
          var unarr = [];
          var ungroup = [];
          var unfarr = [].concat(res.body.persons.fields);
          var ungarr = [].concat(res.body.groups);
          garr.forEach((item)=>{
            var gmuban = {
              name:'',
              check:false,
              user:[]
            }
            gmuban.name = item.name
            for(var i=0;i<farr.length;i++){
              for(var j=0;j<item.members.length;j++){
                if(farr[i][1]==item.members[j]){
                  var umuban = {
                    username:farr[i][0],
                    email:farr[i][1],
                    check:false
                  }
                  gmuban.user.push(umuban);
                  
                }
              }
            }
            arr.push(gmuban);
            
          })
          ungarr.forEach((item,index)=>{
            for(var i=0;i<item.members.length;i++){
              for(var j=0;j<unfarr.length;j++){
                if(unfarr[j][1]==item.members[i]){
                  unfarr.splice(j,1)
                }
              }
            }
          })
          var ungdata ={
            name:'未分组成员',
            user:[],
            check:false,
          }
          unfarr.forEach((item,index)=>{
            var data = {
              username:item[0],
              email:item[1],
              check:false
            }
            ungdata.user.push(data)         
          })
          
          arr.push(ungdata);
          var allmuban={
            name:'所有成员',
            check:true,
            user:[]
          }
          farr.forEach((item,index)=>{
            var allusermuban={
              username:item[0],
              email:item[1],
              check:false
            }
            allmuban.user.push(allusermuban)
          })
          arr.unshift(allmuban)
          this.mylist = arr
       })
	  },
	  changeCheck:function(e){
	  	e.check = !e.check;
	  	var that = this
	  	if(this.showUserInfo.length==1){
	  		this.showUserInfo.forEach((item)=>{
	  			if(item.check){
	  				this.allselect = true
	  			}else{
	  				this.allselect = false
	  			}
	  		})
	  	}else{
		  	if(that.demo1.length!==this.showUserInfo.length){
	       	  this.allselect = false
	      	}else{
	      	  this.allselect = true
	        }
	  	}
	  	
	  },
	  AllSelect:function(){
	  	var that = this;
	  	that.allselect = !that.allselect;
	  	that.showUserInfo.forEach((item)=>{
	  		if(that.allselect==true){
	  			if(item.check==false){
	  				that.demo1.push(item);
	  			}
	  			item.check = true
	  		}else{
	  			item.check = false;
	  			that.demo1.splice(0,that.demo1.length)
	  		}
	  		
	  	})
	  },
	  writeLetter:function(){
	  	if(this.demo1.length<1){
	  		alert('请选择成员')
	  	}else{
	  	var toName = [];
	  	var that = this;
	  	that.demo1.forEach((item)=>{
	  		toName.push(item.email)
	  	})
	  	var tonames = JSON.stringify(toName);
	  	localStorage.setItem('toNames',tonames)
      this.$router.push("/write")
	  	}
	  },
	  clear:function(){
	      var that = this;
	      that.clearSelect = true;
	      that.allselect = false;
	      that.demo1.splice(0,that.demo1.length);
	      that.showUserInfo.forEach((item)=>{
	        item.check = false
	      })
    	},
    	groupCheck:function(value){

    		var that = this;
    		var sy = value
    		that.mylist.forEach((item)=>{
    			item.check = false
    		})
    		that.mylist[sy].check = true
    		that.demo1.splice(0,that.demo1.length)
    		that.allselect = false
    		that.showUserInfo.forEach((item)=>{
    			item.check = false
    		})
    	}
	}
}
</script>

<style scoped>
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
.listdiv{
  border-bottom:1px solid #dadada;
}
.grouptitle{
	width:100%;
	height: 20px;
	line-height:30px;
	float:left;
	color:#999;
	font-size:14px;
	padding: 0 15px;
	box-sizing:border-box;
}
.checkerdiv{
	width:100%;
	margin-top:10px;
	float:left;
}
/* Maillist的css */
.kgdiv{
  width:10%;
  margin-left:2%;
  height:60px;
  float:left;
}
.demo1-item {
  border: 1px solid #ccc;
  width:16px;
  height: 16px;
  border-radius:50%;
  margin-top:9px;
  float:left;
}
.demo1-item-selected {
  border: 1px solid #0089ce;
  background-color: #0089ce;
}
.usertheme{
  float:left;
  height: 60px;
  width:85%;
  margin-left:1%;
}
.userlist{
  width:100%;
  height: 60px;
  float:left;
  border-bottom:1px solid #dadada;
  background-color: white;
}
.s_userlist{
  background-color: #ebf6ff;
}
.username{
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
  margin-top:4px;
}
.email{
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
.footer{
  height: 40px;
  width:100%;
  background-color: #f2f2f2;
  float:left;
  border-bottom:1px solid #dadada;
}
.allSelect{
  width:16px;
  height: 16px;
  margin-top:12px;
  margin-left: 10px;
  float:left;
  border-radius:50%;
  border:1px solid #ccc;
  background-color: white;
}
.s_length{
  width:auto;
  height: 16px;
  margin-top:12px;
  margin-left: 10px;
  float:left;
  color:#000;
  line-height:16px;
  font-size:12px;
}
.check{
  background-color: #0089ce;
  border:1px solid #0089ce;
}
.hide{
	display:none;
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
.closebtn{
  width:18px;
  height: 18px;
  float:left;
  margin-top:11px;
  margin-left: 5px;
}
.groupImg{
	float:right;
	width: 22px;
	height: 22px;
	margin-top:2px;
	margin-left: 10px;
}
.blank{
	width:100%;
	float:left;
	height:80px;
}

</style>