// 引入类型别名 也可以使用interface
import TypeObject from '../type'

const webLang: TypeObject = {
  keyPath: 'id',
  indexs: ['name']
}

const languageObjectStore = {
  language: webLang
}

export default languageObjectStore
