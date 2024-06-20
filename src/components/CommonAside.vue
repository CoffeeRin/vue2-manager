<!-- 页面中的侧边栏组件 -->
<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="child in item.children" :key="child.name">
                <el-menu-item @click="clickMenu(child)" :index="child.name">{{ child.label }}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>



<script>
import Cookies from 'js-cookie';

export default {
    data() {
        return {}
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        //点击侧边栏按钮跳转的同时给面包屑的跳转vuex传输数据
        clickMenu(item) {
            console.log(item);
            //当页面路由route(当前页面的路由)与跳转路由不一致时才跳转
            if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {//（当前路径!=要跳转路径时）且!（当前路径是'/home'且要跳转的路径是'/'时）
                //this指的是vue实例，vue实例已经挂载router(路由实例，用于操作)，所以直接用this调用
                this.$router.push(item.path)//执行跳转操作
            }
            //传递数据给vuex，用于面包屑数据更新
            this.$store.commit('selectMenu', item)
        }
    },
    //计算属性，是一个属性
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        //通过计算属性获取store里的menu数据
        menuData() {
            //判断当前数据，如果缓存中没有，从store中获取
            //JSON.parse()还原字符串
            return JSON.parse(Cookies.get('menu')) || this.$store.state.tab.menu
        },
        isCollapse() {
            // this.$store,调用Vue实例
            return this.$store.state.tab.isCollapse
        }
    }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border-right: none;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-style: 16px;
        font-weight: 400px;
    }
}
</style>