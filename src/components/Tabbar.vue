<template>
    <tabbar class="tabbar" :class="{'hide':hideTabbar}" v-model="tabbarList" >
      <tabbar-item  @on-item-click="changeSrcOne" >
        <img slot="icon" :src="imgone" height="64" width="64">
        <span slot="label" class="vuxlabel">文件夹</span>
      </tabbar-item>
      <tabbar-item  @on-item-click="changeSrcTwo">
        <img slot="icon" :src="imgtwo" height="64" width="64">
        <span slot="label" class="vuxlabel">写信</span>
      </tabbar-item>
      <tabbar-item @on-item-click="changeSrcThree">
        <img slot="icon" :src="imgthree" height="64" width="64">
        <span slot="label" class="vuxlabel">通讯录</span>
      </tabbar-item>
      <tabbar-item  @on-item-click="changeSrcFour">
        <img slot="icon" :src="imgfour" height="64" width="64" class="ccc">
        <span slot="label" class="vuxlabel">设置</span>
      </tabbar-item>
      
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem} from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data(){
    return {
      openid:''
    }
  },
  computed:{
    hideTabbar(){
      let routeName = this.$route.name
      if(routeName=='log'){
        return true;
      }else{
        return false;
      }
    },
    tabbarList:{
      get(){
        let routeName = this.$route.name;
        if(routeName=='inbox'||routeName=='maillist'||routeName=='mailinfo'){
          return 0;
        }else if(routeName=='write'){
          return 1;
        }else if(routeName=='userlist'){
          return 2;
        }else if(routeName=='setting'){
          return 3;
        }
      },
      set(){

      }
    },
    imgone(){
      let routeName = this.$route.name
      if(routeName=='inbox'||routeName=='maillist'||routeName=='mailinfo'){
        return require('../assets/b_letter.png');
      }else if(routeName=='write'){
        return require('../assets/h_letter.png');
      }else if(routeName=='userlist'){
        return require('../assets/h_letter.png');
      }else if(routeName=='setting'){
        return require('../assets/h_letter.png');
      }else{
        return require('../assets/h_letter.png');
      }
    },
    imgtwo(){
      let routeName = this.$route.name
      if(routeName=='inbox'||routeName=='maillist'||routeName=='mailinfo'){
        return require('../assets/h_brush.png');
      }else if(routeName=='write'){
        return require('../assets/b_brush.png');
      }else if(routeName=='userlist'){
        return require('../assets/h_brush.png');
      }else if(routeName=='setting'){
        return require('../assets/h_brush.png');
      }else{
        return require('../assets/h_brush.png');
      }
    },
    imgthree(){
      let routeName = this.$route.name
      if(routeName=='inbox'||routeName=='maillist'||routeName=='mailinfo'){
        return require('../assets/group_fill.png');
      }else if(routeName=='write'){
        return require('../assets/group_fill.png');
      }else if(routeName=='userlist'){
        return require('../assets/b_group_fill.png');
      }else if(routeName=='setting'){
        return require('../assets/group_fill.png');
      }else{
        return require('../assets/group_fill.png');
      }
    },
    imgfour(){
      let routeName = this.$route.name
      if(routeName=='inbox'||routeName=='maillist'||routeName=='mailinfo'){
        return require('../assets/h_set.png');
      }else if(routeName=='write'){
        return require('../assets/h_set.png');
      }else if(routeName=='userlist'){
        return require('../assets/h_set.png');
      }else if(routeName=='setting'){
        return require('../assets/b_set.png');
      }else{
        return require('../assets/h_set.png');
      }
    },
  },
  created(){
    this.tz();
  },
  methods:{
    changeSrcOne:function(){
      localStorage.removeItem('toNames')
      localStorage.removeItem('newtoNames')
      this.$router.push('/inbox')
    },
    changeSrcTwo:function(){
      localStorage.removeItem('toNames')
      localStorage.removeItem('newtoNames')
      this.$router.push('/write')
    },
    changeSrcThree:function(){
      localStorage.removeItem('toNames')
      localStorage.removeItem('newtoNames')
      this.$router.push('/userlist')
    },
    changeSrcFour:function(){
      localStorage.removeItem('toNames')
      localStorage.removeItem('newtoNames')
      this.$router.push('/setting')
    },
    tz:function(){
      var routeName = this.$route.name
      var openid = this.$route.query.openid
      if(routeName=='inbox'||routeName=='maillist'||routeName=='mailinfo'||routeName=='write'||routeName=='userlist'||routeName=='setting'){
      }else{
        this.$router.push('/log')
      }
    }
  }
}
</script>

<style scoped>

.vuxlabel{
  color:#515151;
}
.weui-bar__item_on .vuxlabel{
  color:#0089ce;
}
.ccc{
  color:#0089ce;
}
.tabbar{
  position:fixed !important;

}
.hide{
  display:none;
}
</style>