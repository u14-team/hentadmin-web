<template>
  <v-btn icon @click="switchTheme" :color="color">
    <v-icon id="themeIcon" v-text="`mdi-brightness-${dark ? '7' : '3'}`"/>
  </v-btn>
</template>

<script>
export default {
  props: ['color'],

  computed: {
    dark () {
      return this.$vuetify.theme.dark
    }
  },

  methods: {
    switchTheme () {
      const isDark = !this.dark
      this.$vuetify.theme.dark = isDark
      this.$store.commit({ type: 'updateTheme', isDark })
    }
  }
}
</script>
