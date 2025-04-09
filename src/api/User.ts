/*
 * @Author: 
 * @Date: 2025-02-27 10:31:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-07 13:45:24
 * @Description: 
 * @FilePath: \vue3-project\src\api\User.ts
 */
import request from '@/utils/request'
import type { ResponseData } from '@/utils/request'

// 定义用户相关接口的返回类型
interface UserResponse extends ResponseData {
  retCode: number | string
  retMsg: string
  data: any
}

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
export function addUser(params: any): Promise<UserResponse> {
  return request.post('/users/add', params)
}

// 删除
export function delUser(params: any): Promise<UserResponse> {
  return request.delete('/users/delete', { params })
}

// 更新
export function updateUser(params: any): Promise<UserResponse> {
  return request.post('/users/update', params)
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