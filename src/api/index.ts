import { http } from '../utils/http'
import IndexDB from '../utils/indexedDB'
import { IResultOr, IRoomlistParams } from './interface'
const airbnbDB = new IndexDB('airbnb')

export const getRoomList = (params: IRoomlistParams): Promise<IResultOr> => {
  return http.httpRequestGet('/api/room/room/getRoomList', params)
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
