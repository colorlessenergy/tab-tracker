/* eslint-disable */

import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  }
}

//AuthenticationServer.register({
//   email: 'test@gmail.com',
//   password: '123456'
// })