/*
 * @Author: 
 * @Date: 2025-03-26 09:56:01
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-07 09:22:28
 * @Description: 
 * @FilePath: \vue3-project\src\api\Login.ts
 */
import request from '@/utils/request'
import type { ResponseData } from '@/utils/request'
interface LoginResponse extends ResponseData {
  retCode: number | string
  retMsg: string
  data: any
}
export function LoginIn(data: any): Promise<LoginResponse> {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export const LoginOut = (data: any) => {
  return request({
    url: '/auth/logout',
    method: 'post',
    data,
  })
}

export const Register = (data: any) => {
  return request({
    url: '/auth/register',
    method: 'post',
    data,
  })
}