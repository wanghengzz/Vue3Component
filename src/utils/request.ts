/*
 * @Author:
 * @Date: 2025-02-27 10:26:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-04-10 13:44:41
 * @Description:
 * @FilePath: \vue3-project\src\utils\request.ts
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from '@/stores/index'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
  responseType: 'json'
})

// 请求拦截器
request.interceptors.request.use((config) => {
  const store = useStore()
  let token = store.login.token || localStorage.getItem('token')
  console.log(store.login.token,'store')
  console.log(localStorage.getItem('token'), 'localStorage')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 定义响应数据接口
export interface ResponseData {
  retCode: number|string;
  retMsg: string;
  data?: any;
  [key: string]: any;
}

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log(response, 'response')
    if (response.status === 200) {
      if (response.config.responseType === 'blob'){
        return response
      }else{
        if (response.data.retCode==200){
           return response.data
        }else{
           ElMessage.error(response.data.retMsg || '请求失败')
          return Promise.reject(new Error(response.data.retMsg))
        }
      }
    }
    ElMessage.error(response.data.retMsg || '请求失败')
    return Promise.reject(new Error(response.data.retMsg))
  },
  (error) => {
    const responseData = error.response?.data as ResponseData | undefined;
    ElMessage.error(responseData?.retMsg || '请求失败')
    if (responseData?.retCode == 401) {
      const store = useStore()
      store.login.token = ''
      localStorage.removeItem('token')
      setTimeout(()=>{
        window.location.href = '/login'
      },500)
    }
    return Promise.reject(error)
  }
)

export default request
