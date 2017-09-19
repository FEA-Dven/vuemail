import Vue from 'vue'
import Router from 'vue-router'
import Log from '@/components/Log'
import Inbox from '@/components/Inbox'
import Maillist from '@/components/Maillist'
import Mailinfo from '@/components/Mailinfo'
import Userlist from '@/components/Userlist'
import Write from '@/components/Write'
import Setting from '@/components/Setting'
import Tabbar from '@/components/Tabbar'
import Mystore from '@/components/Mystore'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  { path: '/log', name: 'log', component: Log },
  { path: '/inbox', name: 'inbox', component: Inbox },
  { path:'/maillist', name: 'maillist', component: Maillist},
  { path:'/mailinfo', name: 'mailinfo', component: Mailinfo},
  { path:'/userlist', name: 'userlist', component: Userlist},
  { path:'/write', name: 'write', component: Write},
  { path:'/setting', name: 'setting', component: Setting},
  { path:'/tabbar', name: 'tabbar', component: Tabbar},
  { path:'/mystore', name: 'mystore', component: Mystore}
  ]
})
