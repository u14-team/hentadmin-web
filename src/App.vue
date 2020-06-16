<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<style>
body, html, #app {
  overflow-y: hidden !important;
}
</style>

<script>
export default {
  name: 'HentAdmin',

  created () {
    const { dark, token } = this.$store.state.persist
    this.$vuetify.theme.dark = dark
    if (token) this.api.openWS()
  }
}
</script>
