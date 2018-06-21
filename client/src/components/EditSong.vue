<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
        <v-text-field 
          required
          :rules="[required]"
          label="title" v-model="song.title"/>
        <v-text-field 
          required
          :rules="[required]"
          label="Artist" v-model="song.artist"/>
        <v-text-field 
          required
          :rules="[required]"
          label="Genre" v-model="song.genre"/>
        <v-text-field 
          required
          :rules="[required]"
          label="Album" v-model="song.album"/>
        <v-text-field 
           required
          :rules="[required]"
          label="Album image url" v-model="song.albumImageUrl"/>
        <v-text-field 
          required
          :rules="[required]"
          label="Youtube ID" v-model="song.youtubeId"/>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field multi-line 
          required
          :rules="[required]"
          label="Tab" v-model="song.tab"/>
        <v-text-field multi-line 
          required
          :rules="[required]"
          label="Lyrics" v-model="song.lyrics"/>
      </panel>

      <div class="danger-alert" v-if="error">
        {{ error }}
      </div>
      <v-btn
          dark
          class="cyan"
          @click="save">save song
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async save() {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      
      if (!areAllFieldsFilledIn) {
        this.error = 'please fill in all the required fields'
        return
      }
      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(this.song)
        this.$router.push({
        name: 'song',
        params: {
          songId: songId
        }
      })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted() {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
