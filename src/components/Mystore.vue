<template>
    <div>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <p>{{count}}</p>
      <input type="text" v-model="msg" @keyup="handck">
      <button @click="changev">点击</button>	
      <button @click="kgChange">改变开关</button>
      {{msg}}
    </div>
</template>

<script>
export default {
  computed:{
    count(){
      return this.$store.state.a.count
    },
    msg(){
      return this.$store.state.b.msg;
    }
  },  
  methods:{
  	increment(){
  		this.$store.commit('increment')
  	},
  	decrement(){
  		this.$store.commit('decrement')
  	},
  	changev(e){
  		if(this.$store.state.b.kg){
  			this.$store.commit('changeValue','kg is true')
  		}else{
  			this.$store.commit('changeValue','kg is false')
  		}	
  	},
  	kgChange:function(){
  		this.$store.commit('kgChange');
  	},
  	handck:function(e){
  		console.log(e.target.value);
  		this.$store.commit('inputChange',e.target.value);
  	}
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
