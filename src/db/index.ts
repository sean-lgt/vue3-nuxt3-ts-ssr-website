// 引入indexedDB 工具类
import DB from '../utils/indexedDB'
// 引入语言类型对象仓库
import languageObjectStore from './objectStores/language'

// 数据库
export const airbnbDB = new DB('airbnb')

export default {
  airbnbDB,
  languageObjectStore
}
