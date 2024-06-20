<template>
    <div class="tabs">
        <!-- $route.name获取当前路由名字 -->
        <!-- v-for="(item,index) in tags"接收数据的同时接收索引,从0开始 -->
        <el-tag v-for="(item, index) in tabsList" 
            :key="item.path" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' 
            : 'plain'" @click="changeMenu(item)"
            size="small"
            @close="handleClose(item, index)">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
//辅助函数mapXXX，调用用于读取vuex的state和mutations
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'CommonTag',
    data() {
        return {

        }
    },
    methods: {
        //接收数据拓展运算符
        ...mapMutations(['closeTag']),
        //点击tag跳转
        changeMenu(item) {
            // this.$router.push(item.path)
            this.$router.push({ name: item.name })
        },
        //删除tag功能
        handleClose(item, index) {
            console.log(index, "indexxxxxxxxxxxxx");
            // this.$store.commit('closeTag') //接收方法
            // closeTag(item) //调用方法

            const length = this.tabsList.length //tabsList长度

            this.closeTag(item) //删除指定tag

            //跳转：
            //删除的不是当前的tag。tag的名字与当前路由名字不一致，不做任何操作
            if (item.name !== this.$route.name) {
                return
            }
            //删除的tag刚好是最后一个
            if (index === length - 1) {
                this.$router.push(this.tabsList[index - 1].path)
                // this.$router.push({name:this.tabsList[index - 1].name})
            }
            //删除的tag不是最后一个
            else if (index < length - 1) {
                this.$router.push(this.tabsList[index].path)
            }
        }
    },
    computed: {
        //...拓展运算符
        ...mapState({
            tabsList: state => state.tab.tabsList
        })
    },
    // mounted() {
    //     console.log(this.$route.name, '111111')
    // }
}
</script>

<style lang="less">
    .tabs{
        padding: 20px;
        .el-tag{
            margin-left: 20px;
        }
    }
</style>