<template>
    <div class="manage">
        <el-dialog title="新增用户" :before-close="handleClose" :visible.sync="dialogVisible" width="40%">
            <!-- 用户表单信息 -->
            <el-form :rules="rules" ref="form" :model="form" :inline="true" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age" prop="age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.birth"
                            value-format="yyyy-MM-dd"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 顶部按钮 -->
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 添加用户
            </el-button>
            <el-form :inline="true" :model="userForm">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%" height="90%" stripe>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <!-- scope.row.sex获取一行数据的sex值 -->
                        <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                    <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
                    <template slot-scope="scope">
                        <!-- scope.row获取一行的数据 -->
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 底部分页页码 -->
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<!-- {
    model: 'name',
    label: '姓名',
    type: 'input'
},
{
    model: 'age',
    label: '年龄',
    type: 'input'
},
{
    model: 'sex',
    label: '性别',
    type: 'select',
    opts: [
        {
            label: '男',
            value: 1
        },
        {
            label: '女',
            value: 0
        }
    ]
},
{
    model: 'birth',
    label: '出生日期',
    type: 'date'
},
{
    model: 'addr',
    label: '地址',
    type: 'input'
} -->

<script>
import { getUser, addUser, editUser, delUser } from '../api'

export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期' }
                ],
                addr: [
                    { required: true, message: '请输入地址' }
                ],
            },
            tableData: [], //表格数据
            total: 0, //表格数据长度
            pageData: {  //分页数据
                page: 1, //当前页码
                limit: 20 // 页面数据条数
            },
            modalType: 0, //0表示添加数据 1表示编辑数据
            userForm: {
                name: '' //搜索表单数据
            }
        }
    },
    methods: {
        //点击确认，提交表单
        submit() {
            this.$refs.form.validate((valid) => {
                //通过表单验证的操作
                if (valid) {
                    console.log("form:" + this.form)
                    //后续对表单的处理
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            //.then当Promise被解决（fulfilled）时应该调用的回调函数,重新获取列表的接口
                            this.getList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    //重置表单
                    this.$refs.form.resetFields()
                    //关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        //弹窗关闭时
        handleClose() {
            //重置表单
            this.$refs.form.resetFields()
            //关闭弹窗
            this.dialogVisible = false
        },
        //点击添加按钮时
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        //点击编辑按钮时
        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            //需要对当前行数据需要进行深拷贝否则会报错
            //原因：直接赋值，后面对form表单 进行修改时，row的数据也会被修改
            this.form = JSON.parse(JSON.stringify(row))
            // 修改form的同时，row的数据立即改变，所以需要深拷贝
            // this.form = row
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //接口不用this.,直接调用。点击确定
                delUser({ id: row.id }).then(() => {
                    //删除成功之后
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    //删除成功之后，重新获取列表
                    this.getList()
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //获取用户列表
        getList() {
            //获取的列表数据
            //在JavaScript中，特别是在处理异步操作（如从服务器获取数据）时，
            //.then() 是Promise对象的一个方法，用于注册当Promise被解决（fulfilled）时应该调用的回调函数。
            //传递pageData给接口，获取当前分页数据
            //使用扩展运算符拆解对象，然后合并对象传给getUser接口
            getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
                console.log(data)
                this.tableData = data.list
                this.total = data.count || 0 //判断数据存在与否
            })
        },
        //选择页面的回调函数
        handlePage(page) {
            console.log('page:' + page);
            this.pageData.page = page
            //获取当前页面数据
            this.getList()
        },
        //点击搜索,不能模糊查询
        onSubmit() {
            this.getList() //getList()方法里的getUser接口已经实现根据name搜索(用扩展运算符)
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="less" scoped>
.manage {
    height: 90%;

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .common-table {
        position: relative;
        height: 100%;

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>