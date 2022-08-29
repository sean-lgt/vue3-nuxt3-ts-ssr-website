import { http } from '../utils/http'
import IndexDB from '../utils/indexedDB'
const airbnbDB = new IndexDB('airbnb')

export const getRoomList = (params = {}) => {
  return http.httpRequestGet(
    'http://110.42.184.111/api/room/room/getRoomList?pageNo=1&pageSize=10',
    params
  )
}

// Mock接口
export const getElephant = async () => {
  // await airbnbDB.openStore('elephant', 'id', ['nose', 'ear'])
  await airbnbDB.openStore('elephant')
  const result = await airbnbDB.getList('elephant').then((res) => {
    return { code: '000000', success: true, message: '操作成功', result: res }
  })
  return result
}
