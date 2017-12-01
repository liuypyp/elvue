import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/envList',
      name: '环境列表',
      component: (resolve) => { require(['@/components/sysconf/envList'], resolve) }
    },
    {
      path: '/eps/messageList',
      name: '消息列表',
      component: (resolve) => { require(['@/components/eps/messageList'], resolve) }
    }
  ]
})
