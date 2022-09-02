// 打开数据库
export default class DB {
  private dbName: string // 数据库名称
  private db: any // 数据库对象
  // 构造器
  constructor(dbName: string) {
    this.dbName = dbName
  }

  /**
   * @description: 打开数据库
   * @return {*}
   * @param {any} stores 对象仓库列表
   */
  public openStore(stores: any) {
    console.log('🚀【拿到的stores】', stores)
    // 数据库名、版本号
    const request = window.indexedDB.open(this.dbName, 6)
    // const request = indexedDB.open(this.dbName, 4)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        // 数据库打开成功
        console.log('🚀【数据库打开成功】', event)
        this.db = event.target.result
        resolve(event.target.result)
      }
      request.onerror = (event) => {
        // 数据库打开失败
        console.log('🚀【数据库打开失败】', event)
        reject(event)
      }
      request.onupgradeneeded = (event) => {
        // 数据库升级成功
        console.log('🚀【数据库升级成功】', event)
        const { result }: any = event.target
        for (const storeName in stores) {
          // 初始化多个ojectStore对象仓库
          const { keyPath, indexs } = stores[storeName]
          if (!result.objectStoreNames.contains(storeName)) {
            // 没有表则新建表
            // keyPath：主键，主键（key）是默认建立索引的属性； autoIncrement：是否自增；createObjectStore会返回一个对象仓库objectStore(即新建一个表)
            const store = result.createObjectStore(storeName, {
              autoIncrement: true,
              keyPath
            })
            if (indexs && indexs.length) {
              indexs.map((v: string) =>
                // createIndex可以新建索引，unique字段是否唯一
                store.createIndex(v, v, { unique: false })
              )
            }
            store.transaction.oncomplete = () => {
              console.log(`🚀【${storeName}】创建对象仓库成功`)
            }
          }
        }
      }
    })
  }

  updateItem(storeName: string, data: any) {
    // 新增修改方法
    // 数据库对象名字,操作模式
    const store = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
    const request = store.put({ ...data, updateTime: new Date().getTime() })
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        // 数据库打开成功
        console.log('🚀【数据写入成功】', event)
        resolve(event)
      }
      request.onerror = (event: any) => {
        // 数据库打开成功
        console.log('🚀【数据写入失败】', event)
        reject(event)
      }
    })
  }

  // 删除数据
  deleteItem(storeName: string, key: number | string) {
    // 删除数据  key值
    // 数据库对象名字,操作模式
    const store = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
    const request = store.delete(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        // 数据库打开成功
        console.log('🚀【数据删除成功】', event)
        resolve(event)
      }
      request.onerror = (event: any) => {
        // 数据库打开成功
        console.log('🚀【数据删除失败】', event)
        reject(event)
      }
    })
  }

  // 查询所有数据
  getList(storeName: string) {
    return new Promise((resolve, reject) => {
      const store = this.db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
      const request = store.getAll()
      request.onsuccess = (event: any) => {
        // 数据库打开成功
        console.log('🚀【数据查询成功】', event)
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        // 数据库打开成功
        console.log('🚀【数据查询失败】', event)
        reject(event)
      }
    })
  }

  // 查询某条数据
  getItem(storeName: string, key: number | string) {
    const store = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName)
    const request = store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        // 数据库打开成功
        console.log('🚀【查询某条数据成功】', event)
        resolve(event.target.result)
      }
      request.onerror = (event: any) => {
        // 数据库打开成功
        console.log('🚀【查询某条数据失败】', event)
        reject(event)
      }
    })
  }
}
