import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

//全局注入Vuex
Vue.use(Vuex)

//创建Vuex实例
export default new Vuex.Store({
    modules:{
        tab,
    }
})