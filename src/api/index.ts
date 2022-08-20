import { http } from '../utils/http'

export const getRoomList = (params = {}) => {
  return http.httpRequestGet('http://127.0.0.1:3008/common/getList', params)
}
