<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handleMenu" style="margin-right: 20px;" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <!-- el-dropdown没有鼠标点击事件 -->
            <el-dropdown @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/user.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import { mapState } from 'vuex'

export default {
    data() {
        return {

        }
    },
    methods: {
        handleMenu() {
            // 接收方法，调用vue实例挂载的store的方法
            this.$store.commit('collapseMenu')
        },
        handleClick(command){
            if(command = 'logout'){
                //清除Cookie中的token数据
                Cookies.remove('token')
                //清除cookie中的menu
                Cookies.remove('menu')
                //跳转到登录页面
                this.$router.push({name:'login'})
            }
        }
    },
    //接收vuex数据，重命名为tags
    computed: {
        //...拓展运算符ES6
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    // mounted(){
    //     console.log(this.tags,'tags'); //打印tags（即$store.state的数据）数据变化
    // }
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between; //主轴上两端显示
    align-items: center; //纵轴上垂直居中

    .l-content {
        display: flex;
        align-items: center;
        //样式穿刺
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;

                // .el-breadcrumb__item下的.el-breadcrumb__inner并且有.is-link时
                &.is-link {
                    color: #666
                }
            }
            //选择最后一个child
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 20px;
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>