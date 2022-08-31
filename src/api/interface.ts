import { AxiosRequestConfig } from 'axios'
// 定义interface规范返回结果的类型
export interface IResultOr {
  code: string
  success: boolean
  message: string
  result: any
}

export interface IRoomlistParams extends AxiosRequestConfig {
  pageNo: number
  pageSize?: number
  cityCode?: string
}

export interface IRoomDetailParams extends AxiosRequestConfig {
  id: number
}
