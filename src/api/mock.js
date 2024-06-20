import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permission from './mockServeData/permission'

// //定义mock请求拦截
// Mock.mock('/api/home/getData',function(){
//     //拦截到请求后的处理逻辑
//     console.log('拦截到了');
//     return 1;
// })

//定义mock请求拦截
Mock.mock('/api/home/getData',homeApi.getStatisticalData)

//用户列表的数据
Mock.mock('/api/user/add','post',userApi.createUser)
Mock.mock('/api/user/edit','post',userApi.updateUser)
Mock.mock('/api/user/del','post',userApi.deleteUser)
Mock.mock(/api\/user\/getUser/,'get',userApi.getUserList)

Mock.mock(/api\/permission\/getMenu/,permission.getMenu )