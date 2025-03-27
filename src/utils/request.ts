/*
 * @Author:
 * @Date: 2025-02-27 10:26:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-27 13:33:06
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
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log(response, 'response')
    if (response.status === 200) {
      if (response.config.responseType === 'blob'){
        return response
      }else{
         return response.data
      }
    }
    ElMessage.error(response.data.retMsg || '请求失败')
    return Promise.reject(new Error(response.data.retMsg))
  },
  (error) => {
    ElMessage.error(error.response?.data?.retMsg || '请求失败')
    if (error.response?.data?.retCode == 401) {
      const store = useStore()
      store.login.token = ''
      localStorage.removeItem('token')
      setTimeout(()=>{
        window.location.href = '/login'
      },1000)
    }

    return Promise.reject(error)
  }
)

export default request
