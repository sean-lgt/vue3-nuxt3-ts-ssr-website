// import axios from 'axios'
// import { url } from 'inspector'

// const DEFAULT_CONFIG = {
//   timeout: 5000,
//   baseUrl: ''
// }

// const axiosInstance = axios.create({ ...DEFAULT_CONFIG })

// // 请求拦截
// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )

// // 响应拦截
// axiosInstance.interceptors.response.use(
//   (config) => {
//     return config
//   },
//   (err) => {
//     return Promise.reject(err)
//   }
// )

// // 封装请求
// const httpRequestGet = (url, params) => {
//   return axiosInstance
//     .get(url, params)
//     .then((res) => res.data)
//     .catch()
// }

// const httpRequestPost = (url, params) => {
//   return axiosInstance
//     .post(url, params)
//     .then((res) => res.data)
//     .catch()
// }

// export default {
//   httpRequestGet,
//   httpRequestPost
// }

// 封装 start
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
console.log('🚀【sdasafs】', import.meta.env.VITE_REQUEST_BASE_URL)
const DEFAULT_CONFIG = {
  timeout: 5000,
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL || '' // 直接通过环境变量取值  axios在服务器上默认为80端口

  // baseURL: import.meta.env.PROD
  //   ? 'http://110.42.184.111'
  //   : 'http://127.0.0.1:3000'
}

class Http {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  private static axiosInstance = axios.create({ ...DEFAULT_CONFIG })

  // 请求拦截
  private httpInterceptorsRequest() {
    Http.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  // 响应拦截
  private httpInterceptorsResponse() {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  /**
   * 封装请求
   */
  // get
  public httpRequestGet<T>(
    url: string,
    params: AxiosRequestConfig
  ): Promise<T> {
    return Http.axiosInstance
      .get(url, { params })
      .then((res) => res.data)
      .catch()
  }

  // post
  public httpRequestPost<T>(
    url: string,
    params: AxiosRequestConfig
  ): Promise<T> {
    return Http.axiosInstance
      .post(url, params)
      .then((res) => res.data)
      .catch()
  }
}

export const http = new Http()
