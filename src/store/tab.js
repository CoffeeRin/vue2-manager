// store中的数据页面刷新后就没了（存在内存中），需要持久化进行缓存
//此处使用Cookie进行缓存
import Cookies from "js-cookie"

export default {
    //单一状态树，挂载在vue实例后全局可用,其数据通过mutation去改
    state: {
        isCollapse: false, //控制菜单的展开
        tabsList: [
            {
                //初始数据
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ], //面包屑的数据
        menu:[]
    },
    //写方法更改 Vuex 的 store 中的状态
    //先接收state再更改state
    mutations: {
        //修改菜单展开收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state,val){
            // console.log('val',val)
            //判断添加的数据是否为首页
            if(val.name !== 'home'){
                //判断当前数据是否已存在。若存在则返回该数据索引，不存在返回-1
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //若不存在
                if(index === -1){
                    state.tabsList.push(val)
                }
            }
        },
        //删除指定的tag数据
        closeTag(state,item){
            //在tabsList寻找val.name === item.name的数据
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index,1) //索引位置删除一个
        },
        //设置menu的数据
        setMenu(state,val){
            state.menu = val
            Cookies.set('menu',JSON.stringify(val)) // 将数据val(数组)转为字符串才能存进cookie
        },
        //动态注册路由
        addMenu(state,router){
            //判断缓存中是否有数据
            if(!Cookies.get('menu')) return //缓存中没数据
            const menu = JSON.parse(Cookies.get('menu')) //将cookie中的字符串还原成数组
            state.menu = menu
            //组装动态路由数据
            const menuArray = []
            // 遍历menu中的数据
            menu.forEach(item => {
                if(item.children){
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children) //使用拓展运算符，解构children的属性一个个push给数组
                }else{
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })
        }
    }
}