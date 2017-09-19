<template>
  <div>
    <div class="header">
      <img class="inboxlogo" src="../assets/mylogo.png"  alt="">
      
      <img @click="refresh" class="refresh" src="../assets/refresh.png" alt="">
    </div>
    <span class="welcomeuser">您好,{{username}}</span>
     <group >
     <div v-for="item in folders" class="listdiv" @click="getMailList">
      <cell :title="item.name" :key="item.id" :data-name="item.name" :data-id="item.id" is-link>
        <div class="badge-value" slot="value">
          <badge :text="item.data.count_unread"></badge>
        </div>
      </cell>
      </div>
    </group>
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
    // console.log(this.folders);  
  }, 
  mounted(){
    this.getFolders()
  },
  data () {
    return {
      username:localStorage.getItem('username'),
      folders:"",
    }
  },
  methods:{
   refresh:function(){
    let url = "http://127.0.0.1:2800/getfolders"
    this.$http.post(url,{},{emulateJSON:true}).then((res)=>{
        this.folders = res.body
    })
    // window.location.reload();
   },
   getMailList:function(e){
      this.$router.push("/maillist?category=folder&folderid="+e.currentTarget.firstChild.dataset.id+"&page=1&perpage=10&sort=time_desc&foldername="+e.currentTarget.firstChild.dataset.name)
   },
   getFolders:function(){
      var that = this
      let url = "http://127.0.0.1:2800/getfolders"
      this.$http.post(url,{},{emulateJSON:true}).then((res)=>{
        this.folders = res.body
      })
   }
  }
}
</script>

<style >
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
  .welcomeuser{
    color:#515151;
    height: 30px;
    font-size:14px;
    line-height:30px;
    width:auto;
    float:left;
    margin-left:15px;
  }
  .refresh{
    float:right;
    width:24px;
    height: 24px;
    margin-top:8px;
    margin-right:15px;
  }
.weui-cells {
  margin-top:30px !important;
}
.listdiv{
  border-bottom:1px solid #dadada;
}
</style>