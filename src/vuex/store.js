import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const moduleA = {
// 	state:{
// 		count:0,
// 		username:''
// 	},
// 	mutations:{
// 		increment:state=>state.count++,
// 		decrement:state=>state.count--,
// 		getUsername:function(state,value){
// 			state.username = value
// 		}
// 	}
// }

// const moduleB = {
// 	state:{
// 		msg:'kg is what',
// 		kg:false,
// 	},
// 	mutations:{
// 		changeValue:function(state,value){
// 			state.msg = value
// 		},
// 		kgChange:function(state){
// 			state.kg = !state.kg;
// 			console.log(state.kg)
// 		},
// 		inputChange:function(state,value){
// 			state.msg = value
// 		}
// 	}
// }

const store = new Vuex.Store({
// 	modules: {
//     a: moduleA,
//     b: moduleB
// }
state:{
	username:'',
},
mutations:{
	// increment:state=>state.count++,
	// decrement:state=>state.count--,
	// changeValue:function(state,value){
	// 	state.msg = value
	// },
	// kgChange:function(state){
	// 	state.kg = !state.kg;
	// 	console.log(state.kg)
	// },
	// inputChange:function(state,value){
	// 	state.msg = value
	// }
	changeUsername:function(state,value){
		state.username = value
	}
}
})

export default store