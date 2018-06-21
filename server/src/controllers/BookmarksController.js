const { Bookmark } = require('../models')

module.exports = {
  async index(req, res) {
    try {
      const {songId, userId} = req.query
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmark'
      })
    }
  },

  async post (req, res) {
    try {
      const {songId, userId}= req.body
      console.log(songId, userId)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      console.log(bookmark)
      if (bookmark) {
        return res.status(500).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create(bookmark)
      res.send(newBookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to create the bookmark'
      })
    }
  },

  async delete (req, res) {
    try {
      const { bookmarkId } = req.params
      // console.log(bookmarkId)
      const bookmark = await Bookmark.findById(bookmarkId)
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark'
      })
    }
  }
}
