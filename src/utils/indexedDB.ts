// 打开数据库

export default class DB {
  private dbName: string // 数据库名称
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
    request.onsuccess = (event) => {
      // 数据库打开成功
      console.log('🚀【数据库打开成功】', event)
    }
    request.onerror = (event) => {
      // 数据库打开失败
      console.log('🚀【数据库打开失败】', event)
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
        return store.createIndex(v, v, { unique: true })
      })
      store.transaction.oncomplete = (event: any) => {
        console.log('🚀【创建对象仓库成功】', event)
      }
    }
  }
}
