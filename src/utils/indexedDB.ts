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
   */
  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1)
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
        const store = result.createObjectStore(storeName, {
          autoIncrement: true,
          keyPath
        })
        // store.createIndex() //新建索引
        indexs?.map((v: string) => {
          return store.createIndex(v, v, { unique: false })
        })
        store.transaction.oncomplete = (event: any) => {
          console.log('🚀【创建对象仓库成功】', event)
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
