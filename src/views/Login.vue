<template>
    <el-form ref="form" label-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
        <h3 class="login_title">登录页</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="submit" style="margin-left: 101px;margin-top: 10px;" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from '../api'

export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', message: '请输入用户名' }
                ],
                password: [
                    { required: true, trigger: 'blur', message: '请输入密码' }
                ]
            }
        }
    },
    methods: {
        //登录
        submit() {
            // //token信息
            // const token = Mock.Random.guid()
            // //将token信息存入cookie用于不同页面间的通信
            // Cookies.set('token', token)

            //form表单校验通过
            // 获取html标签中ref="form"的标签，this.$refs.form
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //.then：成功后返回一个Promise对象，指定成功的回调
                    getMenu(this.form).then(({ data }) => {
                        //密码正确返回一个token
                        if (data.code === 20000) {
                            //token信息存入cookie中用于不同页面通信
                            Cookie.set('token', data.data.token)

                            //登录后获取菜单数据，存入store中
                            this.$store.commit('setMenu',data.data.menu)
                            //获取当前页路由实例
                            this.$store.commit('addMenu',this.$router)

                            //跳转到首页
                            this.$router.push({ name: 'home' })
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                        } else {
                            this.$message.error('密码错误');
                        }
                    })
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;

    .el-input {
        width: 190px;
    }

    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
}
</style>