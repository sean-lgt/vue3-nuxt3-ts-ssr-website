import { http } from '../utils/http'
import IndexDB from '../utils/indexedDB'
const airbnbDB = new IndexDB('airbnb')
export const getRoomList = (params = {}) => {
  return http.httpRequestGet('http://127.0.0.1:3008/common/getList', params)
}

// Mock接口
export const getElephant = async () => {
  await airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])
  const result = await airbnbDB.getList('elephant').then((res) => {
    return { code: '000000', success: true, message: '操作成功', result: res }
  })
  return result
}
