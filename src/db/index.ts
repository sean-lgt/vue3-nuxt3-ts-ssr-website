// 引入indexedDB 工具类
import DB from '../utils/indexedDB'
// 引入语言类型对象仓库
import languageObjectStore from './objectStores/language'
// 引入用户信息对象仓库
import userObjectStore from './objectStores/user'
// 引入订单记录对象仓库
import orderObjectStore from './objectStores/orders'
// 引入浏览记录对象仓库
import recordObjectStore from './objectStores/record'

// 数据库
export const airbnbDB = new DB('airbnb')

export default {
  airbnbDB,
  languageObjectStore,
  userObjectStore,
  orderObjectStore,
  recordObjectStore
}
