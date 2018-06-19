<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo({name: 'root'})">TabTracker</span>
    </v-toolbar-title>
    <!-- TODO: fix later -->
    <!-- <v-toolbar-items>
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items> -->

    <v-spacer> </v-spacer>

    <v-toolbar-items>
      <v-btn
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo({name: 'login'})" flat dark>
        Log in 
      </v-btn>
      <v-btn 
      v-if="!$store.state.isUserLoggedIn"
      @click="navigateTo({name: 'register'})" flat dark>
        Sign Up 
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #000;
}
</style>
