// 定义interface规范返回结果的类型
export interface IResultOr {
  code: string
  success: boolean
  message: string
  result: any
}
