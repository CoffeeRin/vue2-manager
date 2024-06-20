import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import { Row,Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'//引入路由
import store from './store' //引入Store
import './api/mock'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
// 全局引入
Vue.use(ElementUI)

//按需引入
// Vue.use(Row)
// Vue.use(Button)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存不存在
  const token = Cookies.get('token')
  //token不存在
  if(!token && to.name !== 'login'){  //token不存在且当前页面不是登录页，跳回登录页
    next({name:'login'})
  }else if(token && to.name === 'login'){  //token存在且当前页面是登录页，说明用户已登录，跳转至主页
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  store,//挂载store到vue实例上
  router,//挂载router到vue实例上
  render: h => h(App),
  //创建后的生命周期里调用，添加路由到router实例
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
