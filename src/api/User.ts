/*
 * @Author: 
 * @Date: 2025-02-27 10:31:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-12 15:42:59
 * @Description: 
 * @FilePath: \vue3-project\src\api\User.ts
 */
import request from '@/utils/request'

// 查询全部
export const getUserList = (params: any) => {
  return request({
    url: '/users/query',
    method: 'get',
    params,
  })
}
// 分页查询
export const getUserPage = (data: any) => {
  return request({
    url: '/users/page',
    method: 'post',
    data,
  })
}

// 新增
export const addUser = (data: any) => {
  return request({
    url: '/users/add',
    method: 'post',
    data,
  })
}


// 删除
export const delUser = (params: any) => {
  return request({
    url: '/users/delete',
    method: 'delete',
    params,
  })
}


// 更新
export const updateUser = (data: any) => {
  return request({
    url: '/users/update',
    method: 'post',
    data,
  })
}


// 字典值接口
export const getEnumeValue = (data: any) => {
  return request({
    url: '/enume/query',
    method: 'post',
    data,
  })
}

// 导出
export const exportUser = (params: any) => {
  return request({
    url: '/users/export',
    method: 'get',
    responseType: 'blob',
    params,
  })
}


// 模糊查询
export const getUserLike = (data: any) => {
  return request({
    url: '/users/search',
    method: 'post',
    data,
  })
}