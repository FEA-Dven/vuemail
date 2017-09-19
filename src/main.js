import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './App'
import router from './router/index.js'
import store from './vuex/store.js'
import VueResource from 'vue-resource'
import uploader from 'vue-simple-uploader'

Vue.use(VueResource)
Vue.use(uploader)
Vue.use(VueRouter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
