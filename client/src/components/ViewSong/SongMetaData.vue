<template>
  <panel title="Song Metadata">
    <v-layout>
      <v-flex xs6>
        <div class="song-title">
          {{ song.title }}   
        </div>
        <div class="song-artist">
          {{ song.artist }}   
        </div>
        <div class="song-genre">
          {{ song.genre }}   
        </div>

        <v-btn
          dark
          class="cyan"
          :to="{
            name: 'song-edit', 
            params() {
              return {
                songId: song.id
              }
              }}">
              Edit 
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && !isBookmarked"
          dark
          class="cyan"
          @click="bookmark">
              bookmark 
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn && isBookmarked"
          dark
          class="cyan"
          @click="unbookmark">
              UnBookmark 
        </v-btn>
      </v-flex>

      <v-flex xs6>
        <img class="album-image" :src="song.albumImageUrl" :alt="song.title">
        <br />
        {{ song.album }}
      </v-flex>
    </v-layout>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: [
    'song'
  ],
  data () {
    return {
      isBookmarked: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  async mounted () {
    try {
    if (!this.isUserLoggedIn) {
       return
     }
     const bookmark = (await BookmarksService.index({
        songId: this.song.id,
        userId: this.$store.state.user.id
      })).data
    this.isBookmarked = !!bookmark
    console.log(this.isBookmarked)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
   async bookmark () {
     try {
       console.log(this.song.id, this.$store.state.user.id)
       await BookmarksService.post({
        songId: this.song.id,
        userId: this.$store.state.user.id
      })
     } catch (err){
       console.log(err)
     }
    }, 
    async unbookmark () {
      try {
      console.log(this.song.id, this.$store.state.user.id)
       await BookmarksService.delete(this.bookmark.id)
       this.bookmark = null
     } catch (err){
       console.log(err)
     }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}

</style>
