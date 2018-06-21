<template>
<div>
  <v-layout>
    <v-flex xs6>
      <song-meta-data :song="song" />
    </v-flex>

    <v-flex xs6 class="ml-2">
      <you-tube :youtubeId="song.youtubeId" />
    </v-flex> 
  </v-layout>

  <v-layout class="mt-2">
    <v-flex xs6>
      <tab :song="song" />
    </v-flex>

    <v-flex xs6 class="ml-2">
      <lyrics :song="song" />
    </v-flex> 
  </v-layout>

  </div>
</template>

<script>
import Lyrics from './Lyrics'
import Tab from './Tab'
import SongMetaData from './SongMetaData'
import YouTube from './YouTube'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted() {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
    console.log(this.song)
  },
  components: {
    SongMetaData,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
