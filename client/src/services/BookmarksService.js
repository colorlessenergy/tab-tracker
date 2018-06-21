/* eslint-disable */

import Api from '@/services/Api'

export default {
  index(bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  
  post (bookmark) {
    return Api().post('bookmarks', {
      params: bookmark
    })
  },

  delete (bookmarkId) {
    console.log('bookmarkId', bookmarkId)
    return Api().get(`bookmarks/${bookmarkId}`)
  }

}