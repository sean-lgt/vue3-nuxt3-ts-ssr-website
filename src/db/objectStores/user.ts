import TypeObjectStore from '../type'

const webUser: TypeObjectStore = {
  keyPath: 'userId',
  indexs: ['mobile', 'password', 'status']
}

const userObjectStore = {
  web_user: webUser
}

export default userObjectStore
