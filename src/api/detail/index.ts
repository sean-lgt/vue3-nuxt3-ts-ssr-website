import { http } from '@/utils/http'
import { IResultOr, IRoomDetailParams } from '../interface'

// 真实接口  首页房屋详情接口
export function getRoomDetail(params: IRoomDetailParams): Promise<IResultOr> {
  return http.httpRequestGet('/api/room/room/getRoomDetail', params)
}
