import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import yulu from '@/components/yulu'
import color from '@/components/color'

Vue.use(Router)
let routes =  [
  {
    path: '/index',
    name: 'HelloWorld',
    component: (resolve) => require(['@/components/HelloWorld'], resolve)
  },
  {
    path: '/yulu',
    name: 'yuLu',
    component: (resolve) => require(['@/components/yulu'], resolve),
    navbarOption: '薛少语录',
  },
  {
    path: '/color',
    name: 'color',
    component: (resolve) => require(['@/components/color'], resolve)
  },
  {
    path: '/',
    name: 'HelloWorld',
    component: (resolve) => require(['@/components/HelloWorld'], resolve)
  },
]
let router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  routes.map((e)=>{
    if(e.path==to.path){
      document.title = e.navbarOption
    }
  })
  
  next()
})
export default router


